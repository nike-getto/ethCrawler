import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GetBalanceByDate from '@/components/GetBalanceByDate'

export default function DateBalance() {
	const [address, setAddress] = useState()
	const [timestamp, setTimestamp] = useState()

	const router = useRouter()

	useEffect(() => {
		if (
			typeof router.query.address == 'string' &&
			router.query.address.length === 42
		) {
			setAddress(router.query.address)
			setTimestamp(router.query.date)
		}
	}, [router, address, timestamp])

	return (
		<div className='text-3xl h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
			<GetBalanceByDate dateConfig={timestamp} address={address} />
		</div>
	)
}
