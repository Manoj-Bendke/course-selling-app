import dotenv from 'dotenv';
dotenv.config({quite : true})

const userJWT = process.env.JWT_USER_SECRET;
const adminJWT = process.env.JWT_ADMIN_SECRET;
const dbURL = process.env.DB_URL;

export {userJWT,adminJWT}