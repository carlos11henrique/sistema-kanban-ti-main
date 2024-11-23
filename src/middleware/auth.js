const jwt = require('jsonwebtoken')
const userModel = require('../models/usuariosModel')


const ROLES = {
    ESTUDANDE:"ESTUDANTE",
    DOCENTE:"DOCENTE",
    NOA:"NOA",
    MANUTENCAO:"MANUTENCAO",
    TI:"TI",
    ESTAGIARIO:"ESTAGIARIO", //  nem gente é
    FUNCIONARIOS:"FUNCIONARIOS"
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {*} res 
 * @param {*} next 
 */
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.includes('Bearer')) {
        return res.status(400).json({ message: "É necessario enviar o token" })
    }

    try {
        const token = authHeader.split(' ')[1]
        const payloadToken = jwt.verify(token, process.env.JWT_KEY)
        req.userId = payloadToken.userId
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Token invalido" })
    }
}

/**
 * Função de autorização que verifica se um usuário tem permissão com base em um conjunto de roles.
 *
 * @param {Array<keyof typeof ROLES>} roles - Um array de roles permitidos, com base nos valores definidos em `ROLES`.
 */

const authorize = (roles) => {

    return async (req, res, next) => {
        const { userId } = req

        const userFound = await userModel.getById(userId)

        if (!userFound || !roles.includes(userFound.ocupacao)) {
            return res.status(400).json({ message: "Você não tem autorização para acessar este recurso" })
        }
        next()
    }
}


module.exports = {
    verify,
    authorize,ROLES
}