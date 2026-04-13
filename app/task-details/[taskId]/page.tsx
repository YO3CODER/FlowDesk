"use client"

import { getProjectInfo, getTaskDetails, updateTaskStatus } from '@/app/actions'
import EmptyState from '@/app/components/EmptyState'
import UserInfo from '@/app/components/UserInfo'
import Wrapper from '@/app/components/Wrapper'
import { Project, Task } from '@/type'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const page = ({ params }: { params: Promise<{ taskId: string }> }) => {

  const {user} = useUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const [task, setTask] = useState<Task | null>(null)
  const [taskId, setTaskId] = useState<string>("")
  const [projectId, setProjectId] = useState("")
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState("")
   const [RealStatus , setRealStatus] = useState("")
  const [solution, setSolution] = useState("")

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

  const fetchInfos = async (taskId: string) => {
    try {
      const task = await getTaskDetails(taskId)
      setTask(task)
      setStatus(task.status)
      setRealStatus(task.status)
      fetchProject(task.projectId)
    } catch (error) {
      toast.error("Erreur lors du chargement des détails de la tache.")
    } finally {
      setLoading(false)
    }
  }

  const fetchProject = async (projectId: string) => {
    try {
      const project = await getProjectInfo(projectId, false)
      setProject(project)
    } catch (error) {
      toast.error("Erreur lors du chargement du projet.")
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params
      setTaskId(resolvedParams.taskId)
      fetchInfos(resolvedParams.taskId)
    }
    getId()
  }, [params])

  // Animation des bordures : change toutes les 5 secondes
  useEffect(() => {
    if (!task) return

    const assignedColors = ['#534AB7', '#7F77DD', '#3C3489', '#AFA9EC', '#CEB4F6']
    const createdColors = ['#0F6E56', '#1D9E75', '#5DCAA5', '#9FE1CB', '#085041']
    let idx = 0

    const rotate = () => {
      const cardA = document.getElementById('card-assigned')
      const cardC = document.getElementById('card-created')
      if (cardA) cardA.style.borderColor = assignedColors[idx % assignedColors.length]
      if (cardC) cardC.style.borderColor = createdColors[idx % createdColors.length]
      idx++
    }

    rotate()
    const interval = setInterval(rotate, 5000)
    return () => clearInterval(interval)
  }, [task])

  const changeStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus)
      fetchInfos(taskId)
    } catch (error) {
      toast.error("Erreur lors du changement de status.")
    }
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value
    setStatus(newStatus)

    const modal = document.getElementById('my_modal_3') as HTMLDialogElement

    if (newStatus === "To Do" || newStatus === "In Progress") {
      changeStatus(taskId, newStatus)
      toast.success("Status changé")
      modal.close()
    }

    if (newStatus === "Done") {
      modal.showModal()
    }
  }

  // ✅ Fix 1 : vérification solution avant toast succès + modal fermée après succès seulement
  const closeTask = async (newStatus: string) => {
    if (solution === "") {
      toast.error("Il manque la solution.")
      return
    }

    try {
      await updateTaskStatus(taskId, newStatus, solution)
      fetchInfos(taskId)
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement
      if (modal) modal.close()
      toast.success("Tâche clôturée avec succès.")
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la solution.")
    }
  }

  

  useEffect(()=>{
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement
    const handleClose = ()=>{
      if(status === "Done" && status !== RealStatus){
        setStatus(RealStatus)
      }
    }

    if(modal){
    modal.addEventListener('close' , handleClose)
  }

  return () => {
     if(modal){
    modal.removeEventListener('close' , handleClose)
     }
  }

  } , [status , RealStatus])

  return (
    <Wrapper>
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : task ? (
        <div>
          <div className='flex flex-col md:justify-between md:flex-row'>
            <div className='breadcrumbs text-sm'>
              <ul>
                <li className='gap-3'>
                  <Link href={`/project/${task.projectId}`} className="no-underline hover:no-underline">
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
                  <span className="ml-2 text-xs font-medium px-2.5 py-1 rounded-full border border-primary/30 text-primary tracking-wide">
                    {project?.name}
                  </span>
                </li>
              </ul>
            </div>

            {/* Carte "Assigné à" avec étiquette badge et bordure animée */}
            <div
              id="card-assigned"
              className='p-5 border-2 border-transparent rounded-xl w-full md:w-fit my-4 relative'
              style={{ transition: 'border-color 0.8s ease' }}
            >
              <span
                className="absolute -top-3 left-3 font-medium px-3 py-0.5 rounded-full"
                style={{
                  backgroundColor: '#EEEDFE',
                  color: '#3C3489',
                  fontSize: '11px',
                }}
              >
                Assigné à
              </span>
              <UserInfo
                role={''}
                email={task.user?.email || null}
                name={task.user?.name || null}
              />
            </div>
          </div>

          <h1 className='text-2xl font-medium tracking-tight text-base-content mb-4 border-l-4 border-primary pl-3'>
            {task.name}
          </h1>

          <div className='flex justify-between items-center mb-4'>
            <span className="flex items-center gap-2 text-sm text-base-content/60">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 5.5h12" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>À livrer le</span>
              <span className="font-medium text-base-content px-2 py-0.5 rounded-md bg-base-200 text-xs tracking-wide">
                {task.dueDate?.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </span>

            <div>
              <select
                value={status}
                onChange={handleStatusChange}
                className='bg-gray-800 select select-sm select-bordered select-primary focus:outline-none ml-3'
                disabled={status == "Done" || task.user?.email !== email}
              >
                <option value="To Do">À faire</option>
                <option value="In Progress">En cours</option>
                <option value="Done">Terminée</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex md:justify-between md:items-center flex-col md:flex-row">

              {/* Carte "Créé par" avec étiquette badge et bordure animée */}
              <div
                id="card-created"
                className='p-5 border-2 border-transparent rounded-xl w-full md:w-fit my-4 relative'
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
                  role={''}
                  email={task.createdBy?.email || null}
                  name={task.createdBy?.name || null}
                />
              </div>

              <div className='badge badge-primary mt-4 md:mt-0'>
                {task.dueDate && `
                 ${Math.max(0, Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} jours restant 
              `}
              </div>

            </div>
          </div>

          <div className='ql-snow w-full'>
            <div
              className='ql-editor p-5 border-base-300 border bordered-xl'
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          </div>

          {task?.solutionDescription && (
            <div>
              <div className='badge badge-primary my-4'>
                Solution
              </div>
              <div className='ql-snow w-full'>
                <div
                  className='ql-editor p-5 border-base-300 border bordered-xl'
                  dangerouslySetInnerHTML={{ __html: task.solutionDescription }}
                />
              </div>
            </div>
          )}

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">C'est quoi la solution ?</h3>
              <p className="py-4">Décrivez ce que vous avez fais exactement</p>

              <ReactQuill
                theme="snow"
                value={solution}
                placeholder="Description de la solution..."
                modules={modules}
                onChange={setSolution}
              />

              {/* ✅ Fix 2 : arrow function pour éviter l'appel immédiat au rendu */}
              <button
                className='btn mt-4 btn-accent'
                onClick={() => closeTask(status)}
              >
                Terminée
              </button>
            </div>
          </dialog>

        </div>
      ) : (
        <EmptyState
          imageSrc="/empty-task.png"
          imageAlt="Picture of an empty project"
          message="Cette tâche n'existe pas !"
        />
      )}
    </Wrapper>
  )
}

export default page