import Link from 'next/link'

export default function AddressNotValid() {
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
