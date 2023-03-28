import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
		<>
			<h1>{address}</h1>
			<br />
			<h1>{timestamp}</h1>
			<br />
		</>
	)
}
