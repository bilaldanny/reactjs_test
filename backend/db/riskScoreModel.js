const mongoose = require('mongoose');

const riskScoreSchema = new mongoose.Schema({
    riskScore: Number,
    nigerianStocks: Number,
    foreignStocks: Number,
    techStocks: Number,
    emergingStocks: Number,
    nigerianBonds: Number,
    foreignBonds: Number,
    commodities: Number,
    realEstate: Number,
    tBills: Number,
    alternative: Number,
  });
  
  const RiskScore = mongoose.model('RiskScore', riskScoreSchema);
  
  module.exports = RiskScore;