import { useState, useEffect } from "react";
import SecondNavigation from "../SecondNavigation";
import styles from "../../style/pages/bookings.module.css";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchBookings() {
			try {
				const response = await fetch(
					"https://omkirsebom.no/wp-json/wc/store/products"
				);
				if (response.ok) {
					const json = await response.json();
					console.log(json);
					setBookings(json);
				} else {
					setError(
						"An errror occured while trying to fetch all the booking options"
					);
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchBookings();
	}, []);

	if (loading) {
		return (
			<div className={styles.main_content}>
				<SecondNavigation />
				<h1>All Bookings</h1>
				<div className={styles.loader_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</div>
		);
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className={styles.main_content}>
			<SecondNavigation />
			<h1>All Bookings</h1>
			<div className={styles.booking_cards_container}>
				{bookings.map(function (booking) {
					return (
						<Link to={`/bookings/${booking.id}`}>
							<div key={booking.id} className={styles.booking_card}>
								<p>{booking.name}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Bookings;
