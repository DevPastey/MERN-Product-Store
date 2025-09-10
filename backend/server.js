import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json()); //allows us to accept json data in the req.body


app.use("/api/products", productRoutes);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get(/.*/, (req, res) =>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    }) 
}

connectDB().then(
    app.listen(port, () => {
        console.log(`Server Up and running on http://localhost:${port}`)
    })
);


// Vjsvshv7gsWs