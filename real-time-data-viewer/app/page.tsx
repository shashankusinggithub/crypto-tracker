"use client";

import { useState } from "react";
import PriceTable from "./components/PriceTable";
import ChangeStockModal from "./components/ChangeStockModal";
import styles from "./page.module.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <h1>Real-time Price Data</h1>
      <button onClick={handleOpen} className={styles.changeButton}>
        Change Stock
      </button>
      <PriceTable />
      <ChangeStockModal show={showModal} handleClose={handleClose} />
    </div>
  );
}
