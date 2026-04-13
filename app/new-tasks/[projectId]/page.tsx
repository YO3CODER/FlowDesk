"use client"
import { createTask, getProjectInfo, getProjectUsers } from '@/app/actions'
import AssignTask from '@/app/components/AssignTask'
import Wrapper from '@/app/components/Wrapper'
import { Project, User } from '@/type'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-40 w-full border border-base-300 rounded-xl animate-pulse bg-base-200" />
})

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ]
    };

    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress as string
    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState<Project | null>(null)
    const [usersProject, setUsersProject] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const rooter = useRouter()

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true)
            setProject(project)
            const associatedUsers = await getProjectUsers(projectId)
            setUsersProject(associatedUsers)
        } catch {
            console.log("Erreur lors du chargement du projet .")
        }
    }

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params
            setProjectId(resolvedParams.projectId)
            fetchInfos(resolvedParams.projectId)
        }
        getId()
    }, [params])

    const handleUserSelect = (user: User) => {
        setSelectedUser(user)
    }

    const handleSubmit = async () => {
        if (!name || !selectedUser || !description || !dueDate) {
            toast.error("Veuillez remplir tout les champs obligatoire")
            return
        }


        try {
           await createTask(name , description , dueDate , projectId , email , selectedUser.email)
           rooter.push(`/project/${projectId}`)
        }catch (error){
        toast("Une erreur est survenue lors de la création de la tache " + error)
        }

    }

    return (
        <Wrapper>
            <div className="flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={`/project/${projectId}`} className="no-underline hover:no-underline">
                        <button type="button" className="btn btn-soft btn-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current transition-transform duration-200">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m7 7H3" />
                            </svg>
                            Retour
                        </button>
                    </Link>

                    <div className="badge badge-primary badge-lg font-semibold">
                        {project?.name}
                    </div>
                </div>

                {/* Contenu */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Colonne gauche */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <AssignTask
                            users={usersProject}
                            projectId={projectId}
                            onAssignTask={handleUserSelect}
                        />

                        <div className="flex justify-between items-center">
                            <span className="badge badge-lg">À livrer</span>
                            <input
                                type="date"
                                className="input input-bordered border border-base-300 focus:outline-none"
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nom de la tâche"
                            className="w-full input input-bordered border border-base-300 font-bold"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <ReactQuill
                            theme="snow"
                            value={description}
                            placeholder="Description de la tâche..."
                            modules={modules}
                            onChange={setDescription}
                        />
                    </div>
                </div>
                <div className='flex justify-end md:mt-9'>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-md btn-primary mt-4 "
                    >
                        Créer la tâche
                    </button>

                </div>


            </div>
        </Wrapper>
    )
}

export default page