import styles from "../style/partials/MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import Searchbox from "./Searchbox";
import logo from "../logo.png";

const MainNavigation = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<NavLink to="/">
					<img className={styles.logo} src={logo} alt="Logo" />
				</NavLink>
				<nav className={styles.nav}>
					<NavLink className={`${styles.nav_link}`} to="/bookings">
						Bookings
					</NavLink>
					<NavLink className={styles.nav_link} to="/contact">
						Contact Holidaze
					</NavLink>
				</nav>
				<NavLink
					className={`${styles.nav_link} ${styles.login_btn}`}
					to="/login"
				>
					Login
				</NavLink>
			</div>
			<Searchbox />
		</header>
	);
};

export default MainNavigation;
