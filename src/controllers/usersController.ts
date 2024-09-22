import { Request, Response } from "express";
import prisma from "../models/user"
import { hashPassword } from "../services/password.service";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email) {
            res.status(400).json({ error: "El email debe ser obligatorio" })
            return
        }
        if (!password) {
            res.status(400).json({ error: "El password debe ser obligatorio" })
            return
        }

        const hashedPassword = await hashPassword(password)
        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        res.status(201).json(user)

    } catch (error: any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
            res.status(400).json({ error: "El email ingresado ya existe" })
        }

        console.log(error)
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" })
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)

    try {
        const user = await prisma.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            res.status(404).json({ error: "El usuario no fue encontrado" })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    const { email, password } = req.body
    try {

        let dataToUpdate: any = { ...req.body }

        if (password) {
            //Si pone una contraseña nueva, la hasheamos y se la ponemos
            const hashedPassword = await hashPassword(password)
            dataToUpdate.password = hashedPassword
        }

        if (email) {
            dataToUpdate.email = email
        }

        const user = await prisma.update({
            where: {
                id: userId
            }, data: dataToUpdate
        })

        res.status(200).json(user)
    } catch (error: any) {
        if (error?.code === "P2002" && error?.meta?.includes("email")) {
            res.status(400).json({ error: "El mail ingresado ya existe" })
        }
        else if (error?.code === "P2025") {
            res.status(404).json("Usuario no encontrado")
        }
        console.log(error)
        res.status(500).json({ error: "Hubo un error, pruebe más tarde" })
    }

}


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id)
    try {
        await prisma.delete({
            where: {
                id: userId
            }
        })
        res.status(200).json({ message: `Èl usuario ${userId} ha sido eliminado` }).end()

    } catch (error: any) {
        if (error?.code === "P2025") {
            res.status(404).json("Usuario no encontrado")
        } else {
            console.log(error)
            res.status(500).json({ error: "Hubo un error, pruebe más tarde" })
        }
    }

}