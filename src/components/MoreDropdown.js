import React from "react";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const Dots = React.forwardRef(({ onClick }, ref) => (
    <i 
        className={`fa-solid fa-ellipsis ${styles.Drop}`}
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const MoreDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={Dots} />
            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className={`fa-solid fa-pen ${styles.Drop}`} />
                </Dropdown.Item>
                <Dropdown.Item 
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className={`fa-solid fa-trash ${styles.Drop}`} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={Dots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className={`fa-solid fa-pen ${styles.Drop}`} /> edit profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className={`far fa-id-card ${styles.Drop}`} />
            change username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className={`fas fa-key ${styles.Drop}`} />
            change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }