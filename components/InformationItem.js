export default function InformationItem({ result }) {
	if (result.length > 1 && result != 'Error! Invalid address format') {
		// API has some problems :D
		console.log(result)
		return (
			<>
				{result.map((res) => {
					const { nonce, blockHash, from, to, value } = res
					return (
						<tr
							className='bg-white border-b hover:bg-gray-50'
							key={nonce}
						>
							<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
								{blockHash}
							</td>
							<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
								{from}
							</td>
							<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
								{to}
							</td>
							<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
								{(value / 1e18).toFixed(8)} ETH
							</td>
						</tr>
					)
				})}
			</>
		)
	}
}
