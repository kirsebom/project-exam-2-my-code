import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import styles from "../../../style/pages/NewEstablishment.module.css";
import SecondNavigation from "../../SecondNavigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../../Footer";

const schema = yup.object().shape({
	bookingname: yup
		.string()
		.required("Enter booking name")
		.min(3, "Booking name must be atleast 3 characters long"),
	price: yup.number().required(),
	description: yup
		.string()
		.required("Enter a description for the booking")
		.min(20, "The description must be atleast 20 characters long"),
	mainimageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a link to the image"),
	secondimageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a link to the image"),
	thirdimageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a link to the image"),
	forthimageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a link to the image"),
	fifthimageurl: yup
		.string()
		.url()
		.nullable()
		.required("Enter a link to the image"),
});

const NewEstablishmentPage = () => {
	const [token, setToken] = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(function () {
		console.log(token.token);
		if (!token) {
			navigate("/login");
		}
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function onSubmit(data) {
		setLoading(true);
		const newData = JSON.stringify({
			name: data.bookingname,
			type: "simple",
			regular_price: `${data.price}`,
			description: data.description,
			images: [
				{
					src: data.mainimageurl,
					position: 0,
				},
				{
					src: data.secondimageurl,
					position: 1,
				},
				{
					src: data.thirdimageurl,
					position: 2,
				},
				{
					src: data.forthimageurl,
					position: 3,
				},
				{
					src: data.fifthimageurl,
					position: 4,
				},
			],
		});

		async function addProductWithImages() {
			try {
				const response = await fetch(
					// "https://cors-anywhere.herokuapp.com/" +
					"https://omkirsebom.no/wp-json/wc/v3/products",
					{
						method: "POST",
						body: newData,
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${token.token}`,
						},
					}
				);
				if (response.ok) {
					const json = await response.json();
					console.log(json);
					addPost();
				} else {
					setError("An error occured, plis refresh and try again");
				}
			} catch (error) {
				setError(error.toString());
			}
		}
		addProductWithImages();

		async function addPost() {
			const postData = JSON.stringify({
				title: data.bookingname,
				content: data.description,
				status: "publish",
			});

			try {
				const response = await fetch(
					"https://omkirsebom.no/wp-json/wp/v2/posts",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json",
							Authorization: `Bearer${token.token}`,
						},
						body: postData,
					}
				);
				const json = await response.json();
				console.log(json);
			} catch {
				console.log("An error occured while making a new post");
			} finally {
				setLoading(false);
			}
		}
	}
	if (error) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.error_container}>{error}</div>
			</>
		);
	}

	if (loading) {
		return (
			<>
				<SecondNavigation />
				<div className={styles.loading_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
					<p className={styles.loading_text}>
						Be paitent, the product is being added to the database but this
						might take a couple of seconds...
					</p>
				</div>
			</>
		);
	}
	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<p className={styles.info}>
					For optimal image quality images should be vertical with the
					dimensions 1280 by 1920 pixels
				</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input_container}>
						<input
							name="bookingname"
							className={styles.input}
							{...register("bookingname")}
						/>
						<label htmlFor="bookingname" className={styles.label}>
							Booking name
						</label>
					</div>
					{errors.bookingname && (
						<span className={styles.error_message}>
							{errors.bookingname.message}
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="price"
							className={styles.input}
							{...register("price")}
						/>
						<label htmlFor="price" className={styles.label}>
							Price
						</label>
					</div>
					{errors.price && (
						<span className={styles.error_message}>
							Enter a price for the booking
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="mainimageurl"
							className={styles.input}
							{...register("mainimageurl")}
							placeholder="Link to image"
						/>
						<label htmlFor="mainimageurl" className={styles.label}>
							Main Image
						</label>
					</div>
					{errors.mainimageurl && (
						<span className={styles.error_message}>
							Enter a link to the image
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="secondimageurl"
							className={styles.input}
							{...register("secondimageurl")}
							placeholder="Link to image"
						/>
						<label htmlFor="secondimageurl" className={styles.label}>
							Second Image
						</label>
					</div>
					{errors.secondimageurl && (
						<span className={styles.error_message}>
							Enter a link to the image
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="thirdimageurl"
							className={styles.input}
							{...register("thirdimageurl")}
							placeholder="Link to image"
						/>
						<label htmlFor="thirdimageurl" className={styles.label}>
							Third Image
						</label>
					</div>
					{errors.thirdimageurl && (
						<span className={styles.error_message}>
							Enter a link to the image
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="forthimageurl"
							className={styles.input}
							{...register("forthimageurl")}
							placeholder="Link to image"
						/>
						<label htmlFor="forthimageurl" className={styles.label}>
							Forth Image
						</label>
					</div>
					{errors.forthimageurl && (
						<span className={styles.error_message}>
							Enter a link to the image 4
						</span>
					)}

					<div className={styles.input_container}>
						<input
							name="fifthimageurl"
							className={styles.input}
							{...register("fifthimageurl")}
							placeholder="Link to image"
						/>
						<label htmlFor="fifthimageurl" className={styles.label}>
							Fifth Image
						</label>
					</div>
					{errors.fifthimageurl && (
						<span className={styles.error_message}>
							Enter a link to the image
						</span>
					)}

					<div className={styles.textarea_container}>
						<textarea
							name="description"
							className={styles.textarea}
							{...register("description")}
						/>
						<label htmlFor="description" className={styles.textarea_label}>
							Booking description
						</label>
					</div>
					{errors.description && (
						<span className={styles.error_message}>
							{errors.description.message}
						</span>
					)}
					<div className={styles.button_container}>
						<button className={styles.button}>Add Booking</button>
						<div className={styles.button_background}></div>
					</div>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default NewEstablishmentPage;
