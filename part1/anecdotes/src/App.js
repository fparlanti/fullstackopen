import { useState } from 'react'

const MostVotesAnecdote = ({ anecdotes, votes }) => {

	const max = Math.max(...votes)
	const maxIndex = votes.indexOf(max)

	if (max === 0) {
		return (
			<div></div>
		)
	} else {
		return (
			<div>
				<h1>Anecdote with most votes</h1>
				<p>
					{anecdotes[maxIndex]}
				</p>
				<p>
					has {max} votes
				</p>
			</div>
		)
	}
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	]

	const [selected, setSelected] = useState(0)
	const emptyArray = new Uint8Array(10);
	const [points, setPoints] = useState(emptyArray)

	const handlerNewAnecdote = () => {
		const newSelected = Math.floor(Math.random() * anecdotes.length)
		setSelected(newSelected)
	}

	const handlerVote = ({ anecdote }) => {
		const newPoints = [...points]
		newPoints[selected] = newPoints[selected] + 1
		setPoints(newPoints)
	}

	return (
		<div>
			<div>
				<h1>Anecdote of the day</h1>
				<p>
					{anecdotes[selected]}
				</p>
				<p>
					has {points[selected]} votes
				</p>
				<button onClick={handlerVote} anecdote={selected}>vote</button>
				<button onClick={handlerNewAnecdote}>new anecdote</button>
			</div>

			<MostVotesAnecdote anecdotes={anecdotes} votes={points} />
		</div >
	)
}

export default App