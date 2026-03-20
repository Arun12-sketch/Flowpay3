# WDK Wallet Integration Guide

## Overview

This FlowPay project now supports **WDK (Web3 Data Kit) Wallet** for ERC-4337 account abstraction. This allows users to:

- ✅ Use smart contract wallets with sponsored gas payments
- ✅ Pay for transactions with ERC-20 tokens (USDT on Sepolia)
- ✅ Enable gasless transactions through paymasters
- ✅ Seamlessly switch between MetaMask and WDK wallets

## How to Run the App

### Prerequisites

- Node.js 18+ and npm
- Git
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Installation & Setup

1. **Navigate to the Vite project directory:**
   ```bash
   cd vite-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - The app will be available at: **http://localhost:5173**
   - Vite will automatically reload when you save changes

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Development Workflow

```bash
# Start dev server with HMR (Hot Module Replacement)
npm run dev

# Run TypeScript type checking
npm run type-check

# Build for production
npm run build

# Clean build artifacts
rm -rf dist
```

## Features

### WDK Wallet Benefits
- **Account Abstraction**: Uses Safe smart contract wallets (ERC-4337)
- **Gasless Transactions**: Sponsored transactions through Candide paymaster
- **Token Payments**: Pay gas fees in USDT instead of ETH
- **Better UX**: No transaction approval screens for simple operations

### Supported Networks
- **Ethereum Sepolia** (Testnet) - Default configuration
- Easily extendable to: Ethereum, Polygon, Arbitrum, Plasma

## Configuration

### Sepolia Testnet Setup

Located in: `src/config/wdkConfig.js`

```javascript
export const wdkSepoliaConfig = {
  chainId: 11155111,
  provider: 'https://sepolia.drpc.org',
  entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  bundlerUrl: 'https://api.candide.dev/public/v3/11155111',
  paymasterUrl: 'https://api.candide.dev/public/v3/11155111',
  paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
  safeModulesVersion: '0.3.0',
  paymasterToken: {
    address: '0xd077a400968890eacc75cdc901f0356c943e4fdb' // USDT on Sepolia
  },
  transferMaxFee: 100000 // 0.1 USDT (6 decimals)
}
```

## Setup Instructions

### 1. Generate or Import a Seed Phrase

For development/testing, you can use a test seed phrase:

```bash
# Example 12-word seed phrase:
test walk nut penalty hip pave soap entry language right filter choice
```

### 2. Connect WDK Wallet

1. Click **"WDK Wallet"** button in the header
2. Click **"Import Seed Phrase"**
3. Paste your 12 or 24-word BIP-39 seed phrase
4. Click **"Connect"**

The wallet will:
- Derive the standard Ethereum address: `m/44'/60'/0'/0/0`
- Initialize the Safe smart contract wallet
- Connect to Sepolia RPC

### 3. Automatic Account Creation

On first transaction, the WDK wallet will:
1. Create a Safe smart contract wallet (free, sponsored by Candide)
2. Sign the transaction with your seed phrase
3. Submit via the ERC-4337 bundler
4. Get sponsored gas through Candide paymaster

## Architecture

### Components

```
src/
├── config/
│   └── wdkConfig.js          # WDK configuration for Sepolia
├── context/
│   └── WalletContext.jsx     # Enhanced with WDK support
└── components/
    └── WdkWalletButton.jsx   # WDK connection UI
```

### WalletContext Updates

The WalletContext now provides:

```javascript
// New properties
walletType: 'metamask' | 'wdk' | null
wdkAccount: WalletManagerEvmErc4337 | null

// New methods
connectWdkWallet(): Promise<void>
connectMetaMask(): Promise<void>
connectWallet(type: 'metamask' | 'wdk'): Promise<void>
```

### Seed Phrase Storage

Currently stored in `localStorage` for demo purposes:
```javascript
localStorage.getItem('wdk_seed_phrase')
localStorage.setItem('wdk_seed_phrase', seedPhrase)
```

**⚠️ Security Warning**: In production, use secure key management:
- Hardware wallets
- Encrypted key storage
- Key derivation services
- Never expose private keys or seed phrases

## Usage Examples

### Connect WDK Wallet

```javascript
import { useWallet } from './context/WalletContext';

function MyComponent() {
  const { connectWdkWallet, walletType, walletAddress } = useWallet();

  return (
    <button onClick={() => connectWdkWallet()}>
      {walletType === 'wdk' 
        ? `Connected: ${walletAddress.slice(0, 6)}...`
        : 'Connect WDK Wallet'}
    </button>
  );
}
```

### Create Streams with WDK

```javascript
const { createStream, wdkAccount } = useWallet();

// Works the same with WDK account
const streamId = await createStream(
  recipientAddress,
  durationInSeconds,
  amountInMNEE
);
```

### Check Wallet Type

```javascript
const { walletType } = useWallet();

if (walletType === 'wdk') {
  console.log('Using WDK smart contract wallet');
} else if (walletType === 'metamask') {
  console.log('Using MetaMask');
}
```

## Network Configuration

### Add New Network (e.g., Polygon)

