import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SaldIMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const saldIMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SaldSale
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const saldSaleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'uuid', internalType: 'string', type: 'string' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'contents',
    outputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'uuid', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'exists', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'uuid', internalType: 'string', type: 'string' },
    ],
    name: 'getContent',
    outputs: [
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'exists', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'purchases',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'uuid', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setContent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'uuid', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ContentCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'uuid', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Sold',
  },
] as const

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const saldSaleAddress = {
  314159: '0x035dD367FD1F11260AD161Af6390Cb144CF113a6',
} as const

/**
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const saldSaleConfig = {
  address: saldSaleAddress,
  abi: saldSaleAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__
 */
export const useReadSaldIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: saldIMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadSaldIMulticall3GetBasefee =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getBasefee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadSaldIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadSaldIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadSaldIMulticall3GetChainId =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getChainId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadSaldIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadSaldIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadSaldIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadSaldIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadSaldIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadSaldIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: saldIMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__
 */
export const useWriteSaldIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: saldIMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteSaldIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteSaldIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteSaldIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteSaldIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteSaldIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteSaldIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: saldIMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__
 */
export const useSimulateSaldIMulticall3 =
  /*#__PURE__*/ createUseSimulateContract({ abi: saldIMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateSaldIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateSaldIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateSaldIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateSaldIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateSaldIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldIMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateSaldIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldIMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadSaldSale = /*#__PURE__*/ createUseReadContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"contents"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadSaldSaleContents = /*#__PURE__*/ createUseReadContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'contents',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"getContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadSaldSaleGetContent = /*#__PURE__*/ createUseReadContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'getContent',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"purchases"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useReadSaldSalePurchases = /*#__PURE__*/ createUseReadContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'purchases',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteSaldSale = /*#__PURE__*/ createUseWriteContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteSaldSaleBuy = /*#__PURE__*/ createUseWriteContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"setContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWriteSaldSaleSetContent = /*#__PURE__*/ createUseWriteContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'setContent',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateSaldSale = /*#__PURE__*/ createUseSimulateContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateSaldSaleBuy = /*#__PURE__*/ createUseSimulateContract({
  abi: saldSaleAbi,
  address: saldSaleAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link saldSaleAbi}__ and `functionName` set to `"setContent"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useSimulateSaldSaleSetContent =
  /*#__PURE__*/ createUseSimulateContract({
    abi: saldSaleAbi,
    address: saldSaleAddress,
    functionName: 'setContent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link saldSaleAbi}__
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchSaldSaleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: saldSaleAbi,
  address: saldSaleAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link saldSaleAbi}__ and `eventName` set to `"ContentCreated"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchSaldSaleContentCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: saldSaleAbi,
    address: saldSaleAddress,
    eventName: 'ContentCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link saldSaleAbi}__ and `eventName` set to `"Sold"`
 *
 * [__View Contract on Filecoin Calibration Filscan__](https://calibration.filscan.io/address/0x035dD367FD1F11260AD161Af6390Cb144CF113a6)
 */
export const useWatchSaldSaleSoldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: saldSaleAbi,
    address: saldSaleAddress,
    eventName: 'Sold',
  })
