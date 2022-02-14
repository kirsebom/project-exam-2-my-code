import styles from "../style/partials/SecondNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Searchbox from "./Searchbox";
import logo from "../logo.png";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import AdminNavigation from "./AdminNavigation";

const MainNavigation = () => {
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();
	function logout() {
		setToken(null);
		navigate("/login");
	}

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<NavLink to="/">
					<img
						className={`${styles.logo} ${styles.logo_first}`}
						src={logo}
						alt="Logo"
					/>
				</NavLink>

				<nav className={styles.nav}>
					<NavLink className={`${styles.nav_link}`} to="/bookings">
						Bookings
					</NavLink>
					<NavLink className={styles.nav_link} to="/contact">
						Contact
					</NavLink>
				</nav>
				{token ? (
					<>
						<button className={styles.logout_btn} onClick={logout}>
							Logout
						</button>
					</>
				) : (
					<NavLink
						className={`${styles.nav_link} ${styles.login_btn}`}
						to="/login"
					>
						Login
					</NavLink>
				)}
			</div>
			{token ? (
				<>
					<AdminNavigation />
				</>
			) : (
				<Searchbox />
			)}
		</header>
	);
};

export default MainNavigation;
