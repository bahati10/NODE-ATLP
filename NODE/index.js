import express from 'express';
import mongoose from 'mongoose';

import 'dotenv/config';

    
mongoose
.connect(process.env.DB)
.then(() => {
    const port =process.env.PORT
    const app = express()
        
    app.listen(port, () => {
        console.log(`Server Running on port ${port}`)
    })
})