const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dish = require('./schema/dish');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb://localhost:27017/test');

app.get('/',(req,res)=>
{
    res.json('hello')
})

app.post('/disher', async (req,res) =>{
      
    const {dishname} = req.body;

    const Dish = new dish({
           dishname,
    })

    try{
        const saveddish = await Dish.save();
        res.status(201).json(saveddish);
    }catch(err)
    {
        res.status(400).json('error saving dish',err.message);
    }

});

app.get('/dash-get',async (req,res)=>{

    try{

        const form = await dish.find();
        res.json(form);

    }catch(err)
    {
        res.status(400).json('an error occured',err.message);
    }
});

app.listen(5000,()=>{
    console.log('connected to port 5000')
})