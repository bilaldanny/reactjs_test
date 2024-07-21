const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');
const RiskScore = require('./db/riskScoreModel');

mongoose.connect('mongodb+srv://bilalyounus1974:J1QNheSwfAKPQNjA@optimummediatest.vyei4at.mongodb.net/?retryWrites=true&w=majority&appName=OptimummediaTest');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', async (req, res) => {
    res.send('hello')
})

app.get('/get_data', async (req, res) => {
    try {
        const value = req.body.value;
        
        // Find data in MongoDB
        const data = await RiskScore.findOne({ riskScore: value }).select('-_id nigerianStocks foreignStocks techStocks emergingStocks nigerianBonds foreignBonds commodities realEstate tBills alternative');
    
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.post('/get_data', async (req, res) => {
    try {
        const value = req.body.value;
        
        // Find data in MongoDB
        const data = await RiskScore.findOne({ riskScore: value }).select('-_id nigerianStocks foreignStocks techStocks emergingStocks nigerianBonds foreignBonds commodities realEstate tBills alternative');
    
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})