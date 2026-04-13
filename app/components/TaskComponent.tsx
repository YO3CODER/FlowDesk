"use client"

import { Task } from '@/type'
import { ArrowRight, Trash } from 'lucide-react'
import React, { FC, useRef } from 'react'
import { createPortal } from 'react-dom'
import UserInfo from './UserInfo'
import Link from 'next/link'

interface TaskProps {
  task: Task
  index: number
  email?: string
  onDelete?: (id: string) => void
}

const TaskComponent: FC<TaskProps> = ({ task, index, email, onDelete }) => {
  const canDelete = email == task.createdBy?.email
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleDeleteClick = () => {
    modalRef.current?.showModal()
  }

  const handleConfirm = () => {
    modalRef.current?.close()
    if (onDelete) {
      onDelete(task.id)
    }
  }

  const handleCancel = () => {
    modalRef.current?.close()
  }

  const modal = (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmer la suppression</h3>
        <p className="py-4 text-sm text-gray-500">
          Êtes-vous sûr de vouloir supprimer la tâche{' '}
          <span className="font-semibold text-base-content">
            {task.name.length > 60 ? `${task.name.slice(0, 60)}...` : task.name}
          </span>{' '}
          ? Cette action est irréversible.
        </p>
        <div className="modal-action">
          <button onClick={handleCancel} className="btn btn-sm">
            Annuler
          </button>
          <button onClick={handleConfirm} className="btn btn-sm btn-error">
            <Trash className="w-4" />
            Supprimer
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )

  return (
    <>
      {typeof window !== 'undefined' && createPortal(modal, document.body)}

      <td>{index + 1}</td>
      <td>
        <div className="flex flex-col">
          <div
            className={`badge text-xs mb-2 font-semibold 
              ${task.status === 'To Do' ? 'bg-red-200 text-gray-800 text-sm h-full w-full' : ''}
              ${task.status === 'In Progress' ? 'bg-yellow-200 text-gray-800 h-full w-full' : ''} 
              ${task.status === 'Done' ? 'bg-green-200 text-gray-800 h-full w-full' : ''}
            `}
          >
            {task.status === 'To Do' && 'À Faire'}
            {task.status === 'In Progress' && 'En cours'}  
            {task.status === 'Done' && 'Terminé'}
          </div>
          <span className="text-sm font-bold">
            {task.name.length > 100 ? `${task.name.slice(0, 100)}...` : task.name}
          </span>
        </div>
      </td>

      <td className="text-white">
        <UserInfo
          role=""
          email={task.user?.email || null}
          name={task.user?.name || null}
        />
      </td>

      <td>
        <div className="text-sm text-gray-500 hidden md:flex">
          {task.dueDate && new Date(task.dueDate).toLocaleString()}
        </div>
      </td>

      <td>
        <div className="flex h-fit">
          <Link className="btn btn-sm btn-primary" href={`/task-details/${task.id}`}>
            Plus <ArrowRight className="w-4" />
          </Link>
          {canDelete && (
            <button onClick={handleDeleteClick} className="btn btn-sm btn-error ml-2">
              <Trash className="w-4" />
            </button>
          )}
        </div>
      </td>
    </>
  )
}

export default TaskComponent