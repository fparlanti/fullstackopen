import { useState } from 'react'

const Button = ({ handler, name }) => {
	return (
		<button onClick={handler}>{name}</button>
	)
}

const Feedback = ({ name, value }) => {
	return (
		<div>
			<p>{name} {value}</p>
		</div>
	)
}


const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const goodHandler = () => {
		const newGood = good + 1
		setGood(newGood)
	}

	const neutralHandler = () => {
		const newNeutral = neutral + 1
		setNeutral(newNeutral)
	}

	const badHandler = () => {
		const newBad = bad + 1
		setBad(newBad)
	}

	return (
		<div>
			<h1>
				<p>give feedback</p>
			</h1>
			<Button handler={goodHandler} name='good' />
			<Button handler={neutralHandler} name='neutral' />
			<Button handler={badHandler} name='bad' />
			<h1>
				<p>statistics</p>
			</h1>
			<Feedback name='good' value={good} />
			<Feedback name='neutral' value={neutral} />
			<Feedback name='bad' value={bad} />
		</div>
	)

}

export default App