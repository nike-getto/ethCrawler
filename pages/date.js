import { useState, useEffect } from 'react'
import { useRouter } from 'next/router.js'

import DateForm from '../components/DateForm.js'

export default function GetByDate() {
	const [address, setAddress] = useState('')
	const router = useRouter()

	useEffect(() => {
		if (
			router.query.address.length == 42 &&
			typeof router.query.address == 'string'
		) {
			setAddress(router.query.address)
			console.log(address)
		}
	}, [router, address])

	return (
		<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
			<DateForm address={address} />
		</div>
	)
}
