
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;


// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        // 'https://medicare-2059.web.app',
        // 'https://medicare-2059.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());





app.get('/', (req, res) => {
    res.send('BestDeal is running')
})

app.listen(port, () => {
    console.log(`BestDeal is sitting on port ${port}`);
})





