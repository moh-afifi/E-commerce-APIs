// @ts-ignore
import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from 'pg';
import Client from '../database';
//----------------------------------------------------
//user model:
export type User = {
    id?: number,
    phone: string;
    password: string;
}
//----------------------------------------------------
//user services:
export class UserServices {
    // to create new user: register
    async register(u: User): Promise<User | boolean> {
        const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
        try {
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sqlSelect: string = 'SELECT phone FROM users WHERE phone=($1)';
            const resultSelect: QueryResult<any> = await conn.query(sqlSelect, [u.phone]);

            if (resultSelect.rows.length === 0) {
                const sql: string = 'INSERT INTO users (phone, password) VALUES($1, $2) RETURNING *';
                const hash: string = bcrypt.hashSync(
                    u.password + BCRYPT_PASSWORD,
                    parseInt(SALT_ROUNDS as string, 10),
                );
                const result: QueryResult<any> = await conn.query(sql, [u.phone, hash]);
                const user: User = result.rows[0];
                conn.release();
                return user;
            }
            conn.release();
            return false;
        } catch (err) {
            throw new Error(`unable create user (${u.phone}): ${err}`);
        }
    }
    //-------------------------------------------------------------------------------
    // to authentiacte user: login
    async login(u: User): Promise<string> {
        const { BCRYPT_PASSWORD } = process.env;

        try {
            const conn: PoolClient = await Client.connect();
            const sql: string = 'SELECT password FROM users WHERE phone=($1)';
            const result: QueryResult<any> = await conn.query(sql, [u.phone]);
            console.log(result.rows);

            if (result.rows.length !== 0) {
                const user: User = result.rows[0];
                if (bcrypt.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
                    return 'login success';
                }
                return 'login failed';
            }
            return 'user not found';
        } catch (e) {
            return 'user not found';
        }
    }
    //-------------------------------------------------------------------------------
}
