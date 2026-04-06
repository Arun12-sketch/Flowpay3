# 💰 FlowPay: x402 + Streaming Payments for AI Agents

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![MNEE](https://img.shields.io/badge/Powered%20by-MNEE%20Stablecoin-green.svg)
![x402](https://img.shields.io/badge/x402-Compatible-purple.svg)
![Ethereum](https://img.shields.io/badge/Network-Ethereum%20Sepolia-blue.svg)

FlowPay combines **x402's HTTP-native service discovery** with **continuous payment streaming** for AI agents using MNEE stablecoin. The best of both worlds: standardized discovery + efficient streaming.

**🏆 Built for the MNEE Hackathon: Programmable Money for Agents, Commerce, and Automated Finance**


## 🏁 Quick Start (5 Minutes)

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MetaMask](https://metamask.io/) browser extension

### Step 1: Clone & Install

```bash
git clone https://github.com/Arun12-sketch/flowpay3.git
cd flowpay
npm run install:all
```

### Step 2: Run the App

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 3: Connect & Test

1. **Add Sepolia to MetaMask** (if not already added):
   - Network: Sepolia
   - RPC: `https://sepolia.infura.io/v3/YOUR_KEY` 
   - Chain ID: `11155111`

2. **Get Sepolia ETH** for gas fees:
   - [Sepolia Faucet](https://sepoliafaucet.com/)
   - [Alchemy Faucet](https://sepoliafaucet.com/)

3. **Connect wallet** and click "Mint MNEE" to get free test tokens

4. **Create a stream** and watch payments flow in real-time!

That's it! The contracts are already deployed on Sepolia - no deployment needed.

---

## 📋 Deployed Contracts (Sepolia)

| Contract | Address |
|----------|---------|
| FlowPayStream | `0x155A00fBE3D290a8935ca4Bf5244283685Bb0035` |
| MockMNEE | `0x96B1FE54Ee89811f46ecE4a347950E0D682D3896` |

---

## �  Advanced Setup

### Environment Variables (Optional)

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
# Only needed if deploying your own contracts
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY"
PRIVATE_KEY="YOUR_DEPLOYER_PRIVATE_KEY"

# AI Features (Optional)
GEMINI_API_KEY="your_gemini_api_key"
```

### Deploy Your Own Contracts

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Run Tests

```bash
npm test                    # Run all tests
npm run test:contracts      # Smart contract tests only
npm run test:sdk           # SDK tests only
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build:web` | Build for production |
| `npm run test` | Run all tests |
| `npm run deploy:sepolia` | Deploy contracts to Sepolia |
| `npm run demo:provider` | Run provider demo |
| `npm run demo:consumer` | Run consumer demo |

---

## 🔄 The Hybrid Approach: x402 Discovery + MNEE Streaming

### Why Both?

| Approach | Best For | Limitation |
|----------|----------|------------|
| **x402 Per-Request** | Few API calls | Payment overhead per request |
| **Streaming** | High-volume usage | Requires upfront deposit |
| **FlowPay Hybrid** | **Any usage pattern** | **None - best of both!** |

### How It Works

```
1. Agent makes HTTP request to API
2. Server returns HTTP 402 with x402-compatible payment requirements
3. FlowPay SDK parses requirements, uses Gemini AI to decide:
   - Few requests expected? → Use x402 per-request mode
   - Many requests expected? → Create MNEE payment stream
4. Agent pays and accesses service
5. AI continuously optimizes payment mode based on actual usage
```

---

## 🤖 The AI Agent Payment Problem

**The Challenge:** AI agents need to make thousands of micropayments per second for:
- API calls ($0.0001 per call)
- Compute resources ($0.01/second)
- Data feeds ($0.001/second)
- Content consumption (per-token pricing)

**Traditional Solutions Fail:**
- ❌ Discrete transactions: Too expensive (gas fees exceed payment value)
- ❌ Batching: Creates settlement delays (30+ seconds)
- ❌ Off-chain solutions: Requires trusted intermediaries

**FlowPay Solution:**
- ✅ x402 discovery: Standard HTTP 402 for universal agent interoperability
- ✅ Streaming payments: Efficient for high-volume usage
- ✅ MNEE stablecoin: Sub-cent fees + instant settlement
- ✅ AI-powered: Gemini decides optimal payment mode

---

## 🚀 Key Features

### x402-Compatible Service Discovery
- **HTTP 402 responses** - Standard payment required responses
- **Universal interoperability** - Works with any x402-compatible agent
- **Payment requirements** - Clear pricing in response headers
- **Flexible modes** - Support both per-request and streaming

### Efficient MNEE Payment Streaming
- **Per-second value transfer** - Money flows continuously for high-volume usage
- **Instant withdrawals** - Recipients claim funds anytime
- **Live balance counters** - Watch payments stream in real-time
- **Micropayment support** - Rates as low as $0.0001/second

### x402 Express Middleware
```javascript
// Add payment requirements to any Express endpoint
app.use(flowPayMiddleware({
    endpoints: {
        "GET /api/weather": {
            price: "0.0001",
            mode: "streaming",  // or "per-request"
            minDeposit: "1.00",
            description: "Real-time weather data"
        }
    }
}));
```

### AI Agent SDK with x402 Support
- **Automatic 402 handling** - SDK parses payment requirements automatically
- **Smart mode selection** - Gemini AI chooses streaming vs per-request
- **Auto-discovery** - Agents find and connect to services via HTTP 402
- **Budget management** - Spending limits and safety controls

### Intelligent Decision Making (Gemini AI)
- **Payment mode optimization** - AI recommends streaming vs per-request
- **Spending analysis** - Analyzes usage and recommends adjustments
- **Service quality evaluation** - Automatically switch providers
- **Natural language queries** - Ask your agent about payment status

### Human Oversight Dashboard
- **Real-time monitoring** - See all active streams with live updates
- **x402 discovery logs** - Track payment requirement responses
- **Agent console** - Configure and test AI agents
- **Emergency controls** - Pause or cancel streams instantly

---

## 🎯 Use Cases

### 1. x402 Service Discovery + Streaming
```javascript
import { FlowPayAgent } from 'flowpay-sdk';

const agent = new FlowPayAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY
});

// SDK automatically handles x402 flow:
// 1. Makes request → receives HTTP 402
// 2. Parses payment requirements
// 3. AI decides: streaming (high volume) or per-request (low volume)
// 4. Creates MNEE stream if streaming mode
// 5. Retries request with payment proof
const weather = await agent.fetch('https://api.weather-agent.com/forecast');
console.log(await weather.json());
```

### 2. Provider with x402 Middleware
```javascript
import express from 'express';
import { flowPayMiddleware } from 'flowpay-sdk';

const app = express();

// One line to add payment requirements!
app.use(flowPayMiddleware({
    endpoints: {
        "GET /api/weather": {
            price: "0.0001",
            mode: "streaming",
            minDeposit: "1.00",
            description: "Weather data API"
        },
        "POST /api/translate": {
            price: "0.001",
            mode: "per-request",
            description: "Translation service"
        }
    },
    mneeAddress: process.env.MNEE_ADDRESS,
    flowPayContract: process.env.FLOWPAY_CONTRACT
}));

app.get('/api/weather', (req, res) => {
    // Only reached if payment verified!
    res.json({ temp: 28, city: 'Lagos' });
});
```

### 3. AI-Powered Payment Mode Selection
```javascript
// Gemini analyzes usage and recommends optimal mode
const agent = new FlowPayAgent({
  geminiApiKey: process.env.GEMINI_API_KEY,
  dailyBudget: '50.00'
});

// First request: AI analyzes expected usage
// "I expect to make 1000 API calls" → Streaming mode (more efficient)
// "I need just one translation" → Per-request mode (simpler)

const recommendation = await agent.recommendPaymentMode({
  service: 'weather-api',
  expectedCalls: 1000,
  duration: '1 hour'
});

console.log(recommendation);
// { mode: 'streaming', reason: 'High volume usage - streaming saves 90% on gas' }
```

### 4. GPU Compute with Streaming
```javascript
// Rent GPU resources with real-time payment
const computeStream = await agent.createStream({
  recipient: gpuProviderAddress,
  ratePerSecond: '0.01', // $36/hour
  deposit: '36.00',      // 1 hour prepaid
  metadata: { purpose: 'ML training' }
});

// Cancel early? Get unused funds back automatically
await computeStream.cancel(); // Refunds remaining deposit
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FlowPay Hybrid Architecture                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         HTTP Request          ┌────────────┐ │
│  │   Consumer   │ ─────────────────────────────▶│  Provider  │ │
│  │    Agent     │                               │    API     │ │
│  └──────┬───────┘                               └─────┬──────┘ │
│         │                                             │        │
│         │ ◀─────── HTTP 402 Payment Required ─────────┘        │
│         │          (x402 compatible headers)                    │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    FlowPay SDK                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │  │
│  │  │ x402 Parser │  │ Gemini AI   │  │ Payment Manager │  │  │
│  │  │             │  │ Mode Select │  │ Stream/Request  │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│         ┌───────────────────┼───────────────────┐              │
│         │                   │                   │              │
│  ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐       │
│  │   FlowPay   │    │    MNEE     │    │    Web      │       │
│  │  Contract   │◀──▶│   Token     │    │  Dashboard  │       │
│  │  (Streams)  │    │  (ERC-20)   │    │ (Oversight) │       │
│  └─────────────┘    └─────────────┘    └─────────────┘       │
│                                                                  │
│                    Ethereum Sepolia Testnet                      │
└─────────────────────────────────────────────────────────────────┘
```

### x402 Payment Flow

```
Consumer Agent                Provider API                FlowPay Contract
      │                            │                            │
      │──── GET /api/weather ─────▶│                            │
      │                            │                            │
      │◀─── 402 Payment Required ──│                            │
      │     X-Payment-Required:    │                            │
      │     X-FlowPay-Mode: stream │                            │
      │     X-FlowPay-Rate: 0.0001 │                            │
      │                            │                            │
      │ [SDK parses, AI decides]   │                            │
      │                            │                            │
      │────────── createStream ────────────────────────────────▶│
      │◀───────── Stream #1234 ─────────────────────────────────│
      │                            │                            │
      │── GET /api/weather ───────▶│                            │
      │   X-FlowPay-Stream: 1234   │                            │
      │                            │── verify stream ──────────▶│
      │                            │◀─ balance OK ──────────────│
      │◀─── 200 OK + Data ─────────│                            │
      │                            │                            │
```

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Blockchain | Ethereum Sepolia Testnet |
| Token | MNEE Stablecoin (ERC-20) |
| Discovery Protocol | x402 (HTTP 402 standard) |
| Smart Contracts | Solidity, Hardhat |
| Agent SDK | TypeScript |
| Server Middleware | Express.js |
| AI Integration | Google Gemini API |
| Frontend | React (Vite), JavaScript |
| Blockchain Interaction | Ethers.js v6 |
| Styling | Tailwind CSS |

---

## 🔄 Mainnet Migration

When ready for production with real MNEE:

| Feature | Testnet (Sepolia) | Mainnet |
|---------|-------------------|---------|
| Token | MockMNEE (free mint) | Real MNEE |
| Network | Sepolia (11155111) | Ethereum (1) |
| Gas | Free testnet ETH | Real ETH |

**MNEE Mainnet Contract:** `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`

Update `vite-project/src/contactInfo.js` with mainnet addresses and deploy FlowPayStream to mainnet.

---

## 🤖 Agent SDK Usage

### Basic Stream Creation

```javascript
import { FlowPayAgent } from 'flowpay-sdk';

const agent = new FlowPayAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'sepolia'
});

// Create a payment stream
const stream = await agent.createStream({
  recipient: '0x1234...5678',
  ratePerSecond: '0.0001',
  deposit: '10.00',
  metadata: {
    agentId: 'weather_bot_01',
    purpose: 'API Metering'
  }
});

console.log(`Stream #${stream.id} created!`);
```

### AI-Powered Agent

```javascript
import { FlowPayAgent } from 'flowpay-sdk';

const agent = new FlowPayAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  dailyBudget: '50.00'
});

