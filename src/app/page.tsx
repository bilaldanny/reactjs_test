'use client'

import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';

export default function Home() {

  const [ value, setValue ] = useState(0);
  const [ riskdata, setRiskData ] = useState([]);

  const number_format = (numbervalue) => {
    const parsedValue = parseFloat(numbervalue);
    if (Number.isInteger(parsedValue)) {
      return parsedValue.toFixed(1);
    } else {
      return parsedValue;
    }
  }

  const handleChange = async (event) => {
    const newValue = event ? event.target.value : value;
    setValue(newValue);

    try {
      // Make the request to your Node.js server
      const response = await axios.post('https://reactjs-test-server.vercel.app/get_data', { value: newValue });
      const array = Object.entries(response.data).map(([key, value]) => ({ key, value }));
      setRiskData(array);
      await console.log(array);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  const handleChange1 = async () => {
    const newValue = value;
    setValue(newValue);

    try {
      // Make the request to your Node.js server
      const response = await axios.post('https://reactjs-test-server.vercel.app/get_data', { value: newValue });
      const array = Object.entries(response.data).map(([key, value]) => ({ key, value }));
      setRiskData(array);
      await console.log(array);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  const keyMappings = {
    nigerianStocks: { text: 'US Stocks', color: 'rgb(35, 11, 89)' },
    foreignStocks: { text: 'Foreign Stocks', color: 'rgb(72, 64, 187)' },
    techStocks: { text: 'Emerging Markets', color: 'rgb(77, 88, 152)' },
    emergingStocks: { text: 'Dividend Stocks', color: 'rgb(112, 134, 201)' },
    nigerianBonds: { text: 'Municipal Bonds', color: 'rgb(189, 198, 245)' },
    foreignBonds: { text: 'US Bonds', color: 'rgb(173, 96, 53)' },
    commodities: { text: 'Corporate Bonds', color: 'rgb(223, 140, 94)' },
    realEstate: { text: 'TIPS', color: 'rgb(254, 208, 185)' },
    tBills: { text: 'Real Estate', color: 'rgb(35, 11, 89)' },
    alternative: { text: 'Emerging Markets Bonds', color: 'rgb(72, 64, 187)' }
  };

  useEffect(() => {
    handleChange1(); // Call without event to use default value
  }, []);

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-8">
          <div className="position-relative d-flex w-100 align-items-center justify-content-center bg-eggplant bp">
            <div className="position-absolute top-0 start-0 end-0 d-flex justify-content-center translate-middle-y">
              <div className="custom-flex-item">
                <div className="custom-card">
                  <div className="child-element">
                    <div className="d-flex justify-content-between">
                      <div className="copy-body fw-bold">Risk score: {number_format(value)}</div>
                      <div className="copy-body-sm">Example portfolio</div>
                    </div>
                      <RangeSlider
                        className="slider"
                        value={value}
                        min={0}
                        max={10}
                        size="lg"
                        variant="danger"
                        onChange={handleChange}
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-100 max-w-683px'>
              { riskdata.length }
            {riskdata.length > 0 && riskdata.map((item, index) => (
              <div className='row' key={index}>
                <div className='col-5 col-md-4 d-flex align-items-center pe-4'>
                  <span className='text-truncate text-white'>
                    {keyMappings[item.key]['text'] || item.key}
                  </span>
                </div>
                <div className='col-7 col-md-8'>
                  <div 
                    className="customrange-element border px-4 py-2 text-white" 
                    style={{width: `calc(${item.value / 100} / 0.35 * 100%)`,backgroundColor: `${keyMappings[item.key]['color'] || 'rgb(35, 11, 89)'}`}}>
                    {item.value}%
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
}
