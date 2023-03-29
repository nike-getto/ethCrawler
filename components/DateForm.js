import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ethLogo from '../assets/ethLogo.png'

export default function DateForm({ address }) {
	const [date, setDate] = useState()
	const [addr, setAddr] = useState('')

	useEffect(() => {
		const defaultDate = new Date()

		let day = String(defaultDate.getDate()).padStart(2, '0')
		let month = String(defaultDate.getMonth() + 1).padStart(2, '0')
		let year = defaultDate.getFullYear()
		setDate(`${year}-${month}-${day}`)
	}, [])

	useEffect(() => {
		if (typeof address == 'string' && address.length === 42) {
			setAddr(address)
			console.log(`date form: ${addr}`)
		}
	}, [date])

	const handleChange = (e) => {
		setDate(e.target.value)
	}
	if (addr) {
		return (
			<div className='h-screen flex flex-col items-center justify-center text-3xl bold'>
				<form className='grid gap-6 mb-6 md:grid-cols-2 gap-x-72'>
					<div>
						<h1 className='mb-4 text-xl font-extrabold leading-none tracking-tight'>
							Wallet address:
						</h1>
						<div className='text-xl'>{addr}</div>
						<br />
						<label
							htmlFor='date'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Enter date to see available ETH amount on that day
						</label>
						<input
							className='block w-65 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:italic placeholder:text-slate-400'
							id='date'
							type='date'
							min='2015-07-30'
							max={new Date().toISOString().split('T')[0]}
							value={date}
							placeholder='Enter date'
							onChange={handleChange}
						/>
						<br />
						<label
							htmlFor='balance'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						></label>
						<br />
						<button
							className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
							type='submit'
						>
							<Link
								href={{
									pathname: '/date-balance',
									query: {
										address: addr,
										date: date,
									},
								}}
							>
								Get Address Balance by Date
							</Link>
						</button>
						<br />
						<button
							className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
							type='submit'
						>
							<Link href='/'>Back to HomePage</Link>
						</button>
					</div>
					<div>
						<Image
							src={ethLogo}
							alt='Ethereum Logo'
							width={350}
							height={900}
							priority
						/>
					</div>
				</form>
			</div>
		)
	} else {
		return (
			<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
				<h1 className='mb-4 text-3xl font-extrabold leading-none tracking-tight'>
					Please enter a valid address
				</h1>
				<br />
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='submit'
				>
					<Link
						href={{
							pathname: '/wallet',
						}}
					>
						Go to Previous Page
					</Link>
				</button>
			</div>
		)
	}
}
