const Program = require('../models/Program');

// GET /api/programs
// GET /api/programs?type=major
// returns all programs for the dropdowns, optionally filtered by type
const getPrograms = (req, res) => {
  try {
    const { type } = req.query;
    const programs = type ? Program.findByType(type) : Program.findAll();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/programs/compare?first=Computer Science - Cybersecurity&second=Electrical Engineering
// this is the one the compare page actually calls after both dropdowns are selected
const comparePrograms = (req, res) => {
  try {
    const { first, second } = req.query;

    if (!first || !second) {
      return res.status(400).json({ error: 'Both ?first= and ?second= params are required' });
    }

    const result = Program.compare(first, second);
    res.json(result);
  } catch (err) {
    // most likely a "Program not found" error from a bad dropdown value
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getPrograms, comparePrograms };
