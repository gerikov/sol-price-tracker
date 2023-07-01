import { useState } from "react";
import PriceModule from "./components/PriceModule/PriceModule";
import styles from "./App.module.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.wrapper}>
      <PriceModule />
    </div>
  );
}

export default App;
