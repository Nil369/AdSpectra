import { Routes, Route } from "react-router"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { PredictionPage } from "./pages/PredictionPage"
import { AnalyticsPage } from "./pages/AnalyticsPage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/prediction" element={<PredictionPage />} />
					<Route path="/analytics" element={<AnalyticsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
