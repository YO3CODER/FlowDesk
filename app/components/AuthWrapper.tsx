type WrapperProps = {
    children: React.ReactNode
}

import { FolderGit2 } from 'lucide-react'
import React from 'react'

const AuthWrapper = ({ children }: WrapperProps) => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center flex-col px-4 py-8'>
            <div className='flex items-center mb-2 gap-2'>
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.75" />
                            </svg>
                        </div>
                        <span className="text-[22px] font-medium tracking-tight text-base-content">
                            Flow<span className="text-primary">Desk</span>
                        </span>
                    </div>
            <div className='w-full max-w-sm sm:max-w-md'>
                {children}
            </div>
        </div>
    )
}

export default AuthWrapper