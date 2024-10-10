"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// i want to get only task for the the project
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasks = yield prisma.task.findMany({ where: { projectId: Number(id) }, include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            } });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    ;
});
exports.getTasks = getTasks;
// create task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate, status, priority, projectId, assignedUserId, authorUserId, tags, startDate, points } = req.body;
        const task = yield prisma.task.create({ data: { title, description, dueDate, status, priority, projectId, assignedUserId, authorUserId, tags, startDate, points } });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTask = createTask;
// update task status
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = yield prisma.task.update({ where: { id: Number(id) }, data: { status: status } });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTaskStatus = updateTaskStatus;
