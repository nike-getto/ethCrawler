import Form from '../components/Form.js'

export default function Wallet() {
	async function searchBlockchain(address) {
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'account',
					action: 'txlist',
					address,
					startblock: 90000,
					endblock: latest,
					page: '1',
					offset: '30',
					sort: 'asc',
					apikey: process.env.etherscanApiKey,
				},
			})
			return response.data.result
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='h-screen flex flex-col items-center justify-center text-xl bold'>
			<Form searchBlockchain={searchBlockchain}></Form>
		</div>
	)
}
