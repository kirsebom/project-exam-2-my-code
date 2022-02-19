import React from "react";
import SecondNavigation from "../../SecondNavigation";
import styles from "../../../style/pages/Login.module.css";
import LoginForm from "../../LoginForm";
import Footer from "../../Footer";
const Loginpage = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div>
					<SecondNavigation />
					<LoginForm />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Loginpage;
