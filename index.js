const express = require('express');

const app = express();
app.use(express.json());

const imagesRouter = require('./routes/images')

app.use('/api/retailer', imagesRouter);

const port = 2901;
 app.listen(port,() =>{
    console.log(`Server running on port ${port}`);
});