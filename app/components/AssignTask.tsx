import { User } from '@/type'
import React, { FC, useRef, useState } from 'react'
import UserInfo from './UserInfo'

interface AssignTaskProps {
    users: User[]
    projectId: string
    onAssignTask :(user : User) => void
}

const AssignTask: FC<AssignTaskProps> = ({ users, projectId , onAssignTask }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleAssign = (user: User) => {
        setSelectedUser(user)
        onAssignTask(user)
        modalRef.current?.close()
    }

    return (
        <div className='w-full '>
            <div
                className="cursor-pointer border border-base-300 rounded-xl w-full h-full p-3 hover:border-primary hover:bg-base-200 transition-all duration-200"
                onClick={() => modalRef.current?.showModal()}
            >
                <UserInfo
                    role="Assigné à "
                    email={selectedUser?.email || "Personne"}
                    name={selectedUser?.name || ""}
                />
            </div>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box flex flex-col gap-4">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div>
                        <h3 className="font-bold text-xl">Choisissez un collaborateur</h3>
                        <p className="text-base-content/50 text-sm mt-1">Sélectionnez un membre du projet</p>
                    </div>

                    <div className="divider my-0" />

                    <div className="flex flex-col gap-3">
                        {users?.map((user) => (
                            <div
                                onClick={() => handleAssign(user)}
                                key={user.id}
                                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200
                                    ${selectedUser?.id === user.id
                                        ? 'border-primary bg-primary/10'
                                        : 'border-base-300 hover:bg-base-200 hover:border-primary'
                                    }`}
                            >
                                <UserInfo
                                    role="Assigné à "
                                    email={user.email || null}
                                    name={user.name || null}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Fermer</button>
                </form>
            </dialog>
        </div>
    )
}

export default AssignTask