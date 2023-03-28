import CryptoConvert from 'crypto-convert'

const convert = new CryptoConvert(/*options?*/)

async function convertCurrency(amount, eth) {
	await convert.ready()

	if (eth) {
		return convert.ETH.USD(amount)
	} else {
		return convert.USD.ETH(amount)
	}
}

export default convertCurrency
