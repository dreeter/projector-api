const express = require('express');
const taskRoutes = require('./app/routes/task.routes');
const projectRoutes = require('./app/routes/project.routes');
const userRoutes = require('./app/routes/user.routes');
const authRoutes = require('./app/routes/auth.routes');
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
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
// app.use(cors());

// app.use(cors( {
//   origin: 'http://localhost:4200',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// } ));

// app.use( async (req, res, next) => {

//   //temporary - test loading spinner
//   await new Promise(resolve => setTimeout(resolve, 200));

//   console.log("This middleware being called");

//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

//   if ('OPTIONS' === req.method) {
//     res.sendStatus(200);
//   } else {
//     console.log(`${req.ip} ${req.method} ${req.url}`);
//     next();
//   }
// });

function loggingMiddleware(req, res, next) {
  console.log("The request");
  console.log(req);
  console.log("The request body");
  console.log(req.body);
  next();
}


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});