import DateForm from '../components/DateForm.js'

export default function getByDate() {
	return (
		<div className='h-screen flex flex-col items-center justify-center relative overflow-x-auto shadow-md sm:rounded-lg'>
			<DateForm />
		</div>
	)
}
