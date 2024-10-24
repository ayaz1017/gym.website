const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // Your MySQL host
    user: 'root',      // Your MySQL username
    password: 'W7301@jqir#',      // Your MySQL password
    database: 'gym_managements' // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Add Customer
app.post('/addCustomer', (req, res) => {
    const { cust_id, name, age, gender, mobile_no, address, blood_group } = req.body;
    const query = 'INSERT INTO customers (cust_id, name, age, gender, mobile_no, address, blood_group) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [cust_id, name, age, gender, mobile_no, address, blood_group], (err, result) => {
        if (err) {
            console.error('Error adding customer:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).json({ message: 'Customer added successfully', id: result.insertId });
    });
});

// Update Customer
app.post('/updateCustomer', (req, res) => {
    const { updatePid, updatePname, updateAge, updateGender, updateMob, updateAddress, updateblood } = req.body;
    const query = 'UPDATE customers SET name = ?, age = ?, gender = ?, mobile_no = ?, address = ?, blood_group = ? WHERE cust_id = ?';
    
    db.query(query, [updatePname, updateAge, updateGender, updateMob, updateAddress, updateblood, updatePid], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    });
});

// Get All Customers
app.get('/customers', (req, res) => {
    const query = 'SELECT * FROM customers';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving customers:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).json(results);
    });
});

// Search Customer
app.get('/customers/:cust_id', (req, res) => {
    const cust_id = req.params.cust_id;
    const query = 'SELECT * FROM customers WHERE cust_id = ?';
    
    db.query(query, [cust_id], (err, results) => {
        if (err) {
            console.error('Error retrieving customer:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Customer not found');
        }
        res.status(200).json(results[0]);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
