const db = require('./db');
const Usuario = db.sequelize.define('usuario', {
id_usuario: {
type: db.Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
username: {
type: db.Sequelize.TEXT
},
email: {
type: db.Sequelize.TEXT
},
senha: {
type: db.Sequelize.TEXT
}
//freezeTableName: true define
//o nome da tabela sem o S
}, { freezeTableName: true });
module.exports = Usuario;