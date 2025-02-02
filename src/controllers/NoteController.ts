import type { Request, Response } from "express";
import Note, {INote} from "../models/Note";
import { Types } from "mongoose";


type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {

    // El metodo generic de Request no tiene un tipo definido para el body, por lo que se debe definir el tipo de body
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        const { content } = req.body
        const note = new Note()
        note.content = content
        note.createBy = req.user.id
        note.task = req.task.id

        req.task.notes.push(note.id)

        try {
            await Promise.allSettled([req.task.save(), note.save()])
            res.send("Nota creada")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al crear la nota'})
        }
    }

    static getTaskNotes = async (req: Request, res: Response) => {
          
        try {
            const notes = await Note.find({task: req.task.id})
            res.json(notes)
        } catch (error) {
            res.status(500).json({error: 'Error al obtener las notas'})

        }
    }

    static deleteNote = async (req: Request<NoteParams> , res: Response) => {
        
        const { noteId } = req.params
        const note = await Note.findById(noteId)

        if(!note) {
            const error = new Error('Note not found')
            res.status(404).json({error: error.message})
        }

        if(note.createBy.toString() !== req.user.id) {
            const error = new Error('You are not authorized to delete this note')
            res.status(403).json({error: error.message})
        }

        req.task.notes = req.task.notes.filter( note => note.toString() !== noteId.toString())

        try {
            await Promise.allSettled([req.task.save(), note.deleteOne()]) // Delete note and delete reference
            res.send("Nota eliminada")
        } catch (error) {
            res.status(500).json({error: 'Internal server error'})
            
        }

    }
}