import { Project } from '@/type'
import { Copy, ExternalLink, FolderGit2, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { FC, useRef } from 'react'
import { toast } from 'react-toastify'

interface ProjectProps {
    project: Project
    admin: number
    style: boolean
    onDelete?: (id: string) => void;
}

const ProjectComponent: FC<ProjectProps> = ({ project, admin, style, onDelete }) => {

    const modalRef = useRef<HTMLDialogElement>(null)

    const handleDeleteClick = () => {
        modalRef.current?.showModal()
    }

    const handleConfirmDelete = () => {
        modalRef.current?.close()
        if (onDelete) onDelete(project.id)
    }

    const handleCancelDelete = () => {
        modalRef.current?.close()
    }

    const totalTasks = project.tasks?.length;
    const tasksByStatus = project.tasks?.reduce((acc, task) => {
        if (task.status === "To Do") acc.toDo++;
        else if (task.status === "In Progress") acc.inProgress++;
        else if (task.status === "Done") acc.done++;
        return acc;
    }, {
        toDo: 0,
        inProgress: 0,
        done: 0
    }) ?? {
        toDo: 0,
        inProgress: 0,
        done: 0
    };

    const progressPercentage = totalTasks ? Math.round((tasksByStatus.done / totalTasks) * 100) : 0
    const inprogressPercentage = totalTasks ? Math.round((tasksByStatus.inProgress / totalTasks) * 100) : 0
    const toDoPercentage = totalTasks ? Math.round((tasksByStatus.toDo / totalTasks) * 100) : 0
    const textSizeClass = style ? 'text-sm' : 'text-md'

    const handleCopyCode = async () => {
        try {
            if (project.inviteCode) {
                await navigator.clipboard.writeText(project.inviteCode)
                toast.success("Code d'invitation copié.")
            }
        } catch (error) {
            toast.error("Erreur lors de la copie du code d'invitation.")
        }
    }

    return (
        <div className={`${style ? 'border border-base-300 p-5 shadow-sm ' : ""}text-base-content rounded-xl w-full text-left`} key={project.id}>

  {/* En-tête */}
  <div className='w-full flex items-center justify-between mb-4'>
    <div className='flex items-center gap-3'>
      <div className='bg-primary/10 h-10 w-10 rounded-xl flex justify-center items-center flex-shrink-0'>
        <FolderGit2 className='w-5 text-primary' />
      </div>
      <span className='font-medium text-base-content tracking-tight text-base'>
        {project.name}
      </span>
    </div>
    <span className='text-xs text-base-content/40 font-medium px-2 py-0.5 rounded-full border border-base-200'>
      {totalTasks ?? 0} tâche{(totalTasks ?? 0) > 1 ? 's' : ''}
    </span>
  </div>

  {/* Description */}
  {style == false && (
    <p className='text-sm text-base-content/50 border border-base-200 rounded-xl px-4 py-3 mb-5 leading-relaxed'>
      {project.description}
    </p>
  )}

  {/* Collaborateurs */}
  <div className='flex items-center gap-2 mb-4'>
    <span className='text-xs text-base-content/50'>Collaborateurs</span>
    <span className='text-xs font-medium bg-base-200 text-base-content/70 px-2 py-0.5 rounded-full'>
      {project.users?.length ?? 0}
    </span>
  </div>

  {/* Code d'invitation */}
  {admin === 1 && (
    <div className='flex justify-between items-center rounded-lg px-3 py-2 border border-base-200 mb-4 bg-base-200/30'>
      <span className='text-primary font-medium text-sm tracking-widest'>{project.inviteCode}</span>
      <button className='btn btn-xs btn-ghost' onClick={handleCopyCode}>
        <Copy className='w-3.5' />
      </button>
    </div>
  )}

  {/* Barres de progression */}
  <div className='flex flex-col gap-3 mb-5'>

    <div>
      <div className='flex justify-between items-center mb-1.5'>
        <span className={`text-xs text-base-content/50 ${textSizeClass}`}>
          À faire
          <span className='ml-1.5 font-medium text-base-content/70'>{tasksByStatus.toDo}</span>
        </span>
        <span className='text-xs text-base-content/40'>{toDoPercentage}%</span>
      </div>
      <progress className="progress progress-primary w-full h-1.5" value={toDoPercentage} max="100"></progress>
    </div>

    <div>
      <div className='flex justify-between items-center mb-1.5'>
        <span className={`text-xs text-base-content/50 ${textSizeClass}`}>
          En cours
          <span className='ml-1.5 font-medium text-base-content/70'>{tasksByStatus.inProgress}</span>
        </span>
        <span className='text-xs text-base-content/40'>{inprogressPercentage}%</span>
      </div>
      <progress className="progress progress-primary w-full h-1.5" value={inprogressPercentage} max="100"></progress>
    </div>

    <div>
      <div className='flex justify-between items-center mb-1.5'>
        <span className={`text-xs text-base-content/50 ${textSizeClass}`}>
          Terminés
          <span className='ml-1.5 font-medium text-base-content/70'>{tasksByStatus.done}</span>
        </span>
        <span className='text-xs text-base-content/40'>{progressPercentage}%</span>
      </div>
      <progress className="progress progress-primary w-full h-1.5" value={progressPercentage} max="100"></progress>
    </div>

  </div>

  {/* Actions */}
  <div className='flex items-center gap-2'>
    {style && (
      <Link className='btn btn-primary btn-sm flex-1 justify-center' href={`/project/${project.id}`}>
        Voir le projet
        <ExternalLink className="w-3.5" />
      </Link>
    )}
    {admin === 1 && (
      <button className='btn btn-sm btn-ghost text-error border border-error/20 hover:bg-error/10' onClick={handleDeleteClick}>
        <Trash className='w-3.5' />
      </button>
    )}
  </div>

  {/* Modal suppression */}
  <dialog ref={modalRef} className="modal">
    <div className="modal-box">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <Trash className="w-5 text-error" />
        Supprimer le projet
      </h3>
      <p className="py-4 text-base-content/50 text-sm leading-relaxed">
        Êtes-vous sûr de vouloir supprimer le projet{' '}
        <span className="font-medium text-base-content">{project.name}</span> ?
        Cette action est irréversible.
      </p>
      <div className="modal-action">
        <button className="btn btn-ghost btn-sm" onClick={handleCancelDelete}>
          Annuler
        </button>
        <button className="btn btn-error btn-sm text-white" onClick={handleConfirmDelete}>
          Supprimer
        </button>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

</div>
    )
}

export default ProjectComponent