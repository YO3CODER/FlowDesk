"use client"
import { deleteTaskById, getProjectInfo } from '@/app/actions';
import EmptyState from '@/app/components/EmptyState';
import ProjectComponent from '@/app/components/ProjectComponent';
import TaskComponent from '@/app/components/TaskComponent';
import UserInfo from '@/app/components/UserInfo';
import Wrapper from '@/app/components/Wrapper'
import { Project } from '@/type';
import { useUser } from '@clerk/nextjs'
import { CircleCheckBig, CopyPlus, ListTodo, Loader, SlidersHorizontal, UserCheck } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress

    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState<Project | null>(null)
    const [statusFilter, setStatusFilter] = useState<string>("")
    const [assignedFilter, setAssignedFilter] = useState<boolean>(false)
    const [taskCounts, setTaskCounts] = useState({ todo: 0, inProgress: 0, done: 0, assigned: 0 })
    const [loading, setLoading] = useState(true)

    const fetchInfos = async (projectId: string) => {
        try {
            setLoading(true)
            const project = await getProjectInfo(projectId, true)
            setProject(project)
        } catch {
            console.log("Erreur lors du chargement du projet.")
        } finally {
            setLoading(false)
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

    useEffect(() => {
        if (project && project.tasks && email) {
            const counts = {
                todo: project.tasks.filter(task => task.status === "To Do").length,
                inProgress: project.tasks.filter(task => task.status === "In Progress").length,
                done: project.tasks.filter(task => task.status === "Done").length,
                assigned: project.tasks.filter(task => task?.user?.email === email).length,
            }
            setTaskCounts(counts)
        }
    }, [project, email])

    // ✅ Animation de bordure sur la carte "Créé par"
    useEffect(() => {
        if (!project) return

        const createdColors = ['#0F6E56', '#1D9E75', '#5DCAA5', '#9FE1CB', '#085041']
        let idx = 0

        const rotate = () => {
            const card = document.getElementById('card-created-project')
            if (card) card.style.borderColor = createdColors[idx % createdColors.length]
            idx++
        }

        rotate()
        const interval = setInterval(rotate, 5000)
        return () => clearInterval(interval)
    }, [project])

    const filteredTasks = project?.tasks?.filter(task => {
        const statusMatch = !statusFilter || task.status === statusFilter
        const assignedMatch = !assignedFilter || task?.user?.email === email
        return statusMatch && assignedMatch
    })

    const deleteTask = async (taskId: string) => {
        try {
            await deleteTaskById(taskId)
            fetchInfos(projectId)
            toast.success("Tâche supprimée avec succès.")
        } catch (error) {
            toast.error("Erreur lors de la suppression de la tâche.")
        }
    }

    if (loading) {
        return (
            <Wrapper>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <span className="loading loading-spinner loading-lg text-primary" />
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className='md:flex md:flex-row flex-col'>
                <div className='md:w-2/4'>

                    {/* ✅ Carte "Créé par" avec étiquette badge et bordure animée */}
                    <div
                        id="card-created-project"
                        className='p-5 border-2 border-transparent rounded-xl mb-6 relative'
                        style={{ transition: 'border-color 0.8s ease' }}
                    >
                        <span
                            className="absolute -top-3 left-3 font-medium px-3 py-0.5 rounded-full"
                            style={{
                                backgroundColor: '#E1F5EE',
                                color: '#085041',
                                fontSize: '11px',
                            }}
                        >
                            Créé par
                        </span>
                        <UserInfo
                            role=""
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>

                    <div className='w-full'>
                        {project && (
                            <ProjectComponent project={project} style={false} admin={0} />
                        )}
                    </div>

                </div>

                <div className='mt-6 md:ml-6 md:mt-0 md:w-3/4'>
                    <div className='md:flex md:justify-between'>
                        <div className='flex flex-col'>
                            <div className='space-x-2 mt-2'>

                                <button
                                    onClick={() => { setStatusFilter(""); setAssignedFilter(false) }}
                                    className={`btn btn-sm ${!statusFilter && !assignedFilter ? 'btn-primary' : ""}`}
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Tous ({project?.tasks?.length || 0})
                                </button>

                                <button
                                    onClick={() => { setStatusFilter("To Do"); setAssignedFilter(false) }}
                                    className={`btn btn-sm ${statusFilter === "To Do" ? 'btn-primary' : ""}`}
                                >
                                    <ListTodo className="w-4 h-4" />
                                    À faire ({taskCounts.todo})
                                </button>

                                <button
                                    onClick={() => { setStatusFilter("In Progress"); setAssignedFilter(false) }}
                                    className={`btn btn-sm ${statusFilter === "In Progress" ? 'btn-primary' : ""}`}
                                >
                                    <Loader className="w-4 h-4" />
                                    En cours ({taskCounts.inProgress})
                                </button>

                            </div>
                            <div className='space-x-2 mt-2'>

                                <button
                                    onClick={() => { setStatusFilter("Done"); setAssignedFilter(false) }}
                                    className={`btn btn-sm ${statusFilter === "Done" ? 'btn-primary' : ""}`}
                                >
                                    <CircleCheckBig className="w-4 h-4" />
                                    Finis ({taskCounts.done})
                                </button>

                                <button
                                    onClick={() => { setAssignedFilter(!assignedFilter) }}
                                    className={`btn btn-sm ${assignedFilter ? 'btn-primary' : ""}`}
                                >
                                    <UserCheck className="w-4 h-4" />
                                    Vos tâches ({taskCounts.assigned})
                                </button>

                            </div>
                        </div>

                        <Link href={`/new-tasks/${projectId}`} className='btn btn-sm mt-2 md:mt-0'>
                            Nouvelle tâche
                            <CopyPlus className='w-4 h-4' />
                        </Link>
                    </div>

                    <div className='mt-6 border border-base-300 p-5 shadow-sm rounded-xl'>

                        {filteredTasks && filteredTasks.length > 0 ? (
                            <div className='overflow-auto'>
                                <table className='table table-lg w-full'>
                                    <thead>
                                        <tr className='text-xs uppercase tracking-widest text-base-content/40 border-b border-base-200'>
                                            <th className='w-8'></th>
                                            <th className='font-medium'>Titre</th>
                                            <th className='font-medium'>Assigné à</th>
                                            <th className='hidden md:table-cell font-medium'>
                                                <span className='flex items-center gap-1.5'>
                                                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                                        <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
                                                        <path d="M1 5.5h12" stroke="currentColor" strokeWidth="1.2" />
                                                        <path d="M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                                    </svg>
                                                    À livrer
                                                </span>
                                            </th>
                                            <th className='font-medium'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTasks.map((task, index) => (
                                            <tr
                                                key={task.id}
                                                className='border-b border-base-200/60 last:border-none hover:bg-base-200/40 transition-colors duration-150'
                                            >
                                                <TaskComponent task={task} index={index} email={email} onDelete={deleteTask} />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyState
                                imageSrc="/empty-task.png"
                                imageAlt="Picture of an empty project"
                                message="0 tache à afficher"
                            />
                        )}

                    </div>

                </div>
            </div>
        </Wrapper>
    )
}

export default page