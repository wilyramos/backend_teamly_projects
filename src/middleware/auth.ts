import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// añadiendo user al Request de express
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
} // para que typescript no se queje de que no existe user en Request

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization // Bearer token
    if(!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    const [, token] = bearer.split(' ')
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id name email') // solo seleccionamos estos campos
            if(user) {
                req.user = user // añadiendo user al Request de express
                next()
            } else {
                res.status(500).json({error: 'Token No Válido'})
            }
        }
    } catch (error) {
        res.status(500).json({error: 'Token No Válido'})
    }
}
