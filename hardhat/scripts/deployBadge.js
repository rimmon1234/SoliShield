import pkg from "hardhat";
const { ethers, run } = pkg;

async function main() {
  console.log("Deploying AuditBadge to Avalanche Fuji...");

  const AuditBadge = await ethers.getContractFactory("AuditBadge");
  const auditBadge = await AuditBadge.deploy();

  await auditBadge.waitForDeployment();

  const address = await auditBadge.getAddress();
  console.log("AuditBadge deployed to:", address);

  console.log("Waiting for block confirmations...");
  await auditBadge.deploymentTransaction().wait(5);

  console.log("Verifying on Sourcify...");
  await run("verify:verify", {
    address: address,
    constructorArguments: []
  });

  console.log("Verified!");
  console.log("\nAdd to your .env:");
  console.log(`AUDIT_BADGE_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});