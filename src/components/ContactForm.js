import React from "react";
import styles from "../style/partials/ContactForm.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object().shape({
	firstname: yup
		.string()
		.required("Enter your firstname")
		.min(2, "Firstname must be atleast 2 characters long"),
	lastname: yup
		.string()
		.required("Enter your lastname")
		.min(2, "Lastname must be atleast 2 characters long"),
	email: yup
		.string()
		.required("Enter your email")
		.email("Please enter a valid email"),
	message: yup
		.string()
		.required("Please enter a message to holidaze")
		.min(20, "The message must be atleast 20 characters long"),
});

const ContactForm = () => {
	const [submitMessageIsOpen, setSubmitMessage] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function onSubmit(data) {
		console.log(data);
		if (Object.keys(errors).length === 0) {
			console.log("Message has been sent");
			setSubmitMessage(true);
		}
	}
	console.log("error: ", errors);
	return (
		<>
			{submitMessageIsOpen ? (
				<div className={styles.message_container}>Message has been sent</div>
			) : (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input_container}>
						<input
							name="firstname"
							className={styles.input}
							{...register("firstname")}
						/>
						<label for="firstname" className={styles.label}>
							Firstname
						</label>
					</div>
					{errors.firstname && (
						<span className={styles.error_message}>
							{errors.firstname.message}
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="lastname"
							className={styles.input}
							{...register("lastname")}
						/>
						<label for="lastname" className={styles.label}>
							Lastname
						</label>
					</div>
					{errors.lastname && (
						<span className={styles.error_message}>
							{errors.lastname.message}
						</span>
					)}
					<div className={styles.input_container}>
						<input
							name="email"
							className={styles.input}
							{...register("email")}
						/>
						<label for="email" className={styles.label}>
							Email
						</label>
					</div>
					{errors.email && (
						<span className={styles.error_message}>{errors.email.message}</span>
					)}
					<div className={styles.textarea_container}>
						<textarea
							name="message"
							className={styles.textarea}
							{...register("message")}
						/>
						<label for="message" className={styles.textarea_label}>
							Your message
						</label>
					</div>
					{errors.message && (
						<span className={styles.error_message}>
							{errors.message.message}
						</span>
					)}
					<button className={styles.button}>Send Message</button>
				</form>
			)}
		</>
	);
};

export default ContactForm;
