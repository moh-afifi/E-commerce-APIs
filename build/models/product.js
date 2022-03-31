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
exports.ProductServices = void 0;
const database_1 = __importDefault(require("../database"));
//----------------------------------------------------
//Product services:
class ProductServices {
    // to get main-categories:
    getMainCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM main_category';
                const result = yield conn.query(sql);
                console.log(`${result.rows}fdsssssssssssssssssssssssssssssssssss`);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get main-categories: Error: ${e}`);
            }
        });
    }
    //-------------------------------------------------------------------------------
    // to get sub-category based on id of main-category:
    getSubCategories(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM sub_category WHere categ_id =($1) ';
                const result = yield conn.query(sql, [`${categoryId}`]);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users: Error: ${e}`);
            }
        });
    }
}
exports.ProductServices = ProductServices;
