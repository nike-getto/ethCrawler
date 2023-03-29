import { useEffect, useState } from 'react'

export default function InformationItem({ data }) {
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
	}, [data])

	return (
		<>
			{result.map((res) => {
				const { nonce, blockHash, from, to, value } = res
				return (
					<tr
						key={nonce}
						className='bg-white border-b hover:bg-gray-50'
					>
						<td
							title={blockHash}
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{blockHash.slice(0, 8)}...{blockHash.slice(-9)}
						</td>
						<td
							title={from}
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{from.slice(0, 8)}...{from.slice(-9)}
						</td>
						<td
							title={to}
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
						>
							{to.slice(0, 8)}...{from.slice(-9)}
						</td>
						<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
							{(value / 1e18).toFixed(8)}
						</td>
						<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
							ETH
						</td>
					</tr>
				)
			})}
		</>
	)
}
