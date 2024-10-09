// src/App.jsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPages'
import CompareForm from './pages/CompareForm'
import CompareResult from './pages/CompareResult'
import './App.css'
import NewsPage from './pages/NewsPage'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
				/>
				<Route
					path="/compare"
					element={<CompareForm />}
				/>
				<Route
					path="/compare/:code1/n/:code2"
					element={<CompareResult />}
				/>
				<Route
					path="/news"
					element={<NewsPage />}
				/>
			</Routes>
		</Router>
	)
}

export default App
