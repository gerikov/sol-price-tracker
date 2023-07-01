import cn from "classnames";
import styles from "./Button.module.scss";

const Button = ({ handleClick, ticker, active }) => {
  return (
    <button
      onClick={() => handleClick(ticker)}
      className={cn(active === ticker ? styles.active : "")}
    >
      {ticker.toUpperCase()}
    </button>
  );
};

export default Button;
