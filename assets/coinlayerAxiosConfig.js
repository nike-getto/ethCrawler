const axios = require('axios').default

const coinlayerApiInstance = axios.create({
	baseURL: 'http://api.coinlayer.com/api/',
})

export default coinlayerApiInstance
