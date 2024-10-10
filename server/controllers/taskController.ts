import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// i want to get only task for the the project

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const tasks = await prisma.task.findMany({ where: { projectId: Number(id) }, include: {
            author: true,
            assignee: true,
            comments: true,
            attachments: true,
           
            
        } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
};
}

// create task

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, dueDate, status, priority, projectId, assignedUserId, authorUserId, tags, startDate, points } = req.body;
        const task = await prisma.task.create({ data: { title, description, dueDate, status, priority, projectId, assignedUserId, authorUserId, tags, startDate, points } });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


// update task status

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await prisma.task.update({ where: { id: Number(id) }, data: { status: status } });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
