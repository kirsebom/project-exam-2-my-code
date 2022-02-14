import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

const EnquiryPage = () => {
	const [token, setToken] = useContext(AppContext);
	const navigate = useNavigate();
	useEffect(function () {
		if (!token) {
			navigate("/login");
		}
	});

	return <div>EnquiryPage</div>;
};

export default EnquiryPage;
