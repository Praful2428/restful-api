//With routing concept of express............

const express= require("express");
const app=express();

const port=process.env.PORT || 8000;
require("./db/conn");
const studentRouter=require("./router/student");//adding routing concept of express

const Student = require("./models/students")  //  here we define schema.....

app.use(express.json());

//if this not added req.body not work  in router folder you can see..
//we neewd to register ourerouter

app.use(studentRouter);

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})