import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className="text-center mt-3">
      <Asset
        src={NoResults}
      />
        <h3 className={`mt-3 ${styles.NotFound}`}>
            Oops! This page seems to have wandered off.
        </h3>
        <h6 className={`mt-2 ${styles.Sub}`}>
            The page you're trying to reach isn't available right now.
            <br/>Maybe it moved, or maybe it never existed.
        </h6>
    </div>
  );
};

export default NotFound;