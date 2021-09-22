import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll'
// import { robots } from '../robots.js';
import './App.css'
import ErrorBoundry from '../components/ErrorBoundry.js'


function App() {
	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {setRobots(users)});
	},[])

	const onSearchChange = (event) => {
		setSearchfield(event.target.value)
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase())
	})
	return !robots.length ?
	<h1 className='tc'>Loading</h1>:
	(
		<div className='tc'>
			<h1 className='f1'>RobotFriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
	  				<CardList robots={filteredRobots}/>
	  			</ErrorBoundry>
	  		</Scroll>
	  	</div>
	);	
}

export default App;