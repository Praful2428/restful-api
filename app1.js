//without routing concept of express/.........................
//######################################

const express= require("express");
const app=express();
const port=process.env.PORT || 8000;
require("./db/conn");
const Student = require("./models/students")

app.use(express.json());//if this not added req.body not work 

app.get("/",(req,res)=>{
    res.send("hello i am praful");
  })

  /*
//post request ...we can register new student 
app.post("/student",(req,res)=>{
  console.log(req.body);
  const user = new Student(req.body)
  user.save().then(()=>{
     res.status(201).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })//using promises 
  //res.send("hello i am praful");
})*/


//by different methodd asycn --await
app.post("/students",async(req,res) => {

   try{
    const user=new Student(req.body);
    const createUser=await user.save();
    res.status(201).send(createUser);

   }catch(e){
     res.status(400).send(e);
   }

})
//get method

app.get("/students",async(req,res)=>{
  try{
     const studentsData=await Student.find();//alwyays return promise
     res.send(studentsData);

  }catch(e){
     res.send(e);
  }
})



app.get("/students/:id",async(req,res)=>{
  try{
    const _id=req.params.id;
     const studentsData=await Student.findById(_id);//alwyays return promise
     if(!studentsData){
       return res.status(404).send();
     }else{
      res.status(500).send(studentsData);
     }
     

  }catch(e){
     res.send(e);
  }
})
//name wala banaa h .....


//delete_student_by_id

app.delete("/students/:id",async(req,res)=>{
  try{
    const _id=req.params.id;
    const deleteStudent=await Student.findByIdAndDelete(_id);
    if(!_id){
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch(e){
    res.status(500).send(e);

  } 

})


//update student by id


app.patch("/students/:id",async(req,res)=>{
  try{
   const _id=req.params.id;
   if(!_id){
    return res.status(400).send();
  }
   const updateStudents= await Student.findByIdAndUpdate(_id,req.body ,{
     new :true
   } );
   res.status(201).send(updateStudents);
  }catch(e){
    res.status(500).send(e);
  }
})

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`)
})