import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({ where: { id: Number(id) } });
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const project = await prisma.project.create({ data: { name, description, startDate, endDate } });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, startDate, endDate } = req.body;
        const project = await prisma.project.update({ where: { id: Number(id) }, data: { name, description, startDate, endDate } });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.project.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
