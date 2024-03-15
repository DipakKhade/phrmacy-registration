import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const app=express();
app.use(express.static('../static'));
app.use(express.json())
app.use(cors());

const prisma=new PrismaClient({ log: ["query", "info", "error"] });

app.get('/',function(req,res){
    res.sendFile(process.cwd()+'/static/index.html')
})


app.post('/submit',async function(req,res){
   const formdata=req.body

   console.log(formdata)
    await prisma.user.create({
        data:formdata
    })  
    
    res.json({'success':true})
})


app.listen(3000,()=>console.log('server is up and running on PORT 3000 ....'))