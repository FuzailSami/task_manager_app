const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Task Manager API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
