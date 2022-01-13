import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Bookings from "./components/pages/Bookings";
import Detailpage from "./components/pages/Detailpage";
import Contactpage from "./components/pages/Contactpage";
import Loginpage from "./components/pages/adminpages/Loginpage";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/bookings" element={<Bookings />} />
				<Route path="/bookings/:id" element={<Detailpage />} />
				<Route path="/contact" element={<Contactpage />} />
				<Route path="/login" element={<Loginpage />} />
			</Routes>
		</>
	);
}

export default App;
