import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import SecondNavigation from "../../SecondNavigation";
import styles from "../../../style/pages/Admin.module.css";
import Footer from "../../Footer";

const AdminPage = () => {
	const [token, setToken] = useContext(AppContext);

	const navigate = useNavigate();
	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.title}>
					You are logged in as {token.user_display_name}
				</h1>

				<p className={styles.content}>
					Welcome to the admin part of the page, by logging in you can now use
					the adminpanel on the top of the page freely
				</p>
			</div>
			<Footer />
		</>
	);
};

export default AdminPage;
