import styles from "../style/partials/Searchbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import SearchContext from "./context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
	const navigate = useNavigate();
	const [results, setResults] = useContext(SearchContext);
	const [bookings, setBookings] = useState([]);
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(function () {
		const loadBookings = async () => {
			const response = await axios.get(
				"https://omkirsebom.no/wp-json/wc/store/products"
			);
			console.log("bookings:", response.data);
			setBookings(response.data);
		};
		loadBookings();
	}, []);

	const onChangeHandler = (text) => {
		let matches = [];
		if (text.length > 0) {
			matches = bookings.filter((booking) => {
				const regex = new RegExp(`${text}`, "gi");
				return booking.name.match(regex);
			});
		}
		console.log("matches: ", matches);
		setSuggestions(matches);
		setText(text);
		console.log("text:", text);
		const filteredBookings = bookings.filter(function (booking) {
			if (booking.name.toLowerCase().startsWith(text.toLowerCase())) {
				return true;
			}
		});
		setSearchValue(filteredBookings);
	};

	const onSuggestHandler = (text) => {
		console.log(text);
		setText(text);
		setSuggestions([]);
	};
	const onClickHandler = (event) => {
		console.log(event.target.value);

		console.log("serachValue", searchValue);
		console.log(text);
		setText(text);
		setResults(searchValue);
		navigate("/results");
	};

	return (
		<>
			<div className={styles.container}>
				<input
					placeholder="search for booking.."
					className={styles.search_field}
					onChange={(e) => onChangeHandler(e.target.value)}
					value={text}
					onBlur={() => {
						setTimeout(() => {
							setSuggestions([]);
						}, 100);
					}}
				></input>
				<div className={styles.suggestion_container}>
					{suggestions &&
						suggestions.map((suggestion, i) => (
							<div
								key={suggestion.id}
								className={styles.suggestion}
								onClick={() => onSuggestHandler(suggestion.name)}
							>
								{suggestion.name}
							</div>
						))}
				</div>
				<button className={styles.search_btn} onClick={onClickHandler}>
					<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
				</button>
			</div>
		</>
	);
};

export default Searchbox;
