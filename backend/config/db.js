import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

//const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ MongoDB CONNECTED SUCCESSFULLY: ${conn.connection.host}`);
      console.log('Hello from Mongo DB')
        
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1); // 1 code means failure while 0 means success
    }
}