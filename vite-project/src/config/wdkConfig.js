/**
 * WDK Wallet Configuration for Sepolia Testnet
 * Uses Candide as bundler and paymaster provider
 */

export const wdkSepoliaConfig = {
  // Network configuration
  chainId: 11155111, // Sepolia testnet
  provider: 'https://sepolia.drpc.org',
  
  // ERC-4337 Entry Point (standard v0.7)
  entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  
  // Bundler service (Candide)
  bundlerUrl: 'https://api.candide.dev/public/v3/11155111',
  
  // Paymaster service (Candide)
  paymasterUrl: 'https://api.candide.dev/public/v3/11155111',
  paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
  
  // Safe modules version
  safeModulesVersion: '0.3.0',
  
  // Paymaster token (USDT on Sepolia)
  paymasterToken: {
    address: '0xd077a400968890eacc75cdc901f0356c943e4fdb', // USDT Sepolia testnet
  },
  
  // Maximum fee for transfer operations
  transferMaxFee: 100000, // 0.1 USDT (6 decimals)
};

/**
 * Alternative configuration using Pimlico (if Candide is unavailable)
 */
export const wdkSepoliaConfigPimlico = {
  chainId: 11155111,
  provider: 'https://sepolia.drpc.org',
  entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  bundlerUrl: 'https://public.pimlico.io/v2/11155111/rpc',
  paymasterUrl: 'https://public.pimlico.io/v2/11155111/rpc',
  paymasterAddress: '0x777777777777AeC03fd955926DbF81597e66834C',
  safeModulesVersion: '0.3.0',
  paymasterToken: {
    address: '0xd077a400968890eacc75cdc901f0356c943e4fdb',
  },
  transferMaxFee: 100000,
};

/**
 * Get appropriate WDK config based on environment
 */
export const getWdkConfig = () => {
  return wdkSepoliaConfig; // Default to Candide
};

/**
 * WDK Wallet initialization options
 */
export const wdkWalletOptions = {
  // Standard BIP-44 derivation path for Ethereum
  derivationPath: "m/44'/60'/0'/0/0",
  
  // Gas payment mode: 'paymaster', 'sponsored', or 'native'
  gasPaymentMode: 'paymaster',
  
  // Allow account creation on first transaction
  autoCreateAccount: true,
};

/**
 * Gas estimation and payment settings
 */
export const gasSettings = {
  // Native coin mode (ETH)
  useNativeCoins: false,
  
  // Sponsored transaction mode
  isSponsored: false,
  
  // Paymaster token mode (default for WDK)
  usePaymasterToken: true,
  
  // Gas price multiplier for safety margin
  gasMultiplier: 1.1,
};
