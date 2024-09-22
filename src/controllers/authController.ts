import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from "../models/user"
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    //envia el email y la contraseña para registrarse como req
    const { email, password } = req.body;
    try {
        if (!email) {
            res.status(400).json({ error: "El email debe ser obligatorio" })
            return
        }
        if (!password) {
            res.status(400).json({ error: "El password debe ser obligatorio" })
            return
        }
        //hashea el password para enviarlo hasheado en la base de datos
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword)

        //Crea un usuario con el password hasheado y lo guarda en la base de datos
        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        //Luego de creado ese usuario genera un token
        const token = generateToken(user)
        res.status(201).json({ token })

    } catch (error: any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
            res.status(400).json({ error: "El email ingresado ya existe" })
        }

        console.log(error)
        res.status(500).json({ error: "Hubo un error en el registro" })
    }
};


export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {

        if (!email) {
            res.status(400).json({ error: "El email debe ser obligatorio" })
            return
        }
        if (!password) {
            res.status(400).json({ error: "El password debe ser obligatorio" })
            return
        }

        const user = await prisma.findUnique({
            where: { email }
        })
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" })
            return
        }

        const passwordMatch = await comparePasswords(password, user.password)// comparador de contraseña

        if (!passwordMatch) {
            res.status(401).json({ error: "Usuario y/o contraseña no coinciden" })
            return
        }

        const token = generateToken(user)
        res.status(200).json({ token })

    } catch (error) {
        console.log("Error", error)
    }
}