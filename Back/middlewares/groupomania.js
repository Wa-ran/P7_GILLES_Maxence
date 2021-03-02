const mysqlx = require('@mysql/xdevapi');
const config = {
    password: 'pass',
    user: 'root',
    host: '127.0.0.1',
    port: 33060,
    schema: 'groupomania'
};

exports.db = mysqlx.getSession(config)
.then(function (s) {
  session = s;
  session.sql('USE groupomania').execute();
})
.catch((error) => {
  console.error(error);
});
