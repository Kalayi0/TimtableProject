const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

/// Routes
app.post('/generate-timetable', generateTimetableHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});