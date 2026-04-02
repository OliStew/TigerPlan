const express = require('express');
const cors    = require('cors');

const programRoutes = require('./routes/programs');
const courseRoutes  = require('./routes/courses');

const app = express();

app.use(cors());
app.use(express.json());

// all program and course routes live under /api
app.use('/api/programs', programRoutes);
app.use('/api/courses',  courseRoutes);

// quick sanity check — hit this to make sure the server is running
app.get('/', (req, res) => {
  res.json({ message: 'TigerPlan API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});