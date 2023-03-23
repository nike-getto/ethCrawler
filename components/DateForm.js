import { useState } from 'react'

export default function GetByDate() {
	const [date, setDate] = useState()
	const [address, setAddress] = useState()

	return (
		<div className='h-screen flex flex-col items-center justify-center text-3xl bold'>
			<form className='grid gap-6 mb-6 md:grid-cols-2'>
				<div>
					<label
						htmlFor='address'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Wallet Address
					</label>
					<input
						className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:italic placeholder:text-slate-400'
						id='address'
						type='text'
						value={address}
						placeholder='Enter your wallet address'
						onChange={(e) => setAddress(e.target.value)}
						required
						spellCheck='false'
					/>
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
						value={date}
						placeholder='Enter date'
						required
					/>
					<br />
					<button
						className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
						type='submit'
					>
						<Link href='/'>Back to HomePage</Link>
					</button>
				</div>
			</form>
		</div>
	)
}
