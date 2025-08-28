import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

app.use(express.json()); //allows us to accept json data in the req.body


app.use("/api/products", productRoutes);

const port = process.env.PORT || 5000;


connectDB().then(
    app.listen(port, () => {
        console.log(`Server Up and running on http://localhost:${port}`)
    })
);


// Vjsvshv7gsWs