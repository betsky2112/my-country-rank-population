// src/pages/CompareResult.jsx
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const CompareResult = () => {
	const {code1, code2} = useParams()
	const [country1, setCountry1] = useState(null)
	const [country2, setCountry2] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response1 = await axios.get(
					`https://restcountries.com/v3.1/alpha/${code1}`
				)
				const response2 = await axios.get(
					`https://restcountries.com/v3.1/alpha/${code2}`
				)
				setCountry1(response1.data[0])
				setCountry2(response2.data[0])
			} catch (error) {
				console.error('Error fetching country data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCountries()
	}, [code1, code2])

	if (loading) return <div>Loading...</div>
	if (!country1 || !country2) return <div>Error: Country data not found</div>

	return (
		<div className="compare-result">
			<h1>
				Comparison Between {country1.name.common} and{' '}
				{country2.name.common}
			</h1>
			<div className="comparison">
				<div className="country">
					<h2>{country1.name.common}</h2>
					<p>Population: {country1.population.toLocaleString()}</p>
					<p>Region: {country1.region}</p>
					<p>Capital: {country1.capital}</p>
				</div>
				<div className="country">
					<h2>{country2.name.common}</h2>
					<p>Population: {country2.population.toLocaleString()}</p>
					<p>Region: {country2.region}</p>
					<p>Capital: {country2.capital}</p>
				</div>
			</div>
		</div>
	)
}

export default CompareResult
