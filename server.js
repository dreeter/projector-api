const express = require('express');
const taskRoutes = require('./app/routes/task.routes');
const projectRoutes = require('./app/routes/project.routes');
const userRoutes = require('./app/routes/user.routes');
const authRoutes = require('./app/routes/auth.routes');
const authJwt = require('./app/middleware/authJwt.middleware');
const db = require('./app/models/index');
const cors = require('cors');

//Sync sequelize ORM to DB, //TODO: force drop for prod, obviously
db.sequelize.sync({force: true}).then(()=>{
  console.log("Drop and Resync DB");
  initialize();
});

const Role = db.role;
function initialize() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

const app = express();

//Cross-Origin-Resource Sharing. Allow port 4200 access
const corsOptions = {
  origin: 'http://localhost:4200',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  credentials: 'true'
}
app.use(cors(corsOptions));



app.use( async (req, res, next) => {

  //temporary - test loading spinner
  await new Promise(resolve => setTimeout(resolve, 500));

  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});


// parse requests of content-type - application/json
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Use routes, all routes beneath /auth must be authenticated
app.use('/auth', authRoutes);
app.use(authJwt.verifyToken)
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);
app.use('/user', userRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});