// Let AI optimize your spending
const decision = await agent.optimizeSpending();
console.log(`AI Decision: ${decision.action}`);
console.log(`Reasoning: ${decision.reasoning}`);

// Natural language queries
const response = await agent.ask("Should I subscribe to the translation API?");
console.log(response);
```

---

## 📊 Demo Scenario

**Watch two AI agents transact autonomously:**

1. **Agent Alice** (Consumer) needs weather data
2. **Agent Bob** (Provider) offers weather API at $0.0001/call
3. Alice opens a FlowPay stream to Bob
4. Alice makes 1,000 API calls over 10 minutes
5. Bob's balance increases in real-time: $0.00 → $0.10
6. Bob withdraws earnings anytime
7. Alice cancels stream when done, gets unused deposit back

**All payments happen automatically, no human intervention!**

---

## 🔒 Security Features

- **Spending Limits**: Daily and per-stream caps
- **Emergency Pause**: Instantly stop all agent activity
- **Auto-cancellation**: Streams cancel when services fail
- **Suspicious Activity Detection**: AI monitors for anomalies
- **Human Override**: Dashboard controls for manual intervention

---

## 📁 Project Structure

```
flowpay/
├── contracts/
│   ├── FlowPayStream.sol      # MNEE streaming contract
│   └── MockMNEE.sol           # Test token for Sepolia
├── scripts/
│   └── deploy.js              # Deployment script
├── sdk/
│   └── src/
│       ├── FlowPaySDK.ts      # Agent SDK with x402 handling
│       ├── GeminiPaymentBrain.ts  # AI payment decisions
│       └── SpendingMonitor.ts # Budget management
├── server/
│   └── middleware/
│       └── flowPayMiddleware.js  # x402 Express middleware
├── demo/
│   ├── consumer.ts            # AI agent demo (consumer)
│   └── provider.ts            # API provider demo
├── vite-project/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Dashboard, Streams, Docs
│   │   ├── context/           # Wallet context
│   │   └── contactInfo.js     # Contract addresses
│   └── netlify.toml           # Deployment config
├── test/
│   └── FlowPayStream.test.js  # Contract tests
├── hardhat.config.js
├── package.json
├── LICENSE                    # MIT License
└── README.md
```

---

## 🏆 Hackathon Track

**AI & Agent Payments** - Agents or automated systems paying for services or data

### How MNEE is Used

FlowPay uses MNEE stablecoin as the payment token for all streaming payments:
- **Payment Streams**: MNEE tokens are locked in the FlowPayStream smart contract and streamed per-second to recipients
- **x402 Protocol**: AI agents pay for API access using MNEE via the x402 HTTP payment negotiation standard
- **Testnet**: Uses MockMNEE (`0x96B1FE54Ee89811f46ecE4a347950E0D682D3896`) on Sepolia
- **Mainnet Ready**: Designed to work with real MNEE (`0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`) on Ethereum mainnet

FlowPay demonstrates:
- ✅ x402-compatible service discovery (HTTP 402 standard)
- ✅ AI agents transacting autonomously with MNEE
- ✅ Hybrid payment modes (per-request + streaming)
- ✅ Intelligent decision-making with Gemini AI
- ✅ Multi-agent service coordination
- ✅ Human oversight and safety controls

### Why FlowPay Stands Out

1. **x402 Compatibility** - Works with the emerging agent payment ecosystem
2. **Streaming Efficiency** - 90% gas savings for high-volume usage
3. **AI-Powered** - Gemini automatically optimizes payment mode
4. **MNEE Native** - Built specifically for MNEE stablecoin
5. **Production Ready** - Express middleware for easy integration

---

## 📋 Third-Party Disclosures

| Dependency | Purpose | License |
|------------|---------|---------|
| [Ethers.js](https://docs.ethers.org/) | Blockchain interaction | MIT |
| [React](https://react.dev/) | Frontend framework | MIT |
| [Vite](https://vitejs.dev/) | Build tool | MIT |
| [Tailwind CSS](https://tailwindcss.com/) | Styling | MIT |
| [Hardhat](https://hardhat.org/) | Smart contract development | MIT |
| [Google Gemini API](https://ai.google.dev/) | AI payment decisions | Google API Terms |
| [Axios](https://axios-http.com/) | HTTP client | MIT |

All third-party dependencies are used in accordance with their respective licenses.

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [MNEE](https://mnee.io) - USD-backed stablecoin powering this project
- [Google Gemini](https://ai.google.dev) - AI decision-making capabilities
- [Ethereum](https://ethereum.org) - Blockchain infrastructure

---

**Built with 💙 for the MNEE Hackathon**

*Enabling the autonomous economy, one stream at a time.*
