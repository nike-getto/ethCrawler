import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CryptoCurrency() {
	const [usd, setUsd] = useState()

	useEffect(() => {
		convertCurrency()
	}, [])

	async function convertCurrency() {
		try {
			axios
				.get('https://api.coinconvert.net/convert/eth/usd?amount=1')
				.then((response) => {
					setUsd(response.data.USD)
				})
		} catch (error) {
			console.log(error)
		}
	}

	return <div>1 ETH = {usd} $</div>
}
