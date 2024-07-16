import clientPromise from "./lib/db.js";
import axios from "axios";
import cron from "node-cron";

import dotenv from "dotenv";
dotenv.config();

const fetchAndStoreData = async () => {
  const client = await clientPromise;
  const db = client.db("stockData");
  const collection = db.collection("prices");

  const stocks = [
    "BTC",
    "ETH",
    "USDT",
    "BNB",
    "SOL",
    "USDC",
    "XRP",
    "TONCOIN",
    "DOGE",
    "ADA",
    "TRX",
    "SHIB",
    "AVAX",
    "WBTC",
    "DOT",
    "LINK",
    "OKB",
    "BCH",
    "NEAR",
    "DAI",
  ];
  const apiUrl = process.env.API;

  try {
    const json = {
      currency: "USD",
      offset: 0,
      limit: 50,
      meta: true,
      codes: stocks,
    };
    const results = await axios.post(apiUrl, json, {
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.APIKEY,
      },
    });

    const data = results.data.map((result) => ({
      stock: result.code,
      price: result.rate,
      timestamp: new Date(),
    }));

    await collection.insertMany(data);
    console.log("Data successfully fetched and stored");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

cron.schedule("*/5 * * * * *", fetchAndStoreData);
