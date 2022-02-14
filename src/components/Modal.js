import React from "react";
import styles from "../style/pages/details.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
	email: yup
		.string()
		.required("Please enter your email address")
		.email("Please enter a valid email address"),
	message: yup
		.string()
		.required("Please enter your message")
		.min(10, "The message must be at least 10 characters"),
});

const Modal = (props) => {
	const { id } = useParams();
	const idArray = {
		id: id,
	};

	function cancelHandler() {
		props.onCancel();
	}
	function confirmHandler() {
		props.onConfirm();
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function onSubmit(data) {
		const finalResult = Object.assign(data, idArray);
		console.log(data);
		console.log(finalResult);
		props.onConfirm();
	}
	console.log("errors: ", errors);

	return (
		<form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
			<h2>Contact {props.bookingTitle}</h2>
			<div className={styles.input_container}>
				<input
					className={styles.input}
					{...register("email")}
					placeholder="Your email"
				/>
				<label className={styles.label} for="email" />
			</div>
			{errors.email && (
				<span className={styles.error_message}>{errors.email.message}</span>
			)}
			<div className={styles.input_container}>
				<textarea
					className={styles.textarea}
					{...register("message")}
					placeholder="Write your message here"
				/>
				<label for="message" className={styles.textarea_label} />
			</div>
			{errors.message && (
				<span className={styles.error_message}>{errors.message.message}</span>
			)}
			<div className={styles.button_container}>
				<button className={styles.button}>Send</button>
			</div>
			{/* <button onClick={cancelHandler}>Cancel</button>
			<button onClick={confirmHandler}>Send Message</button> */}
		</form>
	);
};

export default Modal;
