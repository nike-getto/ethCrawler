import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import etherscanApiInstance from '@/assets/etherscanAxiosConfig'
import InformationTable from '@/components/InformationTable'

export default function AddressData() {
	const [address, setAddress] = useState('')
	const [startblock, setStartBlock] = useState('')
	const [endblock, setEndBlock] = useState('')
	const [result, setResult] = useState({}) // API has some problems :D
	const [page, setPage] = useState(1)

	const router = useRouter()

	function prevButtonClick(page) {
		console.log('Clicked previous')
		// 	if (page != 1) {
		// 		setPage(page - 1)
		// 	}
	}

	function nextButtonClick(page) {
		console.log('Clicked next')
		// 	setPage(page + 1)
	}

	async function searchBlockchain(address, startblock, endblock) {
		setResult('Loading...')
		endblock = endblock || 'latest'
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'account',
					action: 'txlist',
					address,
					startblock,
					endblock,
					page,
					offset: '10',
					sort: 'desc',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (
			typeof router.query.address == 'string' &&
			router.query.address.length === 42
		) {
			setAddress(router.query.address)
			setStartBlock(router.query.startblock)
			setEndBlock(router.query.endblock)
			setResult(searchBlockchain(address, startblock, endblock))
			if (page < 1) {
				setPage(1)
			}
		}
	}, [router, address, startblock, endblock, page])

	return (
		<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
			<InformationTable result={result} address={address} />
			Page: {page}
			<div className='inline-flex'>
				<button
					className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
					onClick={() => setPage(page - 1)}
				>
					Prev
				</button>
				<button
					className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>
		</div>
	)
}
