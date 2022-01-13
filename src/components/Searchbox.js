import styles from "../style/partials/Searchbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbox = () => {
	return (
		<div className={styles.container}>
			<input
				className={styles.search_field}
				type="text"
				placeholder="search for booking.."
			></input>
			<button className={styles.search_btn}>
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</button>
		</div>
	);
};

export default Searchbox;
