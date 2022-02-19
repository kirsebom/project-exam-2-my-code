import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { orderBy, isEqual } from "lodash";
import styles from "../../../style/pages/Enquiry.module.css";
import SecondNavigation from "../../SecondNavigation";
import Footer from "../../Footer";

const EnquiryPage = () => {
	const [token, setToken] = useContext(AppContext);
	const [enquiries, setEnquiries] = useState([]);
	const [posts, setPosts] = useState([]);
	const [postId, setPostId] = useState([]);
	const [postTitles, setPostTitles] = useState([]);

	const navigate = useNavigate();
	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
		async function fetchEnquiries() {
			try {
				const response = await fetch(
					"https://omkirsebom.no/wp-json/wp/v2/comments"
				);
				const json = await response.json();
				console.log("comments", json);
				setEnquiries(json);
			} catch {
				console.log("an error occured");
			}
		}
		fetchEnquiries();
		async function fetchPostId() {
			try {
				const response = await fetch(
					"https://omkirsebom.no/wp-json/wp/v2/posts"
				);
				const json = await response.json();
				console.log("posts", json);
				setPosts(json);
			} catch {
				console.log("an error occured while fetching postid");
			}
		}

		fetchPostId();
	}, []);
	let array = [];
	posts.map(function (post) {
		console.log(post.id);
		array.push(post.id);
	});
	console.log(array);
	const orderComments = orderBy(enquiries, ["post"]);
	console.log(orderComments);
	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.title}>All messages to bookings</h1>
				<div className={styles.message_card_container}>
					{orderComments.map(function (comment) {
						const message = comment.content.rendered;
						let postArray = [];
						posts.map(function (post) {
							console.log(post.title.rendered);
						});
						if (comment.post !== 148) {
							return (
								<div key={comment.id} className={styles.message_card}>
									<p>
										To:
										{comment.post === posts.id ? (
											<>
												<p>Hello</p>
											</>
										) : (
											<p> {posts.id}</p>
										)}
									</p>
									<p>From: {comment.author_name}</p>
									<p dangerouslySetInnerHTML={{ __html: message }}></p>
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

export default EnquiryPage;
