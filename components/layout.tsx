import Link from 'next/link'
import { useRouter } from 'next/router'
export default function LandingLayout({
    children
} : {
    children?: React.ReactNode
}){
    
    const {pathname}=useRouter()
    
    console.log({pathname})
    return  <>
    <link rel="shortcut icon" href="/favicon.ico" />
    <div className="xl:w-3/4 mx-auto">
      {/*---HEADER---*/}
        <header className="sticky px-6 h-24 sm:h-32 flex items-center">
            <nav className="w-full flex flex-row-reverse items-center text-black text-lg lg:flex font-bold space-x-reverse space-x-2">
                <Link href={`/donate`}>
                    <a className={`flex flex-row items-center space-x-2 py-2 px-6 rounded-lg hover:bg-gray-100 ${pathname==='/donate'?'bg-gray-200':''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Donate</span>
                    </a>
                </Link>
                <Link href={`/`}>
                <a className={`flex flex-row items-center space-x-2 py-2 px-6 rounded-lg hover:bg-gray-100 ${pathname==='/'?'bg-gray-200':''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                    </svg>
                    <span>Calculator</span>
                </a>
                </Link>

            </nav>
        </header>
        {/*---MAIN---*/}
        <main className="mb-6">
        {children}
        </main>
    </div>
    </>
}