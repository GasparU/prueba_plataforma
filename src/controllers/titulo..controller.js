const catchError = require('../utils/catchError');
const Titulo = require('../models/Titulo');
const Variable = require('../models/Variable');



const getAll = catchError(async(req, res) => {
    // const {id}= req.user
    const results = await Titulo.findAll({include: [Variable]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    // const {id} = req.user
    // const {name} = req.body
    // const body = {name, userId:id}
    const result = await Titulo.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Titulo.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Titulo.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Titulo.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setVariable = catchError(async(req, res)=>{
    // 1. localizamos el titulo de la encuesta a la que le pondremos variables
    const {id} = req.params
    const titulo = await Titulo.findByPk(id)

    // seteamos las variables
    await titulo.setVariables(req.body)

    // leemos las variables
    const variables = await titulo.getVariables()
    return res.json(variables)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setVariable
}