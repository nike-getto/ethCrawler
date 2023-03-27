// const { Alchemy, Utils } = require('alchemy-sdk')
// const EthDater = require('ethereum-block-by-date')

// const apiKey = process.env.alchemyApiKey
// const settings = {
// 	apiKey: apiKey,
// }

// const alchemy = new Alchemy(settings)

// const dater = new EthDater(
// 	alchemy.core // Ethers provider, required.
// )

// const main = async () => {
// 	// Set wallet address
// 	const address = '0x1f9090aae28b8a3dceadf281b0f12828e676c326'

// 	// Set timestamp
// 	const timestamp = '2022-03-27T17:05:40Z'

// 	// Get blocknumber
// 	let block = await dater.getDate(timestamp)
// 	block = block['block']

// 	// Get balance and format in terms of ETH
// 	let balance = await alchemy.core.getBalance(address, block)
// 	balance = Utils.formatEther(balance)
// 	console.log(`Balance of ${address}: ${balance} ETH`)
// }

// // const runMain = async () => {
// // 	try {
// // 		await main()
// // 		process.exit(0)
// // 	} catch (error) {
// // 		console.log(error)
// // 		process.exit(1)
// // 	}
// // }

// // runMain()
