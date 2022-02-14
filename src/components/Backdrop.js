import React from "react";
import styles from "../style/pages/details.module.css";

const Backdrop = (props) => {
	return <div className={styles.backdrop} onClick={props.onCancel}></div>;
};

export default Backdrop;
