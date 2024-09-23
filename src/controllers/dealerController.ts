import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getDealer = async (req: Request, res: Response) => {
    const dealerId = Number(req.params.id);
    const dealer = await prisma.dealer.findUnique({
        where: { id: dealerId },
        include: { vehicles: true, accessories: true, posts: true },
    });
    if (!dealer) {
        return res.status(404).json({ error: "Consecionario no encontrado" });
    }
    res.json(dealer);
};

export const createDealer = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newDealer = await prisma.dealer.create({
        data: { name },
    });
    res.status(201).json(newDealer);
};

export const updateDealer = async (req: Request, res: Response) => {
    const dealerId = Number(req.params.id);
    const { name } = req.body;
    const updatedDealer = await prisma.dealer.update({
        where: { id: dealerId },
        data: { name },
    });
    res.json(updatedDealer);
};

export const deleteDealer = async (req: Request, res: Response) => {
    const dealerId = Number(req.params.id);
    await prisma.dealer.delete({
        where: { id: dealerId },
    });
    res.json({ message: `Consecionario con ID:${dealerId} eliminado` });
};
