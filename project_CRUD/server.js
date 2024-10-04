const express = require('express'); 
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());

dotenv.config();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})