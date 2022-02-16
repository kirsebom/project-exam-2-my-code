import styles from "../style/partials/Searchbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import SearchContext from "./context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
	const [bookings, setBookings] = useState([]);
	const [text, setText] = useState("");
	const [suggestion, setSuggestions] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useContext(SearchContext);

	useEffect(function () {
		async function loadBookings() {
			const response = await axios.get(
				"https://omkirsebom.no/wp-json/wc/store/products"
			);
			console.log(response.data);
			setBookings(response.data);
		}
		loadBookings();
	}, []);

	function onChangeHandler(event) {
		setSearchValue(event.target.value.toLowerCase());

		const searchValue = event.target.value.trim().toLowerCase();
		console.log(searchValue);
		const filteredBookings = bookings.filter(function (booking) {
			if (booking.name.toLowerCase().startsWith(searchValue)) {
				return true;
			}
		});
		console.log(filteredBookings);
		setSuggestions(filteredBookings);

		// filteredBookings.filter(function (booking) {
		// 	console.log(JSON.stringify(booking.name));
		// 	setSuggestions(JSON.stringify(booking.name));
		// 	console.log("suggestions: ", suggestion);
		// });
		// console.log(bookingName);
	}
	const navigate = useNavigate();
	function onClickHandler() {
		console.log("Clicked!", searchValue);
		console.log("suggestions", suggestion);
		setResults(suggestion);
		navigate("/results");
	}
	return (
		<div className={styles.container}>
			<input
				className={styles.search_field}
				type="text"
				placeholder="search for booking.."
				onChange={onChangeHandler}
				// value={text}
			></input>
			<button className={styles.search_btn} onClick={onClickHandler}>
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</button>
		</div>
	);
};

export default Searchbox;
