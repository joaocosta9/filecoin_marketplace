import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FilePlaceIMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const filePlaceIMulticall3Abi = [
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "returnData", internalType: "bytes[]", type: "bytes[]" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3Value[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "value", internalType: "uint256", type: "uint256" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "getBasefee",
    outputs: [{ name: "basefee", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "blockNumber", internalType: "uint256", type: "uint256" }],
    name: "getBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getChainId",
    outputs: [{ name: "chainid", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [{ name: "coinbase", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [{ name: "difficulty", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [{ name: "gaslimit", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [{ name: "timestamp", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "getEthBalance",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getLastBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FilePlaceSale
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const filePlaceSaleAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "uuid", internalType: "string", type: "string" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "string", type: "string" },
    ],
    name: "contents",
    outputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "uuid", internalType: "string", type: "string" },
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "exists", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "uuid", internalType: "string", type: "string" },
    ],
    name: "getContent",
    outputs: [
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "exists", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "string", type: "string" },
    ],
    name: "purchases",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "uuid", internalType: "string", type: "string" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "setContent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "creator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "uuid", internalType: "string", type: "string", indexed: false },
      {
        name: "price",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ContentCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "creator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "uuid", internalType: "string", type: "string", indexed: false },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Sold",
  },
] as const;

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const filePlaceSaleAddress = {
  314159: "0x035dD367FD1F11260AD161Af6390Cb144CF113a6",
} as const;

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const filePlaceSaleConfig = {
  address: filePlaceSaleAddress,
  abi: filePlaceSaleAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__
 */
export const useReadFilePlaceIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: filePlaceIMulticall3Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadFilePlaceIMulticall3GetBasefee =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getBasefee",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadFilePlaceIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getBlockHash",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadFilePlaceIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getBlockNumber",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadFilePlaceIMulticall3GetChainId =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getChainId",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadFilePlaceIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getCurrentBlockCoinbase",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadFilePlaceIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getCurrentBlockDifficulty",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadFilePlaceIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getCurrentBlockGasLimit",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadFilePlaceIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getCurrentBlockTimestamp",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadFilePlaceIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getEthBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadFilePlaceIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "getLastBlockHash",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__
 */
export const useWriteFilePlaceIMulticall3 =
  /*#__PURE__*/ createUseWriteContract({ abi: filePlaceIMulticall3Abi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteFilePlaceIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteFilePlaceIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate3",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteFilePlaceIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate3Value",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteFilePlaceIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "blockAndAggregate",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteFilePlaceIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "tryAggregate",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteFilePlaceIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "tryBlockAndAggregate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__
 */
export const useSimulateFilePlaceIMulticall3 =
  /*#__PURE__*/ createUseSimulateContract({ abi: filePlaceIMulticall3Abi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateFilePlaceIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateFilePlaceIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate3",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateFilePlaceIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "aggregate3Value",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateFilePlaceIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "blockAndAggregate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateFilePlaceIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "tryAggregate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceIMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateFilePlaceIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceIMulticall3Abi,
    functionName: "tryBlockAndAggregate",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadFilePlaceSale = /*#__PURE__*/ createUseReadContract({
  abi: filePlaceSaleAbi,
  address: filePlaceSaleAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"contents"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadFilePlaceSaleContents = /*#__PURE__*/ createUseReadContract(
  {
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "contents",
  }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"getContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadFilePlaceSaleGetContent =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "getContent",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"purchases"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadFilePlaceSalePurchases =
  /*#__PURE__*/ createUseReadContract({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "purchases",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteFilePlaceSale = /*#__PURE__*/ createUseWriteContract({
  abi: filePlaceSaleAbi,
  address: filePlaceSaleAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteFilePlaceSaleBuy = /*#__PURE__*/ createUseWriteContract({
  abi: filePlaceSaleAbi,
  address: filePlaceSaleAddress,
  functionName: "buy",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"setContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteFilePlaceSaleSetContent =
  /*#__PURE__*/ createUseWriteContract({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "setContent",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateFilePlaceSale = /*#__PURE__*/ createUseSimulateContract(
  { abi: filePlaceSaleAbi, address: filePlaceSaleAddress }
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateFilePlaceSaleBuy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "buy",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `functionName` set to `"setContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateFilePlaceSaleSetContent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    functionName: "setContent",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link filePlaceSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchFilePlaceSaleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `eventName` set to `"ContentCreated"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchFilePlaceSaleContentCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    eventName: "ContentCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link filePlaceSaleAbi}__ and `eventName` set to `"Sold"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchFilePlaceSaleSoldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: filePlaceSaleAbi,
    address: filePlaceSaleAddress,
    eventName: "Sold",
  });
