import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { orderBy } from "lodash";
import styles from "../../../style/pages/Enquiry.module.css";
import SecondNavigation from "../../SecondNavigation";
import Footer from "../../Footer";
import Spinner from "react-bootstrap/Spinner";

const EnquiryPage = () => {
	const [token, setToken] = useContext(AppContext);
	const [enquiries, setEnquiries] = useState([]);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

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
			} finally {
				setLoading(false);
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

	function refreshPage() {
		window.location.reload(true);
	}

	const orderComments = orderBy(enquiries, ["post"]);
	console.log(orderComments);

	if (loading) {
		return (
			<>
				<SecondNavigation />
				<h1 className={styles.title}>All messages to bookings</h1>
				<div className={styles.loader_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</>
		);
	}

	if (enquiries.length === 0) {
		return (
			<>
				<SecondNavigation />
				<h1 className={styles.title}>All messages to bookings</h1>
				<div>No enquiries are made yet</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				<SecondNavigation />
				<h1 className={styles.title}>All messages to bookings</h1>
				<div className={styles.message_card_container}>
					{orderComments.map(function (comment) {
						const message = comment.content.rendered;

						if (comment.post !== 148) {
							return (
								<div key={comment.id} className={styles.message_card}>
									<p>
										To:
										{posts.map(function (post) {
											if (comment.post === post.id) {
												return <> {post.title.rendered}</>;
											}
										})}
									</p>
									<p>From: {comment.author_name}</p>
									<p dangerouslySetInnerHTML={{ __html: message }}></p>
									<button
										className={styles.delete_btn}
										onClick={() => {
											console.log(comment.id);
											const url =
												"https://omkirsebom.no/wp-json/wp/v2/comments/" +
												comment.id;
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

export default EnquiryPage;
