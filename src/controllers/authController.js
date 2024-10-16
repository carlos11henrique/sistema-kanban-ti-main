const usuarioModel = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    register: async (req, res) => {
        try {
            const userPayload = {
                nome_completo: req.body.nome_completo,
                senha: req.body.senha,
                email: req.body.email,
                instituicao: req.body.instituicao,
                ocupacao: req.body.ocupacao,
                setor_id: req.body.setor_id

            }

            const result = await usuarioModel.findByEmail(userPayload.email)

            if (result) {
                return res.status(400).json({ message: "Já existe usuario com esse endereço de email" })
            }

            const hashedPass = await bcrypt.hash(userPayload.senha,10)
            userPayload.senha = hashedPass
            await usuarioModel.create(userPayload)

            res.status(201).json({ message: "Usuario registrado com sucesso" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao registrar usuario" })
        }
    },

    login: async (req, res) => {
        try {
            const {senha,email} = req.body

            const user = await usuarioModel.findByEmail(email)
            
            if(!user){
                return res.status(404).json({message:"Não existe usuario com esse endereço de email"})
            }
    
            if(!(await bcrypt.compare(senha,user.senha))){
                return res.status(400).json({message:"Senha invalida!"})
            }


           const token =  jwt.sign({userId:user.id,ocupacao:user.ocupacao},process.env.JWT_KEY)
           res.status(200).json({token,userId:user.id,ocupacao:user.ocupacao})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Erro ao realizar login"})   
        }
    }
}


module.exports = authController