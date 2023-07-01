import styles from "./PriceModule.module.scss";
import axios from "axios";
import classNames from "classnames";
import cn from "classnames";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const PriceModule = () => {
  const [price, setPrice] = useState(null);
  const [active, setActive] = useState("usd");
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrice = useCallback(async (currency) => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${currency}`
    );
    if (data) {
      setPrice(data.solana[currency]);
    } else {
      setError("Something went wrong please try again");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPrice(currency);

    return () => {
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    };
  }, [currency]);

  const handleClick = (input) => {
    setCurrency(input);
    setActive(input);
  };
  return (
    <div className={styles.PriceModule}>
      <span className={styles.price}>{isLoading ? <Loader /> : price}</span>
      <span className={styles.error}>{}</span>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleClick("usd")}
          className={cn(active === "usd" ? styles.active : "")}
        >
          USD
        </button>
        <button
          onClick={() => handleClick("eur")}
          className={cn(active === "eur" ? styles.active : "")}
        >
          EUR
        </button>
        <button
          onClick={() => handleClick("btc")}
          className={cn(active === "btc" ? styles.active : "")}
        >
          BTC
        </button>
      </div>
    </div>
  );
};

export default PriceModule;
