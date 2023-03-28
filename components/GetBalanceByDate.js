const { Alchemy, Utils } = require('alchemy-sdk')
const EthDater = require('ethereum-block-by-date')
const { useState, useEffect } = require('react')

const apiKey = process.env.alchemyApiKey
const settings = {
	apiKey: apiKey,
}

const alchemy = new Alchemy(settings)

const dater = new EthDater(
	alchemy.core // Ethers provider, required.
)

export default async function GetBalanceByDate({ address, date }) {
	const [addr, setAddr] = useState()
	const [ts, setTs] = useState()
	const [data, setData] = useState()

	const main = async (wallet, time) => {
		// Set wallet address
		const address = wallet

		// Set timestamp
		const timestamp = time + 'T:00:00Z'

		// Get blocknumber
		let block = await dater.getDate(timestamp)
		block = block['block']

		// Get balance and format in terms of ETH
		let balance = await alchemy.core.getBalance(address, block)
		balance = Utils.formatEther(balance)
		console.log(`Balance of ${address}: ${balance} ETH`)
		return balance
	}

	useEffect(() => {
		setAddr(address)
		setTs(date)
		setData(() => main(addr, ts))
	}, [addr, date])

	return <div>{data}</div>
}
