import React from "react";
import SecondNavigation from "../SecondNavigation";
import ContactForm from "../ContactForm";
import styles from "../../style/pages/Contact.module.css";
import Footer from "../Footer";

const Contactpage = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.title}>Contact Holidaze</h1>
				<ContactForm />
			</div>
			<Footer />
		</>
	);
};

export default Contactpage;
