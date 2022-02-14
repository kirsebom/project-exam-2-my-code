import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const MessagePage = () => {
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	return <div>MessagePage</div>;
};

export default MessagePage;
