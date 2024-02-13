import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes.js"
import 'dotenv/config';

    
mongoose
.connect(process.env.DB)
.then(() => {
    const port =process.env.PORT

    const app = express()
    app.use(express.json())
    app.use("/api", routes) 
        
    app.listen(port, () => {
        console.log(`Server Running on port ${port}`)
    })
})