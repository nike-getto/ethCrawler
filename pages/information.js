import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import etherscanApiInstance from '@/assets/etherscanAxiosConfig'
import InformationTable from '@/components/InformationTable'
import AddressNotValid from '@/components/AddressNotValid'
import LoadingScreen from '@/components/LoadingScreen'

export default function AddressData() {
	const [address, setAddress] = useState('')
	const [startblock, setStartBlock] = useState('')
	const [endblock, setEndBlock] = useState('')
	const [result, setResult] = useState({}) // API has some problems :D
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	async function searchBlockchain(address, startblock, endblock) {
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

	function handleLoadingScreen(loadingStatus) {
		setTimeout(() => {
			setLoading(!loadingStatus)
		}, 1500)
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
			handleLoadingScreen(loading)
		}
	}, [router, address, startblock, endblock, page])

	if (address.length == 42) {
		return (
			<LoadingScreen loading={loading}>
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
			</LoadingScreen>
		)
	} else {
		return <AddressNotValid />
	}
}
