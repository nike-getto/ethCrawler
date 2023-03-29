import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import etherscanApiInstance from '@/assets/etherscanAxiosConfig'
import InformationTable from '@/components/InformationTable'
import AddressNotValid from '@/components/AddressNotValid'
import BlockNumberNotValid from '@/components/BlockNumberNotValid'

export default function AddressData() {
	const [address, setAddress] = useState('')
	const [startblock, setStartBlock] = useState('')
	const [endblock, setEndBlock] = useState('')
	const [latestBlock, setLatestBlock] = useState('')
	const [result, setResult] = useState({}) // API has some problems :D
	const [page, setPage] = useState(1)
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (
			typeof router.query.address == 'string' &&
			router.query.address.length === 42
		) {
			setAddress(router.query.address)
			setStartBlock(router.query.startblock)
			setEndBlock(router.query.endblock)
			setLatestBlock(router.query.latestBlockNumber)
			setResult(searchBlockchain(address, startblock, endblock))
			if (page < 1) {
				setPage(1)
			}
		}
	}, [router, address, startblock, endblock, page])

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
					offset: '20',
					sort: 'desc',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	function onButtonClicked(event) {
		setButtonDisabled(true)
		setTimeout(() => {
			setButtonDisabled(false)
		}, 1500)
	}

	if (
		address.length == 42 &&
		parseInt(startblock, 16) > parseInt(latestBlock, 16)
	) {
		return <BlockNumberNotValid />
	} else if (address.length == 42) {
		return (
			<>
				<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
					<h1 className='mb-4 text-3xl font-extrabold leading-none tracking-tight'>
						Wallet address: {address}
					</h1>
					<div className='overflow-scroll overflow-x-hidden h-150'>
						<InformationTable result={result} address={address} />
					</div>
					Page: {page}
					<div className='inline-flex'>
						<button
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
							onClick={() => {
								setPage(page - 1)
								onButtonClicked()
							}}
							disabled={buttonDisabled}
						>
							Prev
						</button>
						<button
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
							onClick={() => {
								setPage(page + 1)
								onButtonClicked()
							}}
							disabled={buttonDisabled}
						>
							Next
						</button>
					</div>
				</div>
			</>
		)
	}
	return <AddressNotValid />
}
