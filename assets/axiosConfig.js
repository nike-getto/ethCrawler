const axios = require('axios').default

const etherscanApiInstance = axios.create({
	baseURL: 'https://api.etherscan.io',
})

export default etherscanApiInstance
