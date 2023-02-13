const express = require("express");
const app = express();
const port = 3000;
const employeeRouter = require('./src/Employee/routes');
const bodyParser = require("body-parser");


app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello world");
});

//Using body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))




app.use("/api/v1/employee",employeeRouter);
app.listen(port, () =>console.log(`app listening on port ${port}`));