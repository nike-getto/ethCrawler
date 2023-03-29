import { useEffect, useState } from 'react'

import InformationItem from './InformationItem'
import AddressNotValid from './AddressNotValid'
import InformationTableDisplay from './InformationTableDisplay'

export default function InformationTable({ address, result }) {
	const [data, setData] = useState({})

	useEffect(() => {
		setData(result)
	}, [result])

	if (address.length === 42) {
		return (
			<>
				<table className='w-700 text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<InformationTableDisplay data={data} />
					</thead>
					<tbody className='text-xs'>
						<InformationItem data={data} />
					</tbody>
				</table>
			</>
		)
	} else {
		return <AddressNotValid />
	}
}
