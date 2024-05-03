const Pregunta = require("./Pregunta");
const Titulo = require("./Titulo");
const User = require("./User");
const Variable = require("./Variable");

// relacion de muchos a muchos. Varios usuarios crean varias encuestas
User.belongsToMany(Titulo,{through: "usersTitulos"})
Titulo.belongsToMany(User,{through: "usersTitulos"})

// relacion de muchos a muchos. Encuestas crean variables
Titulo.belongsToMany(Variable, {through: "titulosVariables"})
Variable.belongsToMany(Titulo, {through: "titulosVariables"})

// Relacion de uno a muchos. Variables pueden tener varias preguntas
Pregunta.belongsTo(Variable)  //variableId
Variable.hasMany(Pregunta)