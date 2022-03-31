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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../models/product");
//-------------------------------------------------------------------------------
const productServices = new product_1.ProductServices();
//-------------------------------------------------------------------------------
const getMainCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json({ message: 'Invalid Token' });
        console.log(e);
        return;
    }
    try {
        const result = yield productServices.getMainCategories();
        res.json(result);
    }
    catch (e) {
        res.json('Unable to get categories');
    }
});
//-------------------------------------------------------------------------------
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json({ message: 'Invalid Token' });
        console.log(e);
        return;
    }
    try {
        if (!Number.isNaN(`${req.query.id}`)) {
            const result = yield productServices.getSubCategories(parseInt(req.query.id, 10));
            res.json(result);
        }
        else {
            res.json({ message: 'Invalid category id' });
        }
    }
    catch (e) {
        res.json({ message: 'Unable to get Categories' });
    }
});
//-------------------------------------------------------------------------------
const productRoutes = (app) => {
    app.get('/mainCategory', getMainCategories);
    app.get('/subCategory', getSubCategories);
};
//-------------------------------------------------------------------------------
exports.default = productRoutes;
