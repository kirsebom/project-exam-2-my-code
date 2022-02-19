import { useEffect, useState } from "react";
import styles from "../style/pages/details.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Enter your full name")
		.min(4, "Name must atleast be 4 characters long"),
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
	console.log("postId: ", props.postId);
	console.log("bookingDetails: ", props.bookingDetails);

	const [postId, setPostId] = useState([]);

	useEffect(function () {
		async function fetchPost() {
			const response = await fetch(
				"https://omkirsebom.no/wp-json/wp/v2/posts/"
			);
			const json = await response.json();
			console.log(json);
			let data = "";

			json.map(function (post) {
				if (post.title.rendered === props.bookingDetails.name) {
					return (data = post.id);
					// return (data = JSON.stringify({
					// 	post: post.id,
					// 	author_name: "Ole-Martin-TestName",
					// 	author_email: "test@gmail.com",
					// 	content: "Third test message sent from backend",
					// }));
				} else {
					return;
				}
			});
			console.log(data);
			setPostId(data);
		}
		fetchPost();
	}, []);
	console.log(postId);

	const { id } = useParams();
	const idArray = {
		id: id,
	};

	function cancelHandler() {
		props.onCancel();
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

		if (Object.keys(errors).length === 0) {
			fetch("https://omkirsebom.no/wp-json/wp/v2/comments", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					post: postId,
					author_name: nameValue,
					author_email: emailValue,
					author_user_agent: emailValue,
					content: messageValue,
				}),
			})
				.then((object) => {
					console.log("ERROR: ", object.message);
				})
				.catch((error) => console.error("Error: ", error));
			window.alert(
				`Your message has been sent to ${props.bookingDetails.name}`
			);
			props.onConfirm();
		}
	}
	console.log("errors: ", errors);
	const [nameValue, setNameValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [messageValue, setMessageValue] = useState("");
	function onChangeName(event) {
		setNameValue(event.target.value.toLowerCase());
	}

	function onChangeEmail(event) {
		setEmailValue(event.target.value.toLowerCase());
	}
	function onChangeMessage(event) {
		setMessageValue(event.target.value.toLowerCase());
	}
	console.log(nameValue);
	console.log(emailValue);
	console.log(messageValue);
	console.log(props.bookingDetails.name);
	return (
		<form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
			<h2>Contact {props.bookingTitle}</h2>
			<div className={styles.input_container}>
				<input
					className={styles.input}
					{...register("name")}
					placeholder="Your name"
					onChange={onChangeName}
				/>
				<label className={styles.label} htmlFor="name" />
			</div>
			{errors.name && (
				<span className={styles.error_message}>{errors.name.message}</span>
			)}
			<div className={styles.input_container}>
				<input
					className={styles.input}
					{...register("email")}
					placeholder="Your email"
					onChange={onChangeEmail}
				/>
				<label className={styles.label} htmlFor="email" />
			</div>
			{errors.email && (
				<span className={styles.error_message}>{errors.email.message}</span>
			)}
			<div className={styles.input_container}>
				<textarea
					className={styles.textarea}
					{...register("message")}
					placeholder="Write your message here"
					onChange={onChangeMessage}
				/>
				<label htmlFor="message" className={styles.textarea_label} />
			</div>
			{errors.message && (
				<span className={styles.error_message}>{errors.message.message}</span>
			)}

			<button className={styles.button_send}>Send Message</button>

			{/* <button onClick={cancelHandler}>Cancel</button>
			<button onClick={confirmHandler}>Send Message</button> */}
		</form>
	);
};

export default Modal;
