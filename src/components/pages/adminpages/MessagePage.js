import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import SecondNavigation from "../../SecondNavigation";
import styles from "../../../style/pages/Messages.module.css";
import Footer from "../../Footer";
import Spinner from "react-bootstrap/Spinner";

const MessagePage = () => {
	const [messages, setMessages] = useState([]);
	const [token, setToken] = useContext(AppContext);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
		async function fetchMessages() {
			try {
				const response = await fetch(
					"https://omkirsebom.no/wp-json/wp/v2/comments"
				);
				const json = await response.json();
				console.log(json);
				setMessages(json);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		fetchMessages();
	}, []);

	function refreshPage() {
		window.location.reload(true);
	}

	if (loading) {
		return (
			<>
				<SecondNavigation />
				<h1 className={styles.title}>Messages to Holidaze</h1>
				<div className={styles.loading_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.title}>Messages to Holidaze</h1>
				<div className={styles.message_container}>
					{messages.map(function (message) {
						console.log(message.content.rendered);
						const description = message.content.rendered;
						if (message.post === 148 && message.post > 0) {
							return (
								<div key={message.id} className={styles.message_card}>
									<h2 className={styles.message_title}>
										From: {message.author_name}
									</h2>
									<p
										className={styles.message_content}
										dangerouslySetInnerHTML={{ __html: description }}
									></p>
									<button
										className={styles.delete_btn}
										onClick={() => {
											console.log(message.id);
											const url =
												"https://omkirsebom.no/wp-json/wp/v2/comments/" +
												message.id;
											console.log(url);
											if (
												window.confirm(
													"Are you sure you want to delete message?"
												)
											) {
												fetch(url, {
													method: "DELETE",
													headers: {
														"Content-Type": "application/json",
														accept: "application/json",
														Authorization: `Bearer${token.token}`,
													},
												}).then(function () {
													refreshPage();
												});
											} else {
												refreshPage();
											}
										}}
									>
										Delete Message
									</button>
								</div>
							);
						}
					})}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MessagePage;
