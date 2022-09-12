import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());
const mongoClient = new MongoClient(process.env.MONGO_URI)

let db;

mongoClient.connect().then(()=>{
db =mongoClient.db('my-wallet')
})


const users = []
let user = ""

server.post("/auth/sign-up", (req, res) => {
    const novoSignUp = req.body
    user = req.body

    const userExistente = users.find(item =>  item.email === novoSignUp.email);
    if (userExistente){
       res.status(409).send({erro:"Usuário já cadastrado!"})
       return
    }

    
    users.push({...novoSignUp, id: users.length+1})
    console.log(users);
    res.send("Usuário criado com sucesso!")
})


server.listen(4000, () => console.log("Listening on port 4000"))