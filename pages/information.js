import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import etherscanApiInstance from '@/assets/axiosConfig'
import InformationTable from '@/components/InformationTable'

export default function AddressData() {
	const [address, setAddress] = useState('')
	const [startblock, setStartBlock] = useState('')
	const [endblock, setEndBlock] = useState('')
	const [result, setResult] = useState({}) // API has some problems :D
	const [page, setPage] = useState(1)

	const router = useRouter()

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
			// if (typeof res === 'object') {
			// 	res.then((r) => setResult(r))
			// 	console.log(`From information: ${result}`)
			// }
			// console.log(`From information: ${result}`)
		}
	}, [router, address, startblock, endblock])

	return <InformationTable result={result} address={address} />
}
