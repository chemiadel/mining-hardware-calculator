import {NextPage} from 'next'


const Donate: NextPage = () => {

    return <div className='flex flex-col '>
        <div className='m-auto flex flex-row items-center space-x-4 py-16'>
            <div>
            BTC: <strong>1C6JYLN28PFJ9kCJbuaDPp2DSFJQ5mj4kK</strong>
            </div>
            <button
            onClick={()=>{
                navigator.clipboard.writeText('1C6JYLN28PFJ9kCJbuaDPp2DSFJQ5mj4kK')
                alert('Wallet ID copied!')
            }}
            className='p-2 border-2 rounded-md hover:bg-gray-100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    </div>
}

export default Donate