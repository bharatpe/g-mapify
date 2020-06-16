import React from "react";
import styles from "./style.css";
import cx from "classnames";
import backArrow from "../assets/left-arrow.svg";
import PropTypes from "prop-types";

export default class SearchContainer extends React.PureComponent {
  // define default props
  static propTypes = {
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    placeHolder: "Search here",
    onChange: () => {},
    onClose: () => {}
  };

  inputRef = null;

  constructor(props) {
    super(props);

    this.state = {
      closed: true,
      showSearch: true
    };

    this.inputRef = React.createRef();
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onTransitionEndEvent = this.onTransitionEndEvent.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 100);
  }

  // close search container
  closeSearch() {
    this.setState({
      showSearch: false
    });
  }

  // on search input change
  onSearchChange(event) {
    const searchVal = event.target.value;

    // call props onChange
    this.props.onChange(searchVal);
  }

  // animation end event
  onTransitionEndEvent(event) {
    this.props.onClose();
  }

  render() {
    const { showSearch } = this.state;
    const { placeholder, className } = this.props;

    return (
      <div
        className={cx(
          styles.mapSearchContainer,
          className,
          !showSearch ? styles.hide : styles.show
        )}
        onTransitionEnd={this.onTransitionEndEvent}
      >
        <div className={styles.searchHeader}>
          <div className="img-sec" onClick={() => this.closeSearch()}>
            <img src={backArrow} />
          </div>
          <input
            type="text"
            className={styles.searchTextbox}
            onChange={this.onSearchChange}
            ref={this.inputRef}
            placeholder={placeholder}
          />
        </div>

        {this.props.children}
      </div>
    );
  }
}
