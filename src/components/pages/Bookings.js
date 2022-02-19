import { useState, useEffect } from "react";
import SecondNavigation from "../SecondNavigation";
import styles from "../../style/pages/bookings.module.css";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { PRODUCT_URL } from "../constants/api";
import Footer from "../Footer";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchBookings() {
			try {
				const response = await fetch(PRODUCT_URL);
				const json = await response.json();
				console.log(json);
				setBookings(json);
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
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />

				<h1 className={styles.header}>All Bookings</h1>

				<div className={styles.booking_cards_container}>
					{bookings.map(function (booking) {
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

export default Bookings;
