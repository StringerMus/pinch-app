import React from "react";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const Arrow = React.forwardRef(({ onClick }, ref) => (
    <i 
    className="fa-solid fa-caret-down"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const MoreDropdown = () => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={Arrow} />
            <Dropdown.Menu className="text-center">
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => {}}
                    aria-label="edit"
                >
                    <i className="fa-solid fa-pen" />
                </Dropdown.Item>
                <Dropdown.Item 
                    className={styles.DropdownItem}
                    onClick={() => {}}
                    aria-label="delete"
                >
                    <i className="fa-solid fa-trash" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};