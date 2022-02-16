import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "../style/partials/ImageSlider.module.css";
import { useNavigate, useParams } from "react-router-dom";

const ImageSlider = () => {
	const [imageDetails, setImageDetails] = useState([]);
	const [error, setError] = useState(null);
	const [width, setWidth] = useState(0);

	const carousel = useRef();

	useEffect(() => {
		console.log(carousel.current.offsetWidth);
		setWidth(2400 - carousel.current.offsetWidth);
	}, []);
	let navigate = useNavigate();
	const { id } = useParams();
	if (!id) {
		navigate("/");
	}
	const url = "https://omkirsebom.no/wp-json/wc/store/products" + "/" + id;
	console.log(url);

	useEffect(
		function () {
			async function fetchImageDetails() {
				try {
					const response = await fetch(url);
					if (response.ok) {
						const json = await response.json();
						console.log(json.images);
						setImageDetails(json.images);
					} else {
						console.log(error);
					}
				} catch (error) {
					console.log(error);
				}
			}
			fetchImageDetails();
		},
		[url]
	);

	return (
		<motion.div
			ref={carousel}
			className={styles.carousel}
			whileTap={{ cursor: "grabbing" }}
		>
			<motion.div
				drag="x"
				dragConstraints={{ right: 0, left: -width }}
				className={styles.inner_carousel}
			>
				{imageDetails.map(function (image) {
					return (
						<motion.div className={styles.item} key={image.id}>
							<img
								className={styles.item_img}
								src={image.src}
								alt={image.alt}
							/>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.div>
	);
};

export default ImageSlider;
