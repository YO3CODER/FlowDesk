"use server"

import sql from "@/lib/db"
import { randomBytes } from "crypto"
import { Project, Task, User } from "../type"

export async function checkAndAddUser(email: string, name: string) {
    if (!email) return
    try {
        const [existingUser] = await sql`
            SELECT id FROM "User" WHERE email = ${email}
        `
        if (!existingUser && name) {
            await sql`
                INSERT INTO "User" (name, email)
                VALUES (${name}, ${email})
            `
            console.log("Un utilisateur a été créé")
        } else {
            console.log("Utilisateur déjà présent dans la base de données")
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error)
    }
}

function generateUniqueCode(): string {
    return randomBytes(6).toString("hex")
}

export async function createProject(name: string, description: string, email: string): Promise<Project> {
    try {
        const inviteCode = generateUniqueCode()

        const [user] = await sql`
            SELECT id FROM "User" WHERE email = ${email}
        `
        if (!user) throw new Error("User not found")

        const [newProject] = await sql`
            INSERT INTO "Project" (name, description, "inviteCode", "createdById")
            VALUES (${name}, ${description}, ${inviteCode}, ${user.id})
            RETURNING *
        `
        return newProject as Project
    } catch (error) {
        console.error(error)
        throw new Error("Erreur lors de la création du projet")
    }
}

