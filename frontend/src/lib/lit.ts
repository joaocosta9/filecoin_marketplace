import {
  LitAccessControlConditionResource,
  createSiweMessage,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";
import { LIT_ABILITY } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import type { EncryptToJsonPayload } from "@lit-protocol/encryption/node_modules/@lit-protocol/types";
import { encryptToJson, decryptFromJson } from "@lit-protocol/encryption";
import { ethers } from "ethers";

type SupportedChain = "filecoin" | "filecoinCalibrationTestnet" | "ethereum";

export class Lit {
  contractAddress: string;
  litNodeClient: LitJsSdk.LitNodeClient;
  chain: SupportedChain;
  creatorAddress: string;
  cid: string;

  constructor(
    chain: SupportedChain,
    creatorAddress: string,
    cid: string,
    contractAddress?: string,
  ) {
    this.chain = chain;
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: "datil-dev" as any,
    });
    this.creatorAddress = creatorAddress;
    this.cid = cid;
    this.contractAddress = contractAddress ?? "";
  }

  private accessControlConditions(): any[] {
    return [
      // Condition 1: User is the creator (owner)
      {
        conditionType: "evmBasic",
        contractAddress: "",
        standardContractType: "",
        chain: this.chain,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: this.creatorAddress,
        },
      },
      { operator: "or" },
      // Condition 2: User has purchased the content
      {
        conditionType: "evmContract",
        contractAddress: this.contractAddress,
        chain: this.chain,
        functionName: "purchases",
        functionParams: [":userAddress", this.creatorAddress, this.cid],
        functionAbi: {
          name: "purchases",
          stateMutability: "view",
          inputs: [
            {
              name: "buyer",
              type: "address",
            },
            {
              name: "creator",
              type: "address",
            },
            {
              name: "cid",
              type: "string",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
        },
        returnValueTest: {
          key: "",
          comparator: "=",
          value: "true",
        },
      },
    ];
  }

  async connect() {
    await this.litNodeClient.disconnect();
    const res = await this.litNodeClient.connect();
    return res;
  }

  async encryptFile(file: File): Promise<EncryptToJsonPayload> {
    await this.litNodeClient.disconnect();
    await this.litNodeClient.connect();

    const encryptedString = await encryptToJson({
      unifiedAccessControlConditions: this.accessControlConditions(),
      file: file,
      chain: this.chain,
      litNodeClient: this.litNodeClient,
    });

    return JSON.parse(encryptedString) as EncryptToJsonPayload;
  }

  async decryptFile(
    payload: EncryptToJsonPayload,
  ): Promise<{ decryptedFile: string | Uint8Array }> {
    await this.litNodeClient.disconnect();
    await this.litNodeClient.connect();

    const sessionSignatures = await this.getSessionSignatures();

    const decryptedData = await decryptFromJson({
      parsedJsonData: payload,
      sessionSigs: sessionSignatures,
      litNodeClient: this.litNodeClient,
    });

    return { decryptedFile: decryptedData };
  }

  async getSessionSignatures() {
    await this.litNodeClient.disconnect();
    await this.litNodeClient.connect();

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const ethersSigner = await provider.getSigner();
    const walletAddress = await ethersSigner.getAddress();

    const sessionSignatures = await this.litNodeClient.getSessionSigs({
      chain: "ethereum",
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource("*") as any,
          ability: LIT_ABILITY.AccessControlConditionDecryption as any,
        },
      ] as any,
      authNeededCallback: async ({
        uri,
        expiration,
        resourceAbilityRequests,
      }: any) => {
        const toSign = await createSiweMessage({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress,
          nonce: await this.litNodeClient.getLatestBlockhash(),
          litNodeClient: this.litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersSigner as any,
          toSign,
        });
      },
    });

    return sessionSignatures;
  }
}
