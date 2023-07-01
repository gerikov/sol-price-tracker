import styles from "./PriceModule.module.scss";
import axios from "axios";
import classNames from "classnames";
import cn from "classnames";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

const Price = ({ ticker, price, error }) => {
  const symbol = {
    usd: "$",
    eur: "€",
    btc: "₿",
  };
  return (
    <>
      {!error && (
        <div>
          <span className={styles.ticker}>{symbol[ticker]}</span>
          {price}
        </div>
      )}
    </>
  );
};

const PriceModule = () => {
  const [price, setPrice] = useState(null);
  const [active, setActive] = useState("usd");
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrice = useCallback(async (currency) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${currency}`
      );
      if (data) {
        setPrice(data?.solana[currency]);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
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

  const handleClick = (ticker) => {
    setCurrency(ticker);
    setActive(ticker);
  };
  return (
    <div className={styles.PriceModule}>
      <div className={styles.title}>Solana price</div>
      <span className={styles.price}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Price ticker={currency} price={price} error={error} />
            {error && <span className={styles.error}>{error}</span>}
          </>
        )}
      </span>
      <div className={styles.buttonContainer}>
        <Button handleClick={handleClick} active={active} ticker={"usd"} />
        <Button handleClick={handleClick} active={active} ticker={"eur"} />
        <Button handleClick={handleClick} active={active} ticker={"btc"} />
      </div>
    </div>
  );
};

export default PriceModule;
