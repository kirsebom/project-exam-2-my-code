import React from "react";
import styles from "../style/partials/LoginForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { LOGIN_URL } from "./constants/api";

const schema = yup.object().shape({
	username: yup.string().required("Please enter a username"),
	password: yup.string().required("Please enter a password"),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [token, setToken] = useContext(AppContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	async function onSubmit(data) {
		setLoading(true);
		console.log("Login details: ", data);
		try {
			const response = await axios.post(LOGIN_URL, data);
			console.log("response", response.data);

			setToken(response.data);
			navigate("/admin");
		} catch (error) {
			setError("An error occured while loging in");
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}
	if (loading) {
		return (
			<>
				<div className={styles.loader_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("username")}
						placeholder="Username"
						className={styles.input}
					/>
					{errors.username && (
						<span className="login-error">{errors.username.message}</span>
					)}

					<input
						className={styles.input}
						{...register("password")}
						placeholder="Password"
						type="password"
					/>
					{errors.password && (
						<span className={styles.login_error}>
							{errors.password.message}
						</span>
					)}

					<button className={styles.button}>Submit</button>
				</form>
			</>
		);
	}
	if (error) {
		return (
			<>
				<div className={styles.login_error_container}>{error}</div>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("username")}
						placeholder="Username"
						className={styles.input}
					/>
					{errors.username && (
						<span className={styles.login - error}>
							{errors.username.message}
						</span>
					)}

					<input
						{...register("password")}
						placeholder="Password"
						type="password"
						className={styles.input}
					/>
					{errors.password && (
						<span className={styles.login_error}>
							{errors.password.message}
						</span>
					)}

					<button className={styles.button}>Submit</button>
				</form>
			</>
		);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register("username")}
				placeholder="Username"
				className={styles.input}
			/>
			{errors.username && (
				<span className={styles.login - error}>{errors.username.message}</span>
			)}

			<input
				{...register("password")}
				placeholder="Password"
				type="password"
				className={styles.input}
			/>
			{errors.password && (
				<span className={styles.login_error}>{errors.password.message}</span>
			)}

			<button className={styles.button}>Submit</button>
		</form>
	);
};

export default LoginForm;
