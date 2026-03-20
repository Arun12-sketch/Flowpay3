/**
 * Quick setup verification script
 * Run: npx ts-node demo/check-setup.ts
 */
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const FLOWPAYSTREAM_ADDRESS = '0x155A00fBE3D290a8935ca4Bf5244283685Bb0035';
const MOCK_MNEE_ADDRESS = '0x96B1FE54Ee89811f46ecE4a347950E0D682D3896';
// Use a more reliable RPC endpoint
const RAW_SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com';
const SEPOLIA_RPC_URL = RAW_SEPOLIA_RPC_URL
    .replace(/^wss:\/\//, 'https://')
    .replace(/^ws:\/\//, 'http://');

async function checkSetup() {
    console.log("🔍 FlowPay Demo Setup Check\n");

    // 1. Check environment variables
    console.log("1️⃣  Environment Variables:");
    const privateKey = process.env.PRIVATE_KEY_1 || process.env.PRIVATE_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (privateKey) {
        console.log("   ✅ PRIVATE_KEY_1/PRIVATE_KEY: Found");
    } else {
        console.log("   ❌ PRIVATE_KEY_1/PRIVATE_KEY: Missing - Add to .env file");
    }

    if (geminiKey) {
        console.log("   ✅ GEMINI_API_KEY: Found");
    } else {
        console.log("   ⚠️  GEMINI_API_KEY: Missing - AI features will use fallback heuristics");
    }

    if (!privateKey) {
        console.log("\n❌ Cannot continue without PRIVATE_KEY_1 or PRIVATE_KEY");
        return;
    }

    // 2. Check network connection
    console.log("\n2️⃣  Network Connection:");
    try {
        const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        const network = await provider.getNetwork();
        console.log(`   ✅ Connected to: ${network.name} (chainId: ${network.chainId})`);
    } catch (e: any) {
        console.log(`   ❌ Failed to connect: ${e.message}`);
        return;
    }

    // 3. Check wallet
    console.log("\n3️⃣  Wallet:");
    const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(
        privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`,
        provider
    );
    console.log(`   📍 Address: ${wallet.address}`);

    // 4. Check ETH balance (for gas)
    const ethBalance = await provider.getBalance(wallet.address);
    console.log(`   ⛽ ETH Balance: ${ethers.formatEther(ethBalance)} ETH`);
    if (ethBalance < ethers.parseEther("0.01")) {
        console.log("   ⚠️  Low ETH balance - Get Sepolia ETH from a faucet");
    }

    // 5. Check MNEE balance
    console.log("\n4️⃣  MNEE Token:");
    const mneeContract = new ethers.Contract(
        MOCK_MNEE_ADDRESS,
        ['function balanceOf(address) view returns (uint256)'],
        provider
    );
    const mneeBalance = await mneeContract.balanceOf(wallet.address);
    console.log(`   💰 MNEE Balance: ${ethers.formatEther(mneeBalance)} MNEE`);
    if (mneeBalance < ethers.parseEther("1")) {
        console.log("   ⚠️  Low MNEE balance - Demo will auto-mint or use frontend to mint");
    }

    // 6. Check contracts exist
    console.log("\n5️⃣  Contracts:");
    const flowPayStreamCode = await provider.getCode(FLOWPAYSTREAM_ADDRESS);
    const mneeCode = await provider.getCode(MOCK_MNEE_ADDRESS);

    if (flowPayStreamCode !== '0x') {
        console.log(`   ✅ FlowPayStream: ${FLOWPAYSTREAM_ADDRESS}`);
    } else {
        console.log(`   ❌ FlowPayStream not deployed at ${FLOWPAYSTREAM_ADDRESS}`);
    }

    if (mneeCode !== '0x') {
        console.log(`   ✅ MockMNEE: ${MOCK_MNEE_ADDRESS}`);
    } else {
        console.log(`   ❌ MockMNEE not deployed at ${MOCK_MNEE_ADDRESS}`);
    }

    console.log("\n✅ Setup check complete!");
    console.log("\nTo run the demo:");
    console.log("   Terminal 1: npx ts-node demo/provider.ts");
    console.log("   Terminal 2: npx ts-node demo/consumer.ts");
}

checkSetup().catch(console.error);
