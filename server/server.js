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
      
    const {dishname,dishcost} = req.body;

    const Dish = new dish({
           dishname,
           dishcost,
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

app.delete("/dish-delete/:id",async (req,res)=>{
    try{
          const {id} = req.params;
          const deletedish = await dish.findByIdAndDelete(id);
          if(deletedish)
          {
            res.status(201).json('deleted the dish');
          }

    }catch(err){
        res.status(400).json('an error occured',err.message);
    }
})

app.listen(5000,()=>{
    console.log('connected to port 5000')
})