import express from "express";

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.get("/",(req,res)=>{
    res.send("Salam Qaqa necesen?")
})

const port=process.env.PORT||9000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})