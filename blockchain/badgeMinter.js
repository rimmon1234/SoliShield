import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const ABI = [
  "function mint(address recipient, string memory _contractName, uint256 _securityScore, string memory _ipfsCid) public returns (uint256)",
  "function totalMinted() public view returns (uint256)",
  "function getBadge(uint256 tokenId) public view returns (string memory, uint256, string memory, uint256)"
];

export async function mintAuditBadge(recipientAddress, contractName, securityScore, ipfsCid) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);
    const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      process.env.AUDIT_BADGE_ADDRESS,
      ABI,
      wallet
    );

    console.log(`Minting Audit Badge for ${recipientAddress}...`);

    const tx = await contract.mint(
      recipientAddress,
      contractName,
      securityScore,
      ipfsCid
    );

    const receipt = await tx.wait();
    console.log("Badge minted, tx hash:", receipt.hash);

    // Get token ID from event logs
    const tokenId = receipt.logs[0]?.topics[2]
      ? parseInt(receipt.logs[0].topics[2], 16)
      : 0;

    return {
      tokenId,
      txHash: receipt.hash,
      explorerUrl: `https://testnet.snowtrace.io/tx/${receipt.hash}`,
      tokenUrl: `https://testnet.snowtrace.io/token/${process.env.AUDIT_BADGE_ADDRESS}?a=${tokenId}`
    };

  } catch (err) {
    console.error("Badge minting failed:", err.message);
    throw err;
  }
}