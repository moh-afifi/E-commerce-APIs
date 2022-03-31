import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserServices, User } from '../models/user';
//-------------------------------------------------------------------------------
const userServices: UserServices = new UserServices();
//-------------------------------------------------------------------------------
const register = async (req: Request, res: Response) => {
    const user: User = {
        phone: req.body.phone,
        password: req.body.password
    };
    try {
        const newUser: boolean | User = await userServices.register(user);
        if (!newUser) {
            res.json({ message: 'user alreday exists!' });
        } else {
            const token: string = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
            res.json({ message: token });
        }
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
//-------------------------------------------------------------------------------
const login = async (req: Request, res: Response) => {
    const user: User = {
        phone: req.body.phone,
        password: req.body.password
    };
    try {
        const result: string = await userServices.login(user);
        if (result === 'login success') {
            const token: string = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
            res.json({ message: 'login success', token: token });
        } else if (result === 'login failed') {
            res.json({ message: 'login failed', token: null });
        } else {
            res.json({ message: 'user not found', token: null });
        }
    } catch (e) {
        res.json({ message: 'login failed' });
    }
};
//-------------------------------------------------------------------------------
const userRoutes = (app: express.Application) => {
    app.get('/login', login);
    app.post('/register', register);
};
//-------------------------------------------------------------------------------
export default userRoutes;
