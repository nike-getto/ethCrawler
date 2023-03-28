import { useEffect, useState } from 'react'
import Link from 'next/link'

import InformationItem from './InformationItem'
import LoadingScreen from './LoadingScreen'
import AddressData from '@/pages/information'
import AddressNotValid from './AddressNotValid'

export default function InformationTable({ address, result }) {
	const [data, setData] = useState({})

	useEffect(() => {
		setData(result)
	}, [result])

	if (address.length === 42) {
		return (
			<>
				<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
					<h1 className='mb-4 text-3xl font-extrabold leading-none tracking-tight'>
						Wallet address: {address}
					</h1>
					<br />
					<table className='w-700 text-sm text-left text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
						</thead>
						<tbody className='text-xs'>
							<InformationItem data={data} />
						</tbody>
					</table>
				</div>
			</>
		)
	} else {
		return <AddressNotValid />
	}
}
