import { useState } from 'react'

const Button = ({ handler, text }) => {
	return (
		<button onClick={handler}>{text}</button>
	)
}

const StatisticLine = ({ text, value }) => {
	if (text === 'positive') {
		return (
			<tr>
				<td>{text}</td><td>{value} %</td>
			</tr>
		)
	} else {
		return (
			<tr>
				<td>{text}</td><td>{value} </td>
			</tr>
		)
	}
}

const Statistics = (props) => {
	const { good, neutral, bad } = props

	const all = good + neutral + bad

	if (all === 0) {

		return (
			<div>
				<h1>
					<p>statistics</p>
				</h1>
				<p>No feedback given</p>
			</div>
		)
	} else {
		const average = (good * 1 + bad * (-1)) / all
		const positive = good / all * 100


		return (
			<div>
				<h1>
					<p>statistics</p>
				</h1>
				<table>
					<tbody>
						<StatisticLine text='good' value={good} />
						<StatisticLine text='neutral' value={neutral} />
						<StatisticLine text='bad' value={bad} />
						<StatisticLine text='all' value={all} />
						<StatisticLine text='average' value={average} />
						<StatisticLine text='positive' value={positive} />
					</tbody>
				</table>
			</div>
		)
	}
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
				<p>give StatisticLine</p>
			</h1>
			<Button handler={goodHandler} text='good' />
			<Button handler={neutralHandler} text='neutral' />
			<Button handler={badHandler} text='bad' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)

}

export default App