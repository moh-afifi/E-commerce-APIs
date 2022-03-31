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
exports.UserServices = void 0;
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
//----------------------------------------------------
//user services:
class UserServices {
    // to create new user: register
    register(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sqlSelect = 'SELECT phone FROM users WHERE phone=($1)';
                const resultSelect = yield conn.query(sqlSelect, [u.phone]);
                if (resultSelect.rows.length === 0) {
                    const sql = 'INSERT INTO users (phone, password) VALUES($1, $2) RETURNING *';
                    const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                    const result = yield conn.query(sql, [u.phone, hash]);
                    const user = result.rows[0];
                    conn.release();
                    return user;
                }
                conn.release();
                return false;
            }
            catch (err) {
                throw new Error(`unable create user (${u.phone}): ${err}`);
            }
        });
    }
    //-------------------------------------------------------------------------------
    // to authentiacte user: login
    login(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD } = process.env;
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE phone=($1)';
                const result = yield conn.query(sql, [u.phone]);
                console.log(result.rows);
                if (result.rows.length !== 0) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
                        return 'login success';
                    }
                    return 'login failed';
                }
                return 'user not found';
            }
            catch (e) {
                return 'user not found';
            }
        });
    }
}
exports.UserServices = UserServices;
