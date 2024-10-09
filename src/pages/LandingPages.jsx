// src/pages/LandingPage.jsx
import {useEffect, useState} from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'

const LandingPage = () => {
	const [countries, setCountries] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const formatPopulation = (population) => {
		return population >= 1e9
			? (population / 1e9).toFixed(1) + 'B'
			: population >= 1e6
			? (population / 1e6).toFixed(1) + 'M'
			: population.toLocaleString()
	}

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await axios.get(
					'https://restcountries.com/v3.1/all'
				)
				const sortedCountries = response.data.sort(
					(a, b) => b.population - a.population
				)
				setCountries(sortedCountries)
			} catch (error) {
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchCountries()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className="container">
			<Sidebar />
			<div className="content">
				<h1>Country Population Ranking</h1>
				<div className="country-list">
					{countries.map((country) => (
						<div
							key={country.cca2}
							className="country-card"
						>
							<h2>{country.name.common}</h2>
							<p>
								Population:{' '}
								{formatPopulation(country.population)}
							</p>
							<p>Code: {country.cca2}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default LandingPage
