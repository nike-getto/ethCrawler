import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import etherscanApiInstance from '@/assets/axiosConfig'

export default function AddressData() {
	const [address, setAddress] = useState('')
	const [startblock, setStartBlock] = useState('')
	const [endblock, setEndBlock] = useState('')
	const [result, setResult] = useState()

	const router = useRouter()

	async function searchBlockchain(address, startblock, endblock) {
		endblock = endblock || 'latest'
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'account',
					action: 'txlist',
					address: '0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC',
					startblock,
					endblock,
					page: '1',
					offset: '10',
					sort: 'asc',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setAddress(+router.query.address)
		setStartBlock(router.query.startblock)
		setEndBlock(router.query.endblock)
		setResult(searchBlockchain(address, startblock, endblock))
	}, [])

	console.log(startblock)

	console.log(result)

	return (
		<div className='h-screen flex flex-col items-center justify-center text-xl bold'>
			<h1>Block Number: {}</h1>
			<br />
			<h1>Gas: {}</h1>
			<br />
			<h1>Gas Price: {} </h1>
		</div>
	)
}
