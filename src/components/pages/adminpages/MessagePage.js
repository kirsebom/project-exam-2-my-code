import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const MessagePage = () => {
	const [messages, setMessages] = useState([]);
	const [token, setToken] = useContext(AppContext);
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
			}
		}
		fetchMessages();
	}, []);

	return (
		<>
			<div>MessagePage</div>
			{messages.map(function (message) {
				if (message.post === 148) {
					return (
						<div key={message.id}>
							<h2>Message from: {message.author_name}</h2>
							<p>{message.content.rendered}</p>
						</div>
					);
				}
			})}
		</>
	);
};

export default MessagePage;
