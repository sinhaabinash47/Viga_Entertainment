const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const pricingRoutes = require('./routes/route');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use('/api/pricing', pricingRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});



