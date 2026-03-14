# SoliShield
SoliShield is a gasless, a security auditor for Solidity smart contracts. It leverages Facinet for seamless USDC payments on Base and Avalanche, providing instant vulnerability analysis, dynamic risk scoring, and on-chain report registry. This ensures your code is production-ready with automated, and cost-effective security certificates.
✨ Key Features
🤖 AI-Driven Analysis: Detects Reentrancy, Overflow, and Access Control vulnerabilities using advanced pattern matching.

⛽ Gasless Payments: Integrated with Facinet—pay for audits in USDC without needing native gas tokens ($ETH / $AVAX).

📈 Dynamic Pricing: Audit costs are calculated automatically based on the complexity (Line CounThis is a fantastic addition! By adding Condition-Based Minting, you’ve turned a simple tool into a full-fledged trust protocol. It creates a "Proof of Security" ecosystem where only high-quality code gets rewarded with an on-chain badge.

Here is your updated, professional README.md that highlights the Gasless AI Audit + Milestone Badge Minting flow.

🛡️ SoliShiel
Gasless AI Security Auditor & Verifiable Badge Protocol
SoliShield AI is a decentralized security platform that empowers developers to audit and certify their smart contracts. Using AI-driven analysis and Facinet’s gasless infrastructure, users can run deep security scans and—if their code is robust enough—mint a non-transferable SoliShield Trust Badge as on-chain proof of their contract's integrity.

✨ Key Features
🤖 AI-Powered Deep Scan: Automated detection of Reentrancy, Logic Flaws, and Access Control vulnerabilities.

⛽ 100% Gasless Experience: Powered by Facinet. Pay audit fees in USDC on Base Sepolia or Avalanche Fuji without needing native $ETH or $AVAX.

🏅 Milestone Badge Minting: Only contracts achieving a Security Score > 80 are eligible to mint a "SoliShield Certified" NFT Badge.

📊 Dynamic Pricing: Real-time cost calculation ($0.50 base + $0.01/line) to keep audits affordable for small projects.

🔗 Dual-Persistence: Audit reports are pinned to IPFS and indexed on-chain for permanent, public verification.

🏗️ How it Works (The Protocol Flow)
Analyze: Developer uploads a .sol file. The system calculates the line count and required USDC fee.

Sponsor: The developer initiates a gasless USDC transaction via Facinet.

Audit: Once payment is verified, the AI agent performs the audit and generates a 0-100 Security Score.

Register: The report is saved to IPFS and the metadata is recorded on the blockchain registry.

Certify: * Score > 80: The developer unlocks the "Mint Badge" feature to claim their on-chain certificate.

Score < 80: The developer receives the report but must fix vulnerabilities to become eligible for a badge.

🛠️ Tech Stack
Smart Contracts: Solidity (Badge Minting & Registry)

Backend: Node.js, Express, Multer

AI Engine: Audit Agent (LLM-powered)

Web3: Facinet SDK (Gasless), Ethers.js, Pinata (IPFS)

Frontend: JavaScript, Tailwind CSS, jsPDF

🚀 Getting Started
1. Prerequisites
Node.js (v18+)

Python (for solc-select if running local Slither analysis)

A wallet private key with USDC (for the Sponsor wallet)

2. Installation
Bash
git clone https://github.com/your-username/solishield-ai.git
cd solishield-ai
npm install
3. Environment Setup
Create a .env file:

Code snippet
PORT=3000
PAYER_PRIVATE_KEY=your_private_key
RECEIVING_WALLET=your_receiving_address
BADGE_CONTRACT_ADDRESS=0x...
PINATA_GATEWAY=https://gateway.pinata.cloud
4. Run the Server
Bash
node server.js
📜 License
Distributed under the MIT License. See LICENSE for more information.t) of your contract.

🔗 On-Chain Transparency: Final audit reports are hashed and stored on-chain (Base/Avalanche) and hosted on IPFS.

📄 PDF Certificates: Generates branded, professional security certificates with a "Security Score" badge for project owners.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Tailwind-inspired), JavaScript (ES6+), jsPDF.

Backend: Node.js, Express, Multer.

Blockchain/Web3: Facinet SDK, Pinata (IPFS), Ethers.js.

AI: OpenAI/Gemini API (via Audit Agent).

🚀 Getting Started
1. Prerequisites
Node.js (v18+)

NPM or Yarn

A Pinata API Key (for IPFS)

A Private Key with USDC (for the Payer/Sponsor wallet)

2. Installation
Bash
# Clone the repository
git clone https://github.com/your-username/solishield.git

# Navigate to the project directory
cd solishield-ai

# Install dependencies
npm install
3. Environment Setup
Create a .env file in the root directory and add the following:

Code snippet
PORT=3000
PAYER_PRIVATE_KEY=your_private_key_here
RECEIVING_WALLET=your_receiving_wallet_address
PINATA_GATEWAY=https://gateway.pinata.cloud
NETWORK=base-sepolia
4. Running the App
Bash
# Start the server
node server.js
Open http://localhost:3000 in your browser to start auditing!

🏗️ How it Works (The Workflow)
Handshake: The user uploads a .sol file. The server calculates the price ($0.50 + $0.01/line).

Sponsorship: The app requests a gasless USDC transaction via Facinet.

Audit: Once payment is verified, the AI Agent analyzes the code.

Finalization: The report is pinned to IPFS and the CID is recorded on the selected blockchain.

Delivery: The user downloads their signed PDF Security Certificate.
