import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// 1. Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "contracts/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, Date.now() + "-" + originalName);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== ".sol") {
      return cb(new Error("Only Solidity files allowed"));
    }
    cb(null, true);
  }
});

// 2. Logic Imports
import { verifyPayment, getPaymentRequest, calculatePrice } from "./payments/facinetPayment.js";
import { build402Response } from "./payments/x402.js";
import { audit } from "./agent/auditAgent.js";
import { uploadAuditToIPFS } from "./blockchain/ipfsUploader.js";
import { storeAuditOnChain } from "./blockchain/registryWriter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));

const SUPPORTED_NETWORKS = ["base-sepolia", "avalanche-fuji"];
const PORT = process.env.PORT || 3000;

/* --- Internal Payment (Server Pays Fee) --- */
app.post("/pay", async (req, res) => {
  try {
    const { amount, network } = req.body;

    if (!network || !SUPPORTED_NETWORKS.includes(network)) {
      return res.status(400).json({ error: "Invalid or missing network" });
    }

    if (!process.env.PAYER_PRIVATE_KEY) {
      throw new Error("PAYER_PRIVATE_KEY missing in .env");
    }

    const { Facinet } = await import("facinet");
    const facinet = new Facinet({
      privateKey: process.env.PAYER_PRIVATE_KEY,
      network: network
    });

    const paymentResult = await facinet.pay({
      amount: amount || process.env.PAYMENT_AMOUNT || "1.00",
      recipient: process.env.RECEIVING_WALLET
    });

    console.log(`[PAYMENT] Sponsored Success: ${amount} USDC on ${network}`);
    res.json({ ...paymentResult, network });

  } catch (err) {
    console.error("PAYMENT FAIL:", err.message);
    res.status(500).json({ error: err.message });
  }
});
