"use client"
import { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import { FolderGit2 } from "lucide-react";
import { createProject, deleteProjectById, getProjectsCreatedByUser } from "./actions";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { Project } from "@/type";
import ProjectComponent from "./components/ProjectComponent";
import EmptyState from "./components/EmptyState";

export default function Home() {
  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress as string
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false) 

  const fetchProjects = async (email: string) => {
    try {
      setLoading(true) 
      const myProject = await getProjectsCreatedByUser(email)
      setProjects(myProject)
    } catch (error) {
      console.error('Erreur lors du chargement des projets', error)
    } finally {
      setLoading(false) // 👈
    }
  }

  useEffect(() => {
    if (email) {
      fetchProjects(email)
    }
  }, [email])

  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId)
      fetchProjects(email)
      toast.success("Projet supprimé avec succès.")
    } catch (error) {
      throw new Error("Error deleting project: " + error)
    }
  }

  const handleSubmit = async () => {
    try {
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement
      await createProject(name, description, email)
      if (modal) modal.close()
      setName("")
      setDescription("")
      fetchProjects(email)
      toast.success("Projet créé avec succès")
    } catch (error) {
      console.log("Error creating project")
    }
  }

  return (
    <Wrapper>
      <div>
        <button
          className="btn mb-6 btn-primary"
          onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}
        >
          Nouveau projet <FolderGit2 />
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Nouveau projet</h3>
            <p className="py-4">Décrivez votre projet simplement grâce à la description.</p>
            <div>
              <input
                type="text"
                placeholder="Nom de projet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-base-200 input input-bordered w-full mb-4 placeholder:text-sm"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 textarea textarea-bordered border border-base-300 w-full textarea-md placeholder::text-sm"
                required
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Nouveau projet <FolderGit2 />
              </button>
            </div>
          </div>
        </dialog>

       
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center w-full py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : projects.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectComponent project={project} style={true} admin={1} onDelete={deleteProject} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              imageSrc="/empty-project.png"
              imageAlt="Picture of an empty project"
              message="Aucun projet créé."
            />
          )}
        </div>

      </div>
    </Wrapper>
  );
}