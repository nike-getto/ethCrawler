import { useEffect, useState } from 'react'
import Link from 'next/link'

import EthDater from 'ethereum-block-by-date'

var Web3 = require('web3')
var provider =
	'https://damp-restless-asphalt.discover.quiknode.pro/9d9a25c5696fa3e1cf9c60651d181530270e87c8/'
var web3Provider = new Web3.providers.HttpProvider(provider)
var web3 = new Web3(web3Provider)

export default function GetBalanceByDate({ dateConfig, address }) {
	const [isLoading, setIsLoading] = useState(true)
	const [balance, setBalance] = useState([])
	const [addr, setAddr] = useState()

	const dater = new EthDater(web3)

	useEffect(() => {
		setAddr(address)
		console.log(addr)
		console.log(dateConfig)
		getBlockByDate(dateConfig)
	}, [dateConfig, addr, balance])

	async function getBlockByDate(dateConfig) {
		if (
			typeof dateConfig != 'undefined' &&
			dateConfig != 'NaN' &&
			typeof addr != 'undefined' &&
			addr != 'undefined'
		) {
			let block = await dater.getDate(`${dateConfig}T00:00:00Z`)
			console.log(`${dateConfig}T00:00:00Z`)
			console.log(block.block)
			web3.eth.getBalance(addr, block.block).then((b) => {
				setBalance(b / 1e18)
				setIsLoading(false)
			})
		}
	}

	function mapBalance(bal) {
		return <>{bal} ETH</>
	}

	return (
		<div className='content-center'>
			<h1>Address: {address}</h1>
			<br />
			Balance on {dateConfig}:{' '}
			{isLoading ? 'Loading...' : mapBalance(balance)}
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
