import type { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
} // This is a declaration merging, it merges the Request interface with the task property

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    // Check if project exists
    try {
        const { taskId } = req.params;        
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        
        req.task = task;

        next();
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// Middleware to check if the task belongs to the project
export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    if(req.task.project.toString() !== req.project.id.toString()){
        return res.status(404).json({error: 'Tarea no encontrada en el proyecto'});
    }
    next();
}

// Middleware to check if the user has authorization to perform an action
export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
    if(req.user.id.toString() !== req.project.manager.toString()){
        const error = new Error('Accion no válida')
        return res.status(404).json({error: error.message})
    }
    next();
}