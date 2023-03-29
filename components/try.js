var Web3 = require('web3')
var provider =
	'https://damp-restless-asphalt.discover.quiknode.pro/9d9a25c5696fa3e1cf9c60651d181530270e87c8/'
var web3Provider = new Web3.providers.HttpProvider(provider)
var web3 = new Web3(web3Provider)

const address = '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326'

// let blockNum = 16932037
// const historicTimestamp = 1647628800000

// async function getBlock(blockNum) {
// 	await web3.eth.getBlock(blockNum).then((b) => {
// 		console.log(b.timestamp * 1e3)
// 		while (true) {
// 			console.log(b.timestamp)
// 			if (b.timestamp < historicTimestamp) break
// 			console.log(blockNum)
// 			--blockNum
// 		}
// 	})
// }

// web3.eth.getBalance(address, blockNum).then((balance) => {
// 	console.log(
// 		`balance for ${address} at block ${blockNum} is ${balance / 1e18}`
// 	)
// })
// while (true) {
// 	const block = web3.eth.getBlock(blockNum)
// 	console.log(block)
// 	if (block.timestamp * 1e3 > historicTimestamp) break
// 	console.log(blockNum)
// 	--blockNum
// }

//The blockNumber here is your required block number
// web3.eth
// 	.getBalance(address, blockNum)
// 	.then((balance) =>
// 		console.log(`Balance at block number is ${balance / 1e18}`)
// 	)

async function getBlock(blockNum) {
	let block = web3.eth.getBlock(blockNum).then((b) => (block = b))
	return block
}

async function getBlockNum() {
	let blockNum = 16932037
	const historicDate = '2023/03/29'
	const historicTimestamp = new Date(historicDate).getTime()
	while (true) {
		const block = await getBlock(blockNum)
		console.log(block.timestamp)
		console.log(`Historic: ${historicTimestamp}`)
		if (block.timestamp * 1e3 < historicTimestamp) break
		--blockNum
		console.log(blockNum)
	}
	return blockNum
}

// const blockNum = getBlockNum()

web3.eth
	.getBalance(address, 16931983)
	.then((balance) =>
		console.log(`Balance at block number is ${balance / 1e18}`)
	)
