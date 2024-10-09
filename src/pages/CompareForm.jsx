// src/pages/CompareForm.jsx
import {useState, useEffect} from 'react'
import axios from 'axios'
import Select from 'react-select'
import {useNavigate} from 'react-router-dom'

const CompareForm = () => {
	const [countries, setCountries] = useState([])
	const [selectedCountry1, setSelectedCountry1] = useState(null)
	const [selectedCountry2, setSelectedCountry2] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await axios.get(
					'https://restcountries.com/v3.1/all'
				)
				const countryOptions = response.data.map((country) => ({
					value: country.cca2,
					label: country.name.common,
				}))
				setCountries(countryOptions)
			} catch (error) {
				console.error('Error fetching countries:', error)
			}
		}

		fetchCountries()
	}, [])

	const handleCompare = () => {
		if (selectedCountry1 && selectedCountry2) {
			navigate(
				`/compare/${selectedCountry1.value}/n/${selectedCountry2.value}`
			)
		} else {
			alert('Please select two countries to compare.')
		}
	}

	return (
		<div className="compare-form">
			<h1>Compare Countries</h1>
			<div className="form-group">
				<label>Select Country 1:</label>
				<Select
					options={countries}
					value={selectedCountry1}
					onChange={setSelectedCountry1}
					placeholder="Select a country"
				/>
			</div>
			<div className="form-group">
				<label>Select Country 2:</label>
				<Select
					options={countries}
					value={selectedCountry2}
					onChange={setSelectedCountry2}
					placeholder="Select a country"
				/>
			</div>
			<button onClick={handleCompare}>Compare</button>
		</div>
	)
}

export default CompareForm
