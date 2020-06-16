import React, { useState, useEffect } from "react";
import styles from "./style.css";
import cx from "classnames";
import backArrow from "../assets/left-arrow.svg";
import PropTypes from "prop-types";

/**
 * @name SearchContainer
 * @param {@} props
 * @description Address search container for GMap
 */
const SearchContainer = (props) => {
  const { placeholder, className } = props;
  const [showSearch, setShowSearch] = useState(true);
  const inputRef = React.createRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  /**
   * @name onSearchChange
   * @param {*} event
   * @description On search input change
   */
  const onSearchChange = (event) => {
    console.log("Searching ...", event?.target?.value);
    props.onChange(event?.target?.value);
  };

  /**
   * @name onTransitionEndEvent
   * @param {*} event
   * @description On animation end
   */
  const onTransitionEndEvent = (event) => {
    console.log("onTransitionEndEvent -> event", event);
    props.onClose();
  };

  return (
    <div
      className={cx(
        styles.mapSearchContainer,
        className,
        !showSearch ? styles.hide : styles.show
      )}
      onTransitionEnd={onTransitionEndEvent}
    >
      <div className={styles.searchHeader}>
        <div className="img-sec" onClick={() => setShowSearch(false)}>
          <img src={backArrow} />
        </div>
        <input
          type="text"
          className={styles.searchTextbox}
          onChange={onSearchChange}
          ref={inputRef}
          placeholder={placeholder}
        />
      </div>
      {props.children}
    </div>
  );
};

SearchContainer.propTypes = {
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func
};

SearchContainer.defaultProps = {
  placeHolder: "Search here",
  onChange: () => {},
  onClose: () => {}
};

export default SearchContainer;
