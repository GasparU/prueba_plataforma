const catchError = require("../utils/catchError");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Titulo = require("../models/Titulo");

const getAll = catchError(async (req, res) => {
  const result = await User.findAll({include: [Titulo]});
  return res.json(result);
});

const create = catchError(async (req, res) => {
  const { firstName, lastName, email, password, rol } = req.body;
  // 1. Si no ingresa campos de email o password
  if (!email || !password)
    return res.status(404).json({ message: "Email y password son requeridos" });

  const hashPassword = await bcrypt.hash(password, 10);
  // 2. Si ya existe usuario registrado, evitar crear duplicado
  const duplicado = await User.findOne({ where: { email } });

  if (duplicado) return res.status(404).json({ message: "Usuario ya existe" });

  // 3. Si no hay ningún usuario, puede crear uno por defecto
  const newUser = await User.findAll();

  const body = { firstName, lastName, email, password: hashPassword, rol };

  if (
    newUser.map((usr) => usr.rol).filter((ase) => ase === "superadmin").length >
      0 &&
    rol === "superadmin"
  )
    return res.json({ message: "No se puede crear mas superadmin" });
  
  if(rol==="user") return res.json({message: "No tienes permisos para crear usuarios"})
  const result = await User.create(body);
  console.log(newUser.map((us) => us.rol));

  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.status(404);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const body = { firstName, lastName };
  const result = await User.update(body, { where: { id }, returning: true });
  if (!result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setTitulo = catchError(async(req, res)=>{
  // 1. localizamos al usuario al que se le quiere poner los titulos
  const {id} = req.params
  const user = await User.findByPk(id)

  // 2. Setear los titulos
  await user.setTitulos(req.body)

  // 3. leer los titulos seteados
  const titulos = await user.getTitulos()
  return res.json(titulos)

})

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ message: "Email y password son requeridos" });
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "Credenciales invalidas" });
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword)
    return res.status(404).json({ message: "Credenciales invalidas" });

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ user, token });
});

const logget = catchError(async (req, res) => {
  // --> "users/me"
  const user = req.user;

  return res.json(user);
});



module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
  logget,
  setTitulo
};