export async function getProjectsCreatedByUser(email: string): Promise<Project[]> {
    try {
        const projects = await sql`
            SELECT
                p.*,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',                  t.id,
                        'name',                t.name,
                        'description',         t.description,
                        'status',              t.status,
                        'dueDate',             t."dueDate",
                        'solutionDescription', t."solutionDescription",
                        'createdById',         t."createdById",
                        'user',                jsonb_build_object(
                            'id',    u.id,
                            'name',  u.name,
                            'email', u.email
                        )
                    )
                ) FILTER (WHERE t.id IS NOT NULL) AS tasks,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',    pu.id,
                        'name',  pu.name,
                        'email', pu.email
                    )
                ) FILTER (WHERE pu.id IS NOT NULL) AS users
            FROM "Project" p
            JOIN "User" creator ON creator.id = p."createdById"
            LEFT JOIN "Task" t ON t."projectId" = p.id
            LEFT JOIN "User" u ON u.id = t."userId"
            LEFT JOIN "ProjectUser" puj ON puj."projectId" = p.id
            LEFT JOIN "User" pu ON pu.id = puj."userId"
            WHERE creator.email = ${email}
            GROUP BY p.id
        `
        return projects as Project[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteProjectById(projectId: string): Promise<void> {
    try {
        await sql`
            DELETE FROM "Project" WHERE id = ${projectId}
        `
        console.log(`Projet ${projectId} supprimé avec succès.`)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function addUserToProject(email: string, inviteCode: string): Promise<string> {
    try {
        const [project] = await sql`
            SELECT id FROM "Project" WHERE "inviteCode" = ${inviteCode}
        `
        if (!project) throw new Error("Projet non trouvé")

        const [user] = await sql`
            SELECT id FROM "User" WHERE email = ${email}
        `
        if (!user) throw new Error("Utilisateur non trouvé")

        const [existingAssociation] = await sql`
            SELECT id FROM "ProjectUser"
            WHERE "userId" = ${user.id} AND "projectId" = ${project.id}
        `
        if (existingAssociation) throw new Error("Utilisateur déjà associé à ce projet")

        await sql`
            INSERT INTO "ProjectUser" ("userId", "projectId")
            VALUES (${user.id}, ${project.id})
        `
        return "Utilisateur ajouté au projet avec succès"
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getProjectsAssociatedWithUser(email: string): Promise<Project[]> {
    try {
        const projects = await sql`
            SELECT
                p.*,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',          t.id,
                        'name',        t.name,
                        'description', t.description,
                        'status',      t.status,
                        'dueDate',     t."dueDate"
                    )
                ) FILTER (WHERE t.id IS NOT NULL) AS tasks,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',    pu.id,
                        'name',  pu.name,
                        'email', pu.email
                    )
                ) FILTER (WHERE pu.id IS NOT NULL) AS users
            FROM "Project" p
            JOIN "ProjectUser" puj ON puj."projectId" = p.id
            JOIN "User" member ON member.id = puj."userId"
            LEFT JOIN "Task" t ON t."projectId" = p.id
            LEFT JOIN "ProjectUser" puj2 ON puj2."projectId" = p.id
            LEFT JOIN "User" pu ON pu.id = puj2."userId"
            WHERE member.email = ${email}
            GROUP BY p.id
        `
        return projects as Project[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getProjectInfo(idProject: string, details: boolean): Promise<Project> {
    try {
        if (!details) {
            const [project] = await sql`
                SELECT * FROM "Project" WHERE id = ${idProject}
            `
            if (!project) throw new Error("Projet non trouvé")
            return project as Project
        }

        const [project] = await sql`
            SELECT
                p.*,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',                  t.id,
                        'name',                t.name,
                        'description',         t.description,
                        'status',              t.status,
                        'dueDate',             t."dueDate",
                        'solutionDescription', t."solutionDescription",
                        'createdById',         t."createdById",
                        'createdBy',           jsonb_build_object(
                            'id',    cb.id,
                            'name',  cb.name,
                            'email', cb.email
                        ),
                        'user',                jsonb_build_object(
                            'id',    u.id,
                            'name',  u.name,
                            'email', u.email
                        )
                    )
                ) FILTER (WHERE t.id IS NOT NULL) AS tasks,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id',    pu.id,
                        'name',  pu.name,
                        'email', pu.email
                    )
                ) FILTER (WHERE pu.id IS NOT NULL) AS users,
                jsonb_build_object(
                    'id',    creator.id,
                    'name',  creator.name,
                    'email', creator.email
                ) AS "createdBy"
            FROM "Project" p
            JOIN "User" creator ON creator.id = p."createdById"
            LEFT JOIN "Task" t ON t."projectId" = p.id
            LEFT JOIN "User" u ON u.id = t."userId"
            LEFT JOIN "User" cb ON cb.id = t."createdById"
            LEFT JOIN "ProjectUser" puj ON puj."projectId" = p.id
            LEFT JOIN "User" pu ON pu.id = puj."userId"
            WHERE p.id = ${idProject}
            GROUP BY p.id, creator.id
        `
        if (!project) throw new Error("Projet non trouvé")
        return project as Project
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getProjectUsers(idProject: string): Promise<User[]> {
    try {
        const users = await sql`
            SELECT u.id, u.name, u.email
            FROM "User" u
            JOIN "ProjectUser" pu ON pu."userId" = u.id
            WHERE pu."projectId" = ${idProject}
        `
        return users as User[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createTask(
    name: string,
    description: string,
    dueDate: Date | null,
    projectId: string,
    createdByEmail: string,
    assignToEmail: string | undefined
): Promise<Task> {
    try {
        const [createdBy] = await sql`
            SELECT id FROM "User" WHERE email = ${createdByEmail}
        `
        if (!createdBy) throw new Error(`Utilisateur ${createdByEmail} introuvable`)

        let assignedUserId = createdBy.id

        if (assignToEmail) {
            const [assignedUser] = await sql`
                SELECT id FROM "User" WHERE email = ${assignToEmail}
            `
            if (!assignedUser) throw new Error(`Utilisateur ${assignToEmail} introuvable`)
            assignedUserId = assignedUser.id
        }

        const [newTask] = await sql`
            INSERT INTO "Task" (name, description, "dueDate", "projectId", "createdById", "userId")
            VALUES (${name}, ${description}, ${dueDate}, ${projectId}, ${createdBy.id}, ${assignedUserId})
            RETURNING *
        `
        console.log("Tâche créée avec succès:", newTask)
        return newTask as Task
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteTaskById(taskId: string): Promise<void> {
    try {
        await sql`
            DELETE FROM "Task" WHERE id = ${taskId}
        `
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getTaskDetails(taskId: string): Promise<Task> {
    try {
        const [task] = await sql`
            SELECT
                t.*,
                jsonb_build_object(
                    'id',    p.id,
                    'name',  p.name
                ) AS project,
                jsonb_build_object(
                    'id',    u.id,
                    'name',  u.name,
                    'email', u.email
                ) AS user,
                jsonb_build_object(
                    'id',    cb.id,
                    'name',  cb.name,
                    'email', cb.email
                ) AS "createdBy"
            FROM "Task" t
            JOIN "Project" p ON p.id = t."projectId"
            LEFT JOIN "User" u ON u.id = t."userId"
            JOIN "User" cb ON cb.id = t."createdById"
            WHERE t.id = ${taskId}
        `
        if (!task) throw new Error("Tâche non trouvée")
        return task as Task
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function updateTaskStatus(taskId: string, newStatus: string, solutionDescription?: string): Promise<void> {
    try {
        const [existingTask] = await sql`
            SELECT id FROM "Task" WHERE id = ${taskId}
        `
        if (!existingTask) throw new Error("Tâche non trouvée")

        if (newStatus === "Done" && solutionDescription) {
            await sql`
                UPDATE "Task"
                SET status = ${newStatus}, "solutionDescription" = ${solutionDescription}
                WHERE id = ${taskId}
            `
        } else {
            await sql`
                UPDATE "Task"
                SET status = ${newStatus}
                WHERE id = ${taskId}
            `
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}