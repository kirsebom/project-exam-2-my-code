import React from "react";
import SecondNavigation from "../SecondNavigation";
import { useContext, useEffect } from "react";
import SearchContext from "../context/SearchContext";
import { Link } from "react-router-dom";
import styles from "../../style/pages/Resultspage.module.css";
import Footer from "../Footer";
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
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.header}>Search results:</h1>
				<div className={styles.booking_cards_container}>
					{results.map(function (booking) {
						return (
							<Link
								className={styles.booking_card}
								to={`/bookings/${booking.id}`}
							>
								<div key={booking.id}>
									<img
										src={booking.images[0].src}
										className={styles.image}
										alt={booking.images[0].alt}
									/>
									<p className={styles.title}>{booking.name}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ResultsPage;
