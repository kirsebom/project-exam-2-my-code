import styles from "../../style/pages/homepage.module.css";
import MainNavigation from "../MainNavigation";

const Homepage = () => {
	return (
		<div className={styles.main_container}>
			<MainNavigation />
			<div className={styles.container}>
				<p className={styles.text}>Do you want to visit Bergen?</p>
				<p className={styles.text}>Perfect!</p>
				<button className={styles.button}>Book a place to stay</button>
			</div>
		</div>
	);
};

export default Homepage;
