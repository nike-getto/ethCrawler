import { useEffect, useState } from 'react'
import Link from 'next/link'

import etherscanApiInstance from '@/assets/etherscanAxiosConfig'

var Web3 = require('web3')
var provider =
	'https://damp-restless-asphalt.discover.quiknode.pro/9d9a25c5696fa3e1cf9c60651d181530270e87c8/'
var web3Provider = new Web3.providers.HttpProvider(provider)
var web3 = new Web3(web3Provider)
// let blockNum

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

// blockNum = web3.eth.getBlockNumber().then((result) => {
// 	console.log('Latest Ethereum Block is ', result)
// 	return result
// })

// console.log(blockNum)

// const address = '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326'
// const blockNumber = 16348360 - 2000

// web3.eth.getBalance(address, blockNumber).then((balance) => {
// 	console.log(`Balance at block number is ${(balance / 1e18).toFixed(8)}`)
// })

// blockNum = blockNumber
// console.log(blockNum)

// async function getTimestamp() {
// 	const time = await web3.eth.getBlock(blockNum).then((result) => {
// 		console.log(`Historic: ${result.timestamp * 1e3}`)
// 	})

// 	return time
// }

// time = getTimestamp()
// console.log(time)

// const historicTimestamp = new Date('2023-01-06T00:00:00Z').getTime()
// console.log(`historic: ${historicTimestamp}`)
// // while (true) {
// 	const block = web3.eth.getBlock(blockNum).then((result) => {
// 		return result
// 	})
// 	console.log(block)
// 	if (block.timestamp < historicTimestamp) break
// 	--blockNum
// }

// //The blockNumber here is your required block number
// web3.eth
// 	.getBalance(address, blockNumber)
// 	.then((balance) => `Balance at block number is ${balance}`)
