const app = require('./app');
const port = process.env.PORT || 3000;

const listen = () => {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

listen();
