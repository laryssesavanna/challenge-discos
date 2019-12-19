const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const discs = require('./src/services/disc_service');
// const collections = require('./src/services/collection_service');
 
const app = express();
 
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
 
app.use("/discs", discs);
// app.use("/collections", collections);
 
// The specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Resource Not Found");
    err.status = 404;
    next(err);
});
 
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});
 
module.exports = app;