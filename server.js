const express = require('express');
const cors = require('cors');
const workItemRoutes = require('./app/routes/work-item.routes');
const projectRoutes = require('./app/routes/project.routes');
const db = require('./app/models/index');

const app = express();

db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and Resync DB");
});

const corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/workitem', workItemRoutes);
app.use('/project', projectRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});