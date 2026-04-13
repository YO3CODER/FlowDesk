'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { FolderGit2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { checkAndAddUser } from '../actions'

const Navbar = () => {
    const { user } = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()
    const navLinks = [
        { href: "/general-projects", label: "Collaboration" }, // ✅ Typo corrigée
        { href: "/", label: "Mes projets" }
    ]

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
            checkAndAddUser(user?.primaryEmailAddress?.emailAddress, user?.fullName)
        }
    }, [user])




    const isActiveLink = (href: string) =>
        pathname.replace(/\/$/, "") === href.replace(/\/$/, "");


    const renderLinks = (classNames: string) =>
        navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={`btn-sm ${classNames} ${isActiveLink(href) ? "btn-primary" : ""}`}>
                {label}
            </Link>
        ))

    return (
        <div className='border-b border-base-300 px-5 md:px-[10%] py-4 relative'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className="flex items-center gap-2.5 ml-3">
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
                </div>


                <button className='btn w-fit btn-sm sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className='w-4' />
                </button>

                <div className='hidden sm:flex space-x-4 items-center'>
                    {renderLinks('btn')}
                    <UserButton />
                </div>
            </div>

            <div className={`absolute top-0 w-full h-screen flex flex-col gap-4 p-4 transition-all duration-300 sm:hidden bg-white z-50
                ${menuOpen ? "left-0" : "-left-full"}`}>
                <div className='flex justify-between'>
                    <UserButton />
                    <button className='btn w-fit btn-sm' onClick={() => setMenuOpen(!menuOpen)}>
                        <X className='w-4' />
                    </button>
                </div>
                {renderLinks("btn")}
            </div>
        </div>
    )
}

export default Navbar