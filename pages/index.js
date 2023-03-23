import { useEffect, useState } from 'react'

import etherscanApiInstance from '../assets/axiosConfig.js'
import Form from '../components/Form.js'

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
		setResult('Loading...')
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
			<h1>ETH Genesis Block Balance: {result} ETH</h1>
			<br />
			<h1>
				Number of the most recent block mined:{' '}
				{parseInt(mostRecentBlockNumber, 16)}
			</h1>
		</div>
	)
}
