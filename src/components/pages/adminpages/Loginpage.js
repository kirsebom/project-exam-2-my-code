import React from "react";
import SecondNavigation from "../../SecondNavigation";
import styles from "../../../style/pages/Login.module.css";
import LoginForm from "../../LoginForm";

const Loginpage = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div>
					<SecondNavigation />
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default Loginpage;
