// @ts-ignore
import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from 'pg';
import Client from '../database';
//----------------------------------------------------
//Main-Category model:
export type MainCategory = {
    id?: number,
    categ_name: string;
}
export type SubCategory = {
    id?: number,
    sub_categ_name: string;
    categ_id: number;
}
//----------------------------------------------------
//Product services:
export class ProductServices {
    // to get main-categories:
    async getMainCategories(): Promise<MainCategory[]> {
        try {
            const conn: PoolClient = await Client.connect();
            const sql: string = 'SELECT * FROM main_category';
            const result: QueryResult<any> = await conn.query(sql);
            console.log(`${result.rows.length}fdsssssssssssssssssssssssssssssssssss`);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not get main-categories: Error: ${e}`);
        }
    }
    //-------------------------------------------------------------------------------
    // to get sub-category based on id of main-category:
    async getSubCategories(categoryId: number): Promise<SubCategory[]> {
        try {
            const conn: PoolClient = await Client.connect();
            const sql: string = 'SELECT * FROM sub_category WHere categ_id =($1)';
            const result: QueryResult<any> = await conn.query(sql, [`${categoryId}`]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not get users: Error: ${e}`);
        }
    }
}
