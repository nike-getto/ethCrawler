import { useEffect, useState } from 'react'
import Link from 'next/link'

import etherscanApiInstance from '@/assets/etherscanAxiosConfig'

var Web3 = require('web3')
var provider =
	'https://damp-restless-asphalt.discover.quiknode.pro/9d9a25c5696fa3e1cf9c60651d181530270e87c8/'
var web3Provider = new Web3.providers.HttpProvider(provider)
var web3 = new Web3(web3Provider)

export default function GetBalanceByDate({ dateConfig, address }) {
	const [latestBlockNumber, setLatestBlockNumber] = useState('')
	const [latestBlockTimestamp, setLatestBlockTimestamp] = useState('')
	const [dateTimestamp, setDatetimestamp] = useState('')
	const [balance, setBalance] = useState()
	const [addr, setAddr] = useState()

	useEffect(() => {
		const blockNumberData = getLatestBlockNumber()
		blockNumberData.then((num) => {
			if (typeof num != 'undefined') {
				setLatestBlockNumber(parseInt(num, 16))
			}
		})
		if (
			typeof latestBlockNumber != 'undefined' &&
			latestBlockNumber != 'NaN'
		) {
			getTimestamp(latestBlockNumber)
		}
		setDatetimestamp(new Date(dateConfig).getTime())
		console.log(dateTimestamp)
		setAddr(address)
	}, [latestBlockNumber, latestBlockTimestamp, addr])

	// useEffect(() => {
	// 	getBalance(addr, dateTimestamp, latestBlockNumber)
	// }, [])

	async function getLatestBlockNumber() {
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'proxy',
					action: 'eth_blockNumber',
					apikey: process.env.etherscanApiKey,
				},
			})
			return await response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	async function getTimestamp(latestBlockNumber) {
		if (latestBlockNumber != 'NaN') {
			const time = await web3.eth
				.getBlock(latestBlockNumber)
				.then((result) => {
					if (typeof result != 'undefined') {
						const ts = result.timestamp * 1e3
						setLatestBlockTimestamp(ts)
					}
				})
		}
	}

	async function getBlock(blockNum) {
		let block = web3.eth.getBlock(blockNum).then((b) => (block = b))
		return block
	}

	async function getBalance(address, historicTimestamp, latestBlockNumber) {
		let blockNum = latestBlockNumber

		while (true) {
			await getBlock(blockNum)
			if (block.timestamp * 1e3 < historicTimestamp) break
			--blockNum
		}
		web3.eth
			.getBalance(address, blockNum)
			.then((balance) => setBalance(balance / 1e18))
	}

	return (
		<div className='content-center'>
			<h1>Address: {address}</h1>
			<br />
			Balance on {dateConfig}: {latestBlockNumber}
			<br />
			<br />
			<button
				className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
				type='button'
			>
				<Link href='/'>Back to HomePage</Link>
			</button>
		</div>
	)
}
