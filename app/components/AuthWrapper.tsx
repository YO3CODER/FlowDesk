type WrapperProps = {
    children: React.ReactNode
}

import { FolderGit2 } from 'lucide-react'
import React from 'react'

const AuthWrapper = ({ children }: WrapperProps) => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center flex-col px-4 py-8'>
            <div className='flex items-center mb-2'>
                <div className='bg-primary-content text-primary rounded-full p-2'>
                    <FolderGit2  className="w-6 h-6" />
                </div>
                <span className='ml-3 font-bold text-3xl'> 
                   Task <span className='text-primary'>Flow</span> 
                </span>
            </div>
            <div className='w-full max-w-sm sm:max-w-md'>
                {children}
            </div>
        </div>
    )
}

export default AuthWrapper