Edit `src/config/wdkConfig.js`:

```javascript
export const wdkPolygonConfig = {
  chainId: 137,
  provider: 'https://polygon-bor-rpc.publicnode.com',
  bundlerUrl: 'https://api.candide.dev/public/v3/polygon',
  paymasterUrl: 'https://api.candide.dev/public/v3/polygon',
  paymasterAddress: '0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba',
  entryPointAddress: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
  safeModulesVersion: '0.3.0',
  paymasterToken: {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' // USDT on Polygon
  },
  transferMaxFee: 100000
}

export const getWdkConfig = (chainId = 11155111) => {
  switch(chainId) {
    case 137: return wdkPolygonConfig;
    case 11155111: return wdkSepoliaConfig;
    default: return wdkSepoliaConfig;
  }
}
```

## Testing

### Test with Sepolia Testnet USDT

Get testnet tokens:
1. USDT: https://sepoliafaucet.com
2. ETH: https://sepoliafaucet.com (for initial setup)

### Test Gas Sponsorship

The Candide paymaster sponsors:
- Account creation (first transaction)
- Stream creation
- Token transfers

All within reasonable limits - see `transferMaxFee` config.

## Quick Start Guide

### Step 1: Start the App

```bash
cd vite-project
npm install
npm run dev
```

Open your browser to: **http://localhost:5173**

### Step 2: Choose Your Wallet

In the header (top right), you'll see two buttons:
- **"Connect Wallet"** - MetaMask/Traditional wallet
- **"WDK Wallet"** - Smart contract wallet (ERC-4337)

### Step 3: Connect WDK Wallet (Recommended)

1. Click the **"WDK Wallet"** dropdown button
2. Select **"Import Seed Phrase"**
3. Enter a test seed phrase:
   ```
   test walk nut penalty hip pave soap entry language right filter choice
   ```
4. Click **"Connect"**
5. Wait for the Safe smart contract wallet to initialize

### Step 4: View Your Dashboard

Once connected, you'll see:
- ✅ Your wallet address in the header
- ✅ Network: Ethereum Sepolia
- ✅ Available actions: Create streams, transfer tokens, etc.
- ✅ Active streams list
- ✅ Transaction history

### Step 5: Create Your First Stream

1. Go to **"Streams"** page
2. Click **"Create Stream"**
3. Fill in:
   - **Recipient Address**: Another Sepolia address
   - **Duration**: Time in seconds (e.g., 3600 for 1 hour)
   - **Amount**: MNEE tokens to stream
4. Click **"Create Stream"**
5. Sign the transaction (automatic with WDK)
6. Gas fees are sponsored by Candide paymaster!

### Step 6: Monitor Streams

- View incoming and outgoing streams
- Check real-time flow rates
- Withdraw accumulated funds
- Cancel active streams

### Available Test Networks

| Network | Chain ID | RPC Endpoint | Faucet |
|---------|----------|-------------|--------|
| Ethereum Sepolia | 11155111 | https://sepolia.drpc.org | [sepoliafaucet.com](https://sepoliafaucet.com) |

### Get Test Tokens

For Sepolia testnet:
- **ETH**: [Sepolia Faucet](https://sepoliafaucet.com)
- **USDT**: [Sepolia Faucet](https://sepoliafaucet.com)
- **MNEE**: Mint in app or contact team

### Performance Tips

- **First transaction slower**: Safe wallet creation takes ~5-10 seconds
- **Subsequent transactions faster**: Cached wallet instance
- **Gas estimates available**: Before signing transactions
- **Monitor gas**: Check sponsor limits in browser console

## Troubleshooting

### "Invalid private key" Error
- Seed phrase format must be valid BIP-39 (12 or 24 words)
- Check for extra spaces or typos
- Use known test seed phrases

### "WDK seed phrase not configured"
- Make sure seed phrase is set before connecting
- Check localStorage: `localStorage.getItem('wdk_seed_phrase')`

### "Safe4337Module not available"
- Network not supported (Avalanche C-Chain not supported)
- Use supported networks: Ethereum, Polygon, Arbitrum, Plasma, Sepolia

### "Connection refused"
- Bundler service is down
- Try switching to Pimlico config (alternative provider)

## Dependencies

```json
{
  "@tetherto/wdk-wallet-evm": "^1.0.0-beta.10",
  "ethers": "^6.15.0"
}
```

## Resources

- [WDK Documentation](https://wdk.tether.to)
- [ERC-4337 Spec](https://eips.ethereum.org/EIPS/eip-4337)
- [Safe Contracts](https://github.com/safe-global/safe-contracts)
- [Candide API](https://docs.candide.dev)
- [Pimlico Bundler](https://docs.pimlico.io)

## Future Enhancements

- [ ] Biometric authentication for seed phrase
- [ ] Hardware wallet support (Ledger, Trezor)
- [ ] Multi-chain wallet management
- [ ] Batch operations optimization
- [ ] Custom paymaster sponsorship rules
- [ ] Transaction simulation before sending
- [ ] Account recovery mechanisms

## License

MIT - See LICENSE file
