"use client"
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SquarePlus } from 'lucide-react'
import { toast } from 'react-toastify'
import { addUserToProject, getProjectsAssociatedWithUser } from '../actions'
import { useUser } from '@clerk/nextjs'
import { Project } from '@/type'
import ProjectComponent from '../components/ProjectComponent'
import EmptyState from '../components/EmptyState'

const Page = () => {
    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress ?? ""
    const [inviteCode, setInviteCode] = useState("")
    const [loadingSubmit, setLoadingSubmit] = useState(false)  // 👈 bouton
    const [loadingProjects, setLoadingProjects] = useState(false) // 👈 liste
    const [associatedProjects, setAssociatedProjects] = useState<Project[]>([])

    const fetchProjects = async (email: string) => {
        try {
            setLoadingProjects(true) // 👈
            const associated = await getProjectsAssociatedWithUser(email)
            setAssociatedProjects(associated)
        } catch (error) {
            toast.error("Erreur lors du chargement des projets.")
        } finally {
            setLoadingProjects(false) // 👈
        }
    }

    useEffect(() => {
        if (email) {
            fetchProjects(email)
        }
    }, [email])

    const handleSubmit = async () => {
        try {
            if (inviteCode !== "") {
                setLoadingSubmit(true) // 👈
                await addUserToProject(email, inviteCode)
                toast.success("Vous pouvez maintenant collaborer sur ce projet")
                setInviteCode("")
                fetchProjects(email) // 👈 refresh la liste après rejoindre
            } else {
                toast.error("Entrez le code du projet s'il vous plaît")
            }
        } catch (error) {
            toast.error("Code invalide ou vous appartenez déjà au projet")
        } finally {
            setLoadingSubmit(false) // 👈
        }
    }

    return (
        <Wrapper>
            <div className='flex mb-6'>
                <div className='mb-4'>
                    <input
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        type="text"
                        placeholder="Code d'invitation"
                        className='w-full p-2 input input-bordered'
                        disabled={loadingSubmit} // 👈
                    />
                </div>
                <button
                    className='btn btn-primary ml-4'
                    onClick={handleSubmit}
                    disabled={loadingSubmit} // 👈
                >
                    {loadingSubmit ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <>Rejoindre <SquarePlus className="w-4" /></>
                    )}
                </button>
            </div>

            <div className="w-full">
                {loadingProjects ? ( 
                    <div className="flex justify-center items-center w-full py-20">
                        <span className="loading loading-spinner loading-lg text-primary" />
                    </div>
                ) : associatedProjects.length > 0 ? (
                    <ul className="w-full grid md:grid-cols-3 gap-6">
                        {associatedProjects.map((project) => (
                            <li key={project.id}>
                                <ProjectComponent project={project} style={true} admin={0} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState
                        imageSrc="/empty-project.png"
                        imageAlt="Picture of an empty project"
                        message="Aucun projet associé."
                    />
                )}
            </div>
        </Wrapper>
    )
}

export default Page