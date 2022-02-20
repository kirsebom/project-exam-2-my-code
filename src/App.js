import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Bookings from "./components/pages/Bookings";
import Detailpage from "./components/pages/Detailpage";
import Contactpage from "./components/pages/Contactpage";
import Loginpage from "./components/pages/adminpages/Loginpage";
import AdminPage from "./components/pages/adminpages/AdminPage";
import { AppProvider } from "./components/context/AppContext";
import NewEstablishmentPage from "./components/pages/adminpages/NewEstablishmentPage";
import EnquiryPage from "./components/pages/adminpages/EnquiryPage";
import MessagePage from "./components/pages/adminpages/MessagePage";
import ResultsPage from "./components/pages/ResultsPage";
import { SearchProvider } from "./components/context/SearchContext";

function App() {
	return (
		<>
			<AppProvider>
				<SearchProvider>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/results" element={<ResultsPage />} />
						<Route path="/bookings" element={<Bookings />} />
						<Route path="/bookings/:id" element={<Detailpage />} />
						<Route path="/contact" element={<Contactpage />} />
						<Route path="/login" element={<Loginpage />} />
						<Route path="/admin" element={<AdminPage />} />
						<Route
							path="/admin/new-establishment"
							element={<NewEstablishmentPage />}
						/>
						<Route path="/admin/enquiries" element={<EnquiryPage />} />
						<Route path="/admin/messages" element={<MessagePage />} />
					</Routes>
				</SearchProvider>
			</AppProvider>
		</>
	);
}

export default App;
