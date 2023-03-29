import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image.js'

import etherscanApiInstance from '../assets/etherscanAxiosConfig.js'
import ethLogo from '../assets/ethLogo.png'
import CryptoCurrency from '@/components/CryptoCurrency.js'

export default function Home() {
	const [result, setResult] = useState()
	const [mostRecentBlockNumber, setMostRecentBlockNumber] = useState()

	async function getAddressBalance() {
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'account',
					action: 'balance',
					address: '0x0000000000000000000000000000000000000000',
					tag: 'latest',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	async function getMostRecentBlock() {
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'proxy',
					action: 'eth_blockNumber',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setMostRecentBlockNumber()
		getAddressBalance()
			.then((r) => setResult(r))
			.catch((e) => console.log(e))
		getMostRecentBlock()
			.then((num) => setMostRecentBlockNumber(num))
			.catch((e) => console.log(e))
	}, [])

	return (
		<div className='h-screen flex flex-col items-center justify-center text-3xl bold'>
			<div>
				<Image
					className='motion-safe:animate-bounce'
					src={ethLogo}
					alt='Ethereum Logo'
					width={350}
					height={400}
					priority
				/>
			</div>
			<h1>
				ETH Genesis Block Balance:{' '}
				{(result / 1e18).toFixed(8) || 'Loading...'} ETH
			</h1>
			<h1>
				Number of last safe block:{' '}
				{parseInt(mostRecentBlockNumber, 16) || 'Loading...'}
			</h1>
			<br />
			<div className='flex-row'>
				<CryptoCurrency />
			</div>
			<div className='flex-row'>
				<button
					type='button'
					className='mt-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
				>
					<Link href='/wallet'>Enter Wallet Address</Link>
				</button>
			</div>
		</div>
	)
}
