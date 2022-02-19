import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondNavigation from "../SecondNavigation";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../style/pages/details.module.css";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
import ImageSlider from "../ImageSlider";
import Footer from "../Footer";

const Detailpage = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function contactHandler() {
		setModalIsOpen(true);
	}
	function closeModalHandler() {
		setModalIsOpen(false);
	}

	const [bookingDetails, setBookingDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let navigate = useNavigate();
	const { id } = useParams();
	if (!id) {
		navigate("/");
	}
	const url = "https://omkirsebom.no/wp-json/wc/store/products" + "/" + id;

	useEffect(
		function () {
			async function fetchBookingDetails() {
				try {
					const response = await fetch(url);
					if (response.ok) {
						const json = await response.json();
						setBookingDetails(json);
					} else {
						setError(
							"An error occured while trying the get the booking details.."
						);
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			fetchBookingDetails();
		},
		[url]
	);

	if (loading) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.loading_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</>
		);
	}
	if (error) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.error_container}>{error}</div>
			</>
		);
	}

	const imageArray = bookingDetails.images;
	console.log(imageArray);
	const description = bookingDetails.description;
	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.header}>{bookingDetails.name}</h1>
				<div className={styles.container}>
					<ImageSlider />
				</div>

				<div className={styles.container}>
					<p dangerouslySetInnerHTML={{ __html: description }}></p>

					<button className={styles.button_contact} onClick={contactHandler}>
						Contact {bookingDetails.name}
					</button>
				</div>
				{modalIsOpen && (
					<Modal
						bookingDetails={bookingDetails}
						postId={id}
						onCancel={closeModalHandler}
						onConfirm={closeModalHandler}
						bookingTitle={bookingDetails.name}
					/>
				)}
				{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
			</div>
			<Footer />
		</>
	);
};

export default Detailpage;
