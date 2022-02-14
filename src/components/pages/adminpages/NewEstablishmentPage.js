import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const NewEstablishmentPage = () => {
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});
	return <div>NewEstablishmentPage</div>;
};

export default NewEstablishmentPage;
