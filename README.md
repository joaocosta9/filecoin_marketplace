# Filecoin Marketplace

A decentralized marketplace for buying and selling encrypted files on Filecoin, with access control powered by Lit Protocol.

## Features

- 🔐 **Encrypted File Storage**: Files are encrypted using Lit Protocol before uploading to Filecoin
- 💰 **Marketplace**: Buy and sell files with FIL cryptocurrency
- 🔑 **Access Control**: Smart contract-based access control for purchased content
- 📦 **Dataset Management**: Organize files in Filecoin datasets
- 🌐 **Decentralized**: Built on Filecoin Calibration testnet

## Architecture

- **Frontend**: React + Vite + TanStack Router + Wagmi + RainbowKit
- **Smart Contracts**: Solidity (Foundry)
- **Storage**: Filecoin (via Synapse SDK)
- **Encryption**: Lit Protocol
- **Network**: Filecoin Calibration Testnet

## Prerequisites

- Node.js 20+
- npm or yarn
- Foundry (for smart contracts)
- MetaMask or compatible Web3 wallet
- Filecoin Calibration testnet FIL (for testing)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd filecoin_marketplace
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Contract Dependencies

```bash
cd ../contracts
npm install
forge install
```

## Configuration

### Frontend Environment

Create a `.env` file in the `frontend` directory (if needed for custom RPC endpoints):

```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Smart Contracts

The contracts are configured for Filecoin Calibration testnet. The Sale contract address is:

```
0x03996d8d526F82BdE5dD223499946aaf817AE30B
```

## Running the Application

### Development Mode

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## Smart Contract Deployment

### Compile Contracts

```bash
cd contracts
forge build
```

### Deploy to Filecoin Calibration

```bash
forge script script/Deploy.s.sol --rpc-url <calibration-rpc-url> --private-key <your-private-key> --broadcast
```

### Generate Wagmi Hooks

After deploying, update the contract address in `contracts/wagmi.config.ts` and regenerate the hooks:

```bash
cd contracts
npm run wagmi
```

## Usage

### 1. Connect Wallet

- Click "Connect Wallet" in the header
- Select MetaMask or your preferred wallet
- Switch to Filecoin Calibration testnet if needed

### 2. Get Test FIL

Get test FIL from the [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)

### 3. Create a Dataset (First Time Only)

- Go to your profile
- Click "Upload File"
- If you don't have a dataset, you'll be prompted to create one
- Confirm the transaction

### 4. Upload a File

- Click "Upload File"
- Fill in:
  - **Title**: Name of your file
  - **File**: Select file to upload
  - **Description**: Optional description
  - **Category**: Select a category
  - **Price**: Set price in FIL (0 for free)
- Click "Upload"
- Wait for:
  1. File encryption (if price > 0)
  2. Upload to Filecoin
  3. On-chain registration

### 5. Browse Marketplace

- Go to the homepage to see all available files
- Use search to filter by seller address
- Click "Buy" to purchase encrypted files

### 6. Download Purchased Files

- After purchase, view/download buttons appear
- Files are automatically decrypted using Lit Protocol
- View your purchases in the "Purchased Items" section on your profile

## Project Structure

```
filecoin_marketplace/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities (Lit Protocol, etc.)
│   │   ├── routes/         # TanStack Router pages
│   │   └── constants/      # App constants
│   ├── public/             # Static assets
│   └── package.json
├── contracts/
│   ├── src/
│   │   └── Sale.sol        # Marketplace smart contract
│   ├── script/             # Deployment scripts
│   ├── test/               # Contract tests
│   └── foundry.toml
└── README.md
```

## Key Technologies

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool
- **TanStack Router**: File-based routing
- **TanStack Query**: Data fetching and caching
- **Wagmi**: Ethereum/Filecoin interactions
- **RainbowKit**: Wallet connection UI
- **Tailwind CSS**: Styling
- **Shadcn UI**: Component library

### Storage & Encryption
- **Synapse SDK**: Filecoin storage operations
- **Lit Protocol**: File encryption and access control

### Smart Contracts
- **Foundry**: Smart contract development
- **Solidity**: Contract language

## Smart Contract Functions

### Sale.sol

- `setContent(uuid, price)`: Register content for sale
- `buy(creator, uuid)`: Purchase content
- `purchases(buyer, creator, uuid)`: Check if purchased
- `getAllContents()`: Get all marketplace items
- `getPurchasedItems(buyer)`: Get user's purchases

## Troubleshooting

### Build Issues

If you encounter memory issues during build:

```bash
NODE_OPTIONS='--max-old-space-size=8192' npm run build
```

### Wallet Connection Issues

- Ensure you're on Filecoin Calibration testnet
- Chain ID: 314159
- RPC: https://api.calibration.node.glif.io/rpc/v1

### File Upload Issues

- Ensure you have a dataset created
- Check you have sufficient FIL for gas
- Wait for transactions to confirm (can take 30-60 seconds)

### Download/Decryption Issues

- Ensure you've purchased the file (or are the owner)
- Wait a few moments after purchase for blockchain confirmation
- Check browser console for detailed error messages


