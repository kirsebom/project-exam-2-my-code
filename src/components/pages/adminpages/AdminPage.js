import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import SecondNavigation from "../../SecondNavigation";

const AdminPage = () => {
	const [token, setToken] = useContext(AppContext);

	const navigate = useNavigate();
	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	return (
		<>
			<SecondNavigation />
			<div>AdminPage</div>
		</>
	);
};

export default AdminPage;
