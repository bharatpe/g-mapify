import React from "react";
import cx from "classnames";
import styles from "./style.css";

import searchIcon from "../assets/search-icon.png";

const SearchComponent = (props) => {
  return (
    <div {...props} className={cx(styles.mapTextarea, props.className)}>
      <div className={styles.locationLive} />
      <div className={styles.locationContainer}>
        <span className={styles.locationTitle}> Location </span>
        <span className={styles.address}>{props.value}</span>
      </div>
      <img src={searchIcon} className={styles.searchIcon} />
    </div>
  );
};

export default SearchComponent;
