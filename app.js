require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response
app.use(express.json())

//Models
const User = require('./models/User')

// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Conexão com o MongodbAtlas
mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.gbxnios.mongodb.net/authjwt?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000)
    
}).catch((err) => console.log(err))


//Registrar Usuário
app.post('/auth/register', async(req,res) =>{

    const {name, email,password,confirmpassword} = req.body

    // Validação de registro
    if(!name){
        return res.status(422).json({msg:'O nome é obrigatório!'})

    }else if(!email){
        return res.status(422).json({msg:'O email é obrigatório!'})

    }else if(!password){
        return res.status(422).json({msg:'O senha é obrigatório!'})

    }if (password !== confirmpassword){
       return res.status(422).json({msg:'A senhas não conferem!'})
    }

    //Validar se já possui cadastro
    const userExists  = await User.findOne({email: email})

    if(userExists){
        return res.status(422).json({msg:'Esse e-mail já está cadastrado. Por favor faça login ou utilize outro e-mail'})
    }

    //Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    // Criar usuário

    const user = new User({
        name,
        email,
        password : passwordHash,
    })
    try {
        await user.save()
        res.status(201).json({msg: 'Usuario criado com sucesso'})
        res.redirect('/auth/login')

    } catch (error) {
        console.log(error)
        
        res.status(500).json({msg:'Aconteceu um erro, tente novamente mais tarde!',})
    }

// Pagina de login 
app.post("/auth/login", async (req,res)=> {

    
    const{email,password}= req.body

    //Validar e-mail != null
    if(!email){
        return res.status(422).json({msg:'O email é obrigatório!'})

    }else if(!password){
        return res.status(422).json({msg:'O senha é obrigatório!'})}

        //Checar se existe tal usuario 
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(404).json({msg:"Usuário não encontrado"})
        }

        //Checar se a password confere

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(402).json({msg : 'Senha inválida!'})

        }

        try {
        
        res.status(201).json({msg: 'Autenticação realizada com sucesso'})

        } catch (error) {
        console.log(error)
        
        res.status(500).json({msg:'Aconteceu um erro, tente novamente mais tarde!',})
    }


})

})









