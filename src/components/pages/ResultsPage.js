import React from "react";
import SecondNavigation from "../SecondNavigation";
import { useContext, useEffect } from "react";
import SearchContext from "../context/SearchContext";
import { Link } from "react-router-dom";
import styles from "../../style/pages/Resultspage.module.css";
const ResultsPage = () => {
	const [results, setResults] = useContext(SearchContext);
	console.log(results);

	if (results.length === 0) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.error_container}>
					Nothing matches your search.. Plis try again
				</div>
			</>
		);
	}

	return (
		<>
			<SecondNavigation />
			<h1 className={styles.header}>Search results:</h1>
			<div>
				{results.map(function (booking) {
					return (
						<Link to={`/bookings/${booking.id}`}>
							<div key={booking.id}>
								<p>{booking.name}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
};

export default ResultsPage;
