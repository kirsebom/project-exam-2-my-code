import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../style/partials/AdminNavigation.module.css";

const AdminNavigation = () => {
	return (
		<>
			<div className={styles.header_container}>
				<h2 className={styles.header}>Adminpanel</h2>
			</div>
			<nav className={styles.nav}>
				<NavLink className={styles.nav_link} to="/admin/new-establishment">
					Create new
				</NavLink>
				<NavLink className={styles.nav_link} to="/admin/enquiries">
					Enquiries
				</NavLink>
				<NavLink className={styles.nav_link} to="/admin/messages">
					Messages
				</NavLink>
			</nav>
		</>
	);
};

export default AdminNavigation;
