const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import path module
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for the student data
const studentSchema = new mongoose.Schema({
    rollno: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true }
});

// Create a model for the student data
const Student = mongoose.model('Student', studentSchema);

// Route to handle POST request to /submit
app.post('/submit', async (req, res) => {
    const { rollno, name, email, contact, address } = req.body;

    try {
        // Save data to MongoDB
        const newStudent = new Student({ rollno, name, email, contact, address });
        await newStudent.save();

        console.log(`Data saved: Rollno - ${rollno}, Name - ${name}, Email - ${email}, Contact - ${contact}, Address - ${address}`);
        res.json({ message: 'Data saved successfully!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Route to retrieve all form data
app.get('/data', async (req, res) => {
    try {
        // Fetch all data from MongoDB
        const allData = await Student.find();
        res.json(allData);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: 'Error retrieving data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Route to fetch student data by roll number
app.get('/student/:rollno', async (req, res) => {
    const { rollno } = req.params;

    try {
        const studentData = await Student.findOne({ rollno }); // Use the correct model name
        if (!studentData) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(studentData);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Error fetching data' });
    }
});























// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define a schema for the student data
// const studentSchema = new mongoose.Schema({
//     rollno: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     contact: { type: String, required: true },
//     address: { type: String, required: true }
// });

// // Create a model for the student data
// const Student = mongoose.model('Student', studentSchema);

// // Route to handle POST request to /submit
// app.post('/submit', async (req, res) => {
//     const { rollno, name, email, contact, address } = req.body;

//     try {
//         // Save data to MongoDB
//         const newStudent = new Student({ rollno, name, email, contact, address });
//         await newStudent.save();

//         console.log(`Data saved: Rollno - ${rollno}, Name - ${name}, Email - ${email}, Contact - ${contact}, Address - ${address}`);
//         res.json({ message: 'Data saved successfully!' });
//     } catch (err) {
//         console.error('Error saving data:', err);
//         res.status(500).json({ message: 'Error saving data' });
//     }
// });

// // Route to retrieve all form data
// app.get('/data', async (req, res) => {
//     try {
//         // Fetch all data from MongoDB
//         const allData = await Student.find();
//         res.json(allData);
//     } catch (err) {
//         console.error('Error retrieving data:', err);
//         res.status(500).json({ message: 'Error retrieving data' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });




















// // Define a schema for the data (Updated)
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// // Connect to MongoDB (removed deprecated options)
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));


// const studentportal = new mongoose.Schema({
//     rollno: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     contact: { type: String, required: true },
//     address: { type: String, required: true }
// });

// // Route to handle POST request to /submit
// app.post('/submit', async (req, res) => {
//     const { rollno, name, email, contact, address } = req.body;

//     try {
//         // Save data to MongoDB
//         const newFormData = new FormData({ rollno, name, email, contact, address });
//         await newFormData.save();

//         console.log(`Data saved: Rollno - ${rollno}, Name - ${name}, Email - ${email}, Contact - ${contact}, Address - ${address}`);
//         res.json({ message: 'Data saved successfully!' });
//     } catch (err) {
//         console.error('Error saving data:', err);
//         res.status(500).json({ message: 'Error saving data' });
//     }
// });


// // Route to update data by ID
// app.put('/update/:id', async (req, res) => {
//     const { rollno, name, email, contact, address } = req.body;
//     const { id } = req.params;

//     try {
//         const updatedData = await FormData.findByIdAndUpdate(id, { rollno, name, email, contact, address }, { new: true });
//         if (!updatedData) {
//             return res.status(404).json({ message: 'Data not found' });
//         }
//         console.log(`Data updated: Rollno - ${updatedData.rollno}, Name - ${updatedData.name}, Email - ${updatedData.email}, Contact - ${updatedData.contact}, Address - ${updatedData.address}`);
//         res.json({ message: 'Data updated successfully!' });
//     } catch (err) {
//         console.error('Error updating data:', err);
//         res.status(500).json({ message: 'Error updating data' });
//     }
// });


// // Route to retrieve all form data
// app.get('/data', async (req, res) => {
//     try {
//         // Fetch all data from MongoDB
//         const allData = await FormData.find();
//         res.json(allData);
//     } catch (err) {
//         console.error('Error retrieving data:', err);
//         res.status(500).json({ message: 'Error retrieving data' });
//     }
// });


// // Route to delete data by ID
// app.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedData = await FormData.findByIdAndDelete(id);
//         if (!deletedData) {
//             return res.status(404).json({ message: 'Data not found' });
//         }
//         console.log(`Data deleted: Rollno - ${deletedData.rollno}, Name - ${deletedData.name}, Email - ${deletedData.email}, Contact - ${deletedData.contact}, Address - ${deletedData.address}`);
//         res.json({ message: 'Data deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting data:', err);
//         res.status(500).json({ message: 'Error deleting data' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });





















// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const app = express();
// const port = 3000;

// // JWT secret key (in real projects, use environment variables)
// const JWT_SECRET = 'mysecretkey';

// // Middleware to parse JSON and form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB (removed deprecated options)
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define a schema for the user
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// // Create a model for the user
// const User = mongoose.model('User', userSchema);

// // Middleware to authenticate JWT
// function authenticateToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

// // Define a schema for the data
// const formDataSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// // Create a model
// const FormData = mongoose.model('FormData', formDataSchema);

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// // Route to handle POST request to /submit
// app.post('/submit', async (req, res) => {
//     const { name, email } = req.body;

//     try {
//         // Save data to MongoDB
//         const newFormData = new FormData({ name, email });
//         await newFormData.save();

//         console.log(`Data saved: Name - ${name}, Email - ${email}`);
//         res.json({ message: 'Data saved successfully!' });
//     } catch (err) {
//         console.error('Error saving data:', err);
//         res.status(500).json({ message: 'Error saving data' });
//     }
// });

// // Route to retrieve all form data
// app.get('/data', async (req, res) => {
//     try {
//         // Fetch all data from MongoDB
//         const allData = await FormData.find();
//         res.json(allData);
//     } catch (err) {
//         console.error('Error retrieving data:', err);
//         res.status(500).json({ message: 'Error retrieving data' });
//     }
// });

// // Route to update data by ID
// app.put('/update/:id', async (req, res) => {
//     const { name, email } = req.body;
//     const { id } = req.params;

//     try {
//         const updatedData = await FormData.findByIdAndUpdate(id, { name, email }, { new: true });
//         if (!updatedData) {
//             return res.status(404).json({ message: 'Data not found' });
//         }
//         console.log(`Data updated: Name - ${updatedData.name}, Email - ${updatedData.email}`);
//         res.json({ message: 'Data updated successfully!' });
//     } catch (err) {
//         console.error('Error updating data:', err);
//         res.status(500).json({ message: 'Error updating data' });
//     }
// });

// // Route to delete data by ID
// app.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedData = await FormData.findByIdAndDelete(id);
//         if (!deletedData) {
//             return res.status(404).json({ message: 'Data not found' });
//         }
//         console.log(`Data deleted: Name - ${deletedData.name}, Email - ${deletedData.email}`);
//         res.json({ message: 'Data deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting data:', err);
//         res.status(500).json({ message: 'Error deleting data' });
//     }
// });

// // Route to handle user registration
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Check if the username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already taken' });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.json({ message: 'User registered successfully!' });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).json({ message: 'Error registering user' });
//     }
// });

// // Route to handle user login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid username or password' });
//         }

//         // Compare the hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid username or password' });
//         }

//         // Generate JWT
//         const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ message: 'Login successful', token });
//     } catch (err) {
//         console.error('Error logging in:', err);
//         res.status(500).json({ message: 'Error logging in' });
//     }
// });

// // Protected route (requires authentication)
// app.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// });

// // Handle 404 for unknown routes
// app.use((req, res) => {
//     res.status(404).send('404 Not Found');
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });