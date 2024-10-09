// src/components/Sidebar.jsx
import {Link} from 'react-router-dom'

const Sidebar = () => {
	return (
		<div className="sidebar">
			<h2>Country Rank</h2>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/compare">Compare Form</Link>
					</li>
					<li>
						<Link to="/news">News / Articles</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
