import Form from '../components/Form.js'
import etherscanApiInstance from '@/assets/etherscanAxiosConfig.js'

export default function Wallet() {
	async function searchBlockchain(address, startblock, endblock) {
		endblock = endblock || 'latest'
		try {
			const response = await etherscanApiInstance.get('/api', {
				params: {
					module: 'account',
					action: 'txlist',
					address,
					startblock,
					endblock,
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
			<Form />
		</div>
	)
}
