import dotenv from 'dotenv';
dotenv.config();

// let missing = ["PORT", "DATABASE_URL"].filter(
//     key => process.env[key] === undefined
// )
  
// if (missing.length > 0) {
//     throw Error(`missing environment variables for ${missing.join(", ")}`)
// }
  
export default {
    port: process.env.PORT,
    db: {
      connectionString: process.env.MONGO_URL,
    },
}