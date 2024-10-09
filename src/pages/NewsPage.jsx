/* eslint-disable react/prop-types */
// src/pages/NewsPage.jsx
import {useEffect, useState} from 'react'
import axios from 'axios'
import './NewsPage.css'

const NewsPage = () => {
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await axios.get(
					`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=peace&api-key=${
						import.meta.env.VITE_NYT_API_KEY
					}`
				)
				const results = response.data.response.docs.slice(0, 12) // Max 12 articles
				setArticles(results)
			} catch (error) {
				console.error('Error fetching articles:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchArticles()
	}, [])

	if (loading) return <div>Loading...</div>

	return (
		<div className="news-page">
			<h1>News about Peace</h1>
			<div className="news-grid">
				{articles.map((article) => (
					<ArticleCard
						key={article._id}
						article={article}
					/>
				))}
			</div>
		</div>
	)
}

const ArticleCard = ({article}) => {
	const imageUrl = article.multimedia.length
		? `https://www.nytimes.com/${article.multimedia[0].url}`
		: 'https://via.placeholder.com/150'

	return (
		<div className="article-card">
			<img
				src={imageUrl}
				alt={article.headline.main}
				className="article-image"
			/>
			<div className="article-content">
				<h2>{article.headline.main}</h2>
				<p className="article-summary">
					{article.abstract.length > 100
						? `${article.abstract.substring(0, 100)}...`
						: article.abstract}
				</p>
			</div>
		</div>
	)
}

export default NewsPage
