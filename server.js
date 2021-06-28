import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch';

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/',(req,res)=>{
    res.status(200).json({
        status:200,
        message:"Welcome Nelly"
    })
})

app.get('/photos/:id', async (req,res) =>{

    try{
        
        const { id } = req.params;
        
        const data = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
                    .then(res => res.json());
                    
        res.status(200).json({
            status:200,
            message:"Fetch Success",
            data
        })

    }catch(error){
        res.status(500).json({
            status:500,
            message:error
        })
    }

})

app.use((req,res)=>{
    res.status(404).json({
        status:404,
        message:"API Not Found"
    })
})

const port = process.env.PORT || 5000

app.listen(port,()=>console.log("listening on port ",port))
