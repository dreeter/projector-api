const express = require('express');
const taskRoutes = require('./app/routes/task.routes');
const projectRoutes = require('./app/routes/project.routes');
const db = require('./app/models/index');
const cors = require('cors');
// const session = require('express-session');
// const SessionStore = require('express-session-sequelize')(session.Store);
// const cookieParser = require('cookie-parser');


// //create a sequelize session store using the already set up Sequelize instance
// const sequelizeSessionStore = new SessionStore({
//   db: db.sequelize
// });

//Sync sequelize ORM to DB, //TODO: force drop for prod, obviously
db.sequelize.sync({force: true}).then(()=>{
  console.log("Drop and Resync DB");
});

const app = express();

app.use(cors( {
  origin: 'http://localhost:4200',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
} ));

app.use((req, res, next) => {

  console.log("This middleware being called");

  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});
  
// app.use(cookieParser);
// app.use(session({
//   secret: 'Keep it secret, Keep it safe',
//   store: sequelizeSessionStore,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: false,
//     maxAge: 1000 * 60 * 60 * 24,
//   }
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});