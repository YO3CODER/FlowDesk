import Link from 'next/link'

const LandingNavbar = () => {
    return (
        <div className='border-b border-base-300 px-5 md:px-[10%] py-4'>
            <div className='flex justify-between items-center'>
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                            <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                            <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                            <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.75" />
                        </svg>
                    </div>
                    <span className="text-[22px] font-medium tracking-tight text-base-content">
                        Task<span className="text-primary">Flow</span>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default LandingNavbar