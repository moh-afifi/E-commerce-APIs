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
const user_1 = require("../models/user");
//-------------------------------------------------------------------------------
const userServices = new user_1.UserServices();
//-------------------------------------------------------------------------------
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        phone: req.body.phone,
        password: req.body.password
    };
    try {
        const newUser = yield userServices.register(user);
        if (!newUser) {
            res.json({ message: 'user alreday exists!' });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json({ message: token });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
//-------------------------------------------------------------------------------
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        phone: req.body.phone,
        password: req.body.password
    };
    try {
        const result = yield userServices.login(user);
        if (result === 'login success') {
            const token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
            res.json({ message: 'login success', token: token });
        }
        else if (result === 'login failed') {
            res.json({ message: 'login failed', token: null });
        }
        else {
            res.json({ message: 'user not found', token: null });
        }
    }
    catch (e) {
        res.json({ message: 'login failed' });
    }
});
//-------------------------------------------------------------------------------
const userRoutes = (app) => {
    app.get('/login', login);
    app.post('/register', register);
};
//-------------------------------------------------------------------------------
exports.default = userRoutes;
