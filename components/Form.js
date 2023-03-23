import { useState } from 'react'
import Image from 'next/image'

import ethLogo from '../assets/ethLogo.png'

export default function Form({ searchBlockchain }) {
	const [address, setAddress] = useState('')
	const [startingBlock, setStartingBlock] = useState()
	const [endingBlock, setEndingBlock] = useState()

	const handleAddress = (e) => {
		e.preventDefault()

		if (address.length == 42) {
			searchBlockchain(address)
			setAddress('')
		} else {
			console.log('Enter a proper address')
		}
	}

	return (
		<form
			className='grid gap-6 mb-6 md:grid-cols-2 gap-x-72'
			onSubmit={(e) => handleAddress(e)}
		>
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
				<div className='mb-6'>
					<label
						htmlFor='startingBlock'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Starting Block Number
					</label>
					<input
						className='block w-48 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:italic placeholder:text-slate-400'
						id='startingBlock'
						type='text'
						value={startingBlock}
						placeholder='Enter starting block number'
						required
					/>
					<br />
					<label
						htmlFor='endingBlock'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Ending Block Number
					</label>
					<input
						className='block w-48 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:italic placeholder:text-slate-400'
						id='endingBlock'
						type='text'
						value={endingBlock}
						placeholder='Enter ending block number'
						required
					/>
					<br />
				</div>
				<br />
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='submit'
				>
					Search
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
	)
}
