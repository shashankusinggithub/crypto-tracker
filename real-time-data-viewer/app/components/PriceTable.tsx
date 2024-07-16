"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPrices } from "@/lib/slices/priceSlice";
import styles from "./PriceTable.module.css";
import { AppDispatch } from "@/lib/store";

const PriceTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector((state: any) => state.prices.data);
  const stock = useSelector((state: any) => state.prices.stock) || "bitcoin";
  const status = useSelector((state: any) => state.prices.status);

  useEffect(() => {
    dispatch(fetchPrices(stock));

    const intervalId = setInterval(() => {
      dispatch(fetchPrices(stock));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, stock]);

  return (
    <div>
      <h2>{stock} Prices</h2>
      {status === "loading" && <p>Loading...</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Stock/Crypto</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price: any, index: number) => (
            <tr key={index}>
              <td>{price.stock}</td>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
