// routes/auth.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
router.get('/login', (req, res) => {
res.render('./admin/login');
});
router.get('/register', (req, res) => {
res.render('./admin/singup');
})
router.post('/register', (req, res) => {
Usuario.create({
username: req.body.username,
email: req.body.email,
senha: req.body.senha
}).then(() => {
res.redirect("/auth/login");
}).catch((erro) => {
res.send('Houve um erro: ' + erro);
});
});
router.post('/login', async (req, res) => {
const { username, senha } = req.body;
try {
const usuario = await Usuario.findOne({ where: { username } });
if (usuario && usuario.senha === senha) {
req.session.usuario = usuario;
const returnTo = req.session.returnTo || '/';
delete req.session.returnTo;
res.redirect(returnTo);
} else {
res.render('./admin/login', { error: 'Credenciais inválidas' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Erro ao autenticar usuário' });
}
});
module.exports = router;