import React from "react";
import styles from "../style/partials/ContactForm.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Enter your full name")
		.min(4, "Name must be atleast 4 characters long"),
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

		const newData = JSON.stringify({
			post: data.postId,
			author_name: data.name,
			author_email: data.email,
			content: data.message,
		});
		console.log(newData);

		if (Object.keys(errors).length === 0) {
			console.log("Message has been sent");
			setSubmitMessage(true);

			fetch("https://omkirsebom.no/wp-json/wp/v2/comments", {
				method: "post",
				headers: {
					"Content-type": "application/json",
				},
				body: newData,
			})
				.then((response) => {
					if (response.ok === true) {
						console.log("Submitted successfully");
					}
					return response.json();
				})
				.then((object) => {
					console.log("ERROR: ", object.message);
				})
				.catch((error) => console.error("Error: ", error));
		}
	}
	console.log("error: ", errors);
	return (
		<>
			{submitMessageIsOpen ? (
				<div className={styles.message_container}>Message has been sent</div>
			) : (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						type="hidden"
						id="postId"
						value={148}
						{...register("postId")}
					/>
					<div className={styles.input_container}>
						<input name="name" className={styles.input} {...register("name")} />
						<label for="name" className={styles.label}>
							Name
						</label>
					</div>
					{errors.name && (
						<span className={styles.error_message}>{errors.name.message}</span>
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
					<div className={styles.button_container}>
						<button className={styles.button}>Send Message</button>
						<div className={styles.button_background}></div>
					</div>
				</form>
			)}
		</>
	);
};

export default ContactForm;
