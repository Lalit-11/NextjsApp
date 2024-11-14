import mysql from 'mysql2/promise'
let connection;
export const createConnection =async()=>{
    if(!connection){
        connection=await mysql.createConnection({
            host: process.env.DATABSE_HOST,    
            user: process.env.DATABSE_USER,         
            password: process.env.DATABSE_PASSWORD, 
            database: process.env.DATABSE_NAME,
        })
    }
    return connection;
}