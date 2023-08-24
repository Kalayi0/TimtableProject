// Import the Timetable model
const Timetable = require('../../models/Timetable');

// Controller function to create a new timetable entry
const createTimetableEntry = async (req, res) => {
  try {
    const { course, venue, time } = req.body;

    // Create a new timetable entry
    const timetable = await Timetable.create({
      course,
      venue,
      time
    });

    res.status(201).json({ timetable });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create timetable entry' });
  }
};


// Controller function to delete a timetable entry
const deleteTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the timetable entry by ID
    const timetable = await Timetable.findByPk(id);

    if (!timetable) {
      return res.status(404).json({ error: 'Timetable entry not found' });
    }

    // Delete the timetable entry
    await timetable.destroy();

    res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete timetable entry' });
  }
};

// Controller function to get a timetable entry by ID
const getTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the timetable entry by ID
    const timetable = await Timetable.findByPk(id);

    if (!timetable) {
      return res.status(404).json({ error: 'Timetable entry not found' });
    }

    res.status(200).json({ timetable });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get timetable entry' });
  }
};


// Export the controller functions
module.exports = {
  createTimetableEntry,
  deleteTimetableEntry,
  getTimetableEntry
};
