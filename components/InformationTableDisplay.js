const { useState, useEffect } = require('react')

export default function InformationTableDisplay({ data }) {
	const [result, setResult] = useState([])
	// API has some problems :D
	// Basically, it doesn't send requests constantly, maybe it's because of my connection
	// or maybe it has something to do with the API itself.
	// So, I had to make tons of if statements to make sure that the right Promise
	// object is getting resolved and doesn't interrupt InformationItem component rendering.

	async function resolveData(dataSet) {
		if (typeof dataSet == 'object' && typeof dataSet.then === 'function') {
			await dataSet.then((d) => {
				if (d != 'Error! Invalid address format') {
					setResult(d)
				}
			})
		}
	}

	useEffect(() => {
		resolveData(data)
		console.log(data)
	}, [data])

	if (result.length == 0) {
		return (
			<>
				<h1 className='overflow-hidden mb-4 text-3xl font-extrabold leading-none tracking-tight'>
					No data to display
				</h1>
			</>
		)
	} else {
		return (
			<tr>
				<th scope='col' className='px-6 py-3'>
					Transaction Hash
				</th>
				<th scope='col' className='px-6 py-3'>
					From
				</th>
				<th scope='col' className='px-6 py-3'>
					To
				</th>
				<th scope='col' className='px-6 py-3'>
					Value
				</th>
				<th scope='col' className='px-6 py-3'>
					<span className='sr-only'>Edit</span>
				</th>
			</tr>
		)
	}
}
