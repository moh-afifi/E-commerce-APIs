import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ProductServices, MainCategory, SubCategory } from '../models/product';
//-------------------------------------------------------------------------------
const productServices: ProductServices = new ProductServices();
//-------------------------------------------------------------------------------
const getMainCategories = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string;
        const token: string = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
        res.status(401);
        res.json({ message: 'Invalid Token' });
        console.log(e);
        return;
    }

    try {
        const result: MainCategory[] = await productServices.getMainCategories();
        res.json(result);
    } catch (e) {
        res.json('Unable to get categories');
    }
};

//-------------------------------------------------------------------------------
const getSubCategories = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string;
        const token: string = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
    } catch (e) {
        res.status(401);
        res.json({ message: 'Invalid Token' });
        console.log(e);
        return;
    }

    try {
        if (!Number.isNaN(`${req.query.id}`)) {
            const result: SubCategory[] = await productServices.getSubCategories(parseInt(req.query.id as string, 10));
            res.json(result);
        } else {
            res.json({ message: 'Invalid category id' });
        }
    } catch (e) {
        res.json({ message: 'Unable to get Categories' });
    }
};
//-------------------------------------------------------------------------------
const productRoutes = (app: express.Application) => {
    app.get('/mainCategory', getMainCategories);
    app.get('/subCategory', getSubCategories);
};
//-------------------------------------------------------------------------------
export default productRoutes;
