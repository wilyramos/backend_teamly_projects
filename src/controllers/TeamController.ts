import type { Request, Response } from 'express'
import User from '../models/User'
import Project from '../models/Project'

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body

        // Find user
        const user = await User.findOne({email}).select('id email name')
        if(!user) {
            const error = new Error('Usuario No Encontrado')
            return res.status(404).json({error: error.message})
        }
        res.json(user)
    }
    
    // Find members by email (Case insensitive) 
    // Implement the findMembersByEmail method in the TeamMemberController class. This method should find all users whose email contains the email parameter. The search should be case insensitive. The method should return an array of objects with the id, email, and name of the users found. If no users are found, the method should return a 404 status code with the message "Usuario No Encontrado".
    static findMembersByEmail = async (req: Request, res: Response) => {
        const { email } = req.body

        try {
            const users = await User.find({
                email: {
                    $regex: email,
                    $options: 'i' // Case insensitive 
                }
            }).select('id email name').limit(5)
            res.json(users)
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static getProjecTeam = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: 'id email name'
        }) // Populate team members with id, email and name
        // populate is used to get the details of the user from the user collection
        res.json(project.team)
    }

    static addMemberById = async (req: Request, res: Response) => {
        const { id } = req.body

        // Find user
        const user = await User.findById(id).select('id')
        if(!user) {
            const error = new Error('Usuario No Encontrado')
            return res.status(404).json({error: error.message})
        }

        if(req.project.team.some(team => team.toString() === user.id.toString())) {
            const error = new Error('El usuario ya existe en el proyecto')
            return res.status(409).json({error: error.message})
        }

        req.project.team.push(user.id)
        await req.project.save()

        res.send('Usuario agregado correctamente')
    }

    static removeMemberById = async (req: Request, res: Response) => {
        const { userId } = req.params

        if(!req.project.team.some(team => team.toString() ===  userId)) {
            const error = new Error('El usuario no existe en el proyecto')
            return res.status(409).json({error: error.message})
        }

        req.project.team = req.project.team.filter( teamMember => teamMember.toString() !==  userId)
        await req.project.save()
        res.send('Usuario eliminado correctamente')
    }
}
