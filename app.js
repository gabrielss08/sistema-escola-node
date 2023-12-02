const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const verificarAutenticacao = require('./middleware/verificarAutenticacao'); 

const app = express();
const rota_turma = require('./routes/rota_turma');
const rota_aluno = require('./routes/rota_aluno');
const rota_auth = require('./routes/rota_auth');

app.use(session({
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Rota principal
app.get('/', (req, res) => {
  res.render('home');
});

// Aplicando o middleware verificarAutenticacao nas rotas que requerem autenticação
app.use('/rota_turma', verificarAutenticacao, rota_turma);
app.use('/rota_aluno', verificarAutenticacao, rota_aluno);
app.use('/auth', rota_auth);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send('Logout bem-sucedido!');
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor Rodando na porta ${PORT}`);
});