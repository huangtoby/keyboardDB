const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/getRec', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getTopPicks();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/search/:name', (req, res) => {
    const { name } = req.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.searchName(name);

    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));   
})

app.get('/searchfilter/:name/:mech/:mac', (req, res) => {
    const { name,mech,mac } = req.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.searchFilter(name,mech,mac);

    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));   
})

app.get('/retailers/:name', (req, res) => {
    const { name } = req.params;
    const db = dbService.getDbServiceInstance();
     
    const result = db.findRetail(name);

    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));   
})

app.get('/filter/:mech/:mac', (req, res) => {
    const { mech,mac } = req.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.filterTable(mech,mac);
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));   
})



app.listen(process.env.PORT, () => console.log('app start'));