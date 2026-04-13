// Types de base qui correspondent à ton schéma SQL

export type User = {
  id: string
  name: string
  email: string
}

export type Task = {
  id: string
  name: string
  description: string
  status: string
  dueDate: Date | null
  projectId: string
  userId: string | null
  createdById: string
  solutionDescription: string | null
  // Relations
  user?: User | null
  createdBy?: User | null
}

export type Project = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  inviteCode: string
  createdById: string
  // Relations
  tasks?: Task[]
  users?: User[]
  createdBy?: User
  // Propriétés calculées
  totalTasks?: number
  collaboratorsCount?: number
  taskStats?: {
    toDo: number
    inProgress: number
    done: number
  }
  percentages?: {
    progressPercentage: number
    inProgressPercentage: number
    toDoPercentage: number
  }
}