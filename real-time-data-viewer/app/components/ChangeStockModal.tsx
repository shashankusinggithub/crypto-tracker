"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStock } from "@/lib/slices/priceSlice";
import styles from "./ChangeStockModal.module.css";

const predefinedCoins = [
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

const ChangeStockModal = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  const [newStock, setNewStock] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setStock(newStock));
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStock(event.target.value);
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Change Stock</h2>
        <select onChange={handleChange} value={newStock}>
          <option value="" disabled>
            Select a coin
          </option>
          {predefinedCoins.map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ChangeStockModal;
