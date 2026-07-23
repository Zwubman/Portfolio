const { Experience } = require('../models');

// GET /api/experiences
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll({ order: [['order_index', 'ASC']] });
    res.json(experiences);
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/experiences (Admin)
const createExperience = async (req, res) => {
  try {
    const { company, role, location_type, start_date, end_date, bullet_points, order_index } = req.body;

    if (!company || !role || !start_date) {
      return res.status(400).json({ message: 'Company, role, and start date are required.' });
    }

    const experience = await Experience.create({
      company,
      role,
      location_type: location_type || 'Remote',
      start_date,
      end_date,
      bullet_points: bullet_points || [],
      order_index: order_index || 0,
    });

    res.status(201).json(experience);
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/experiences/:id (Admin)
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found.' });

    const { company, role, location_type, start_date, end_date, bullet_points, order_index } = req.body;

    await experience.update({
      company: company || experience.company,
      role: role || experience.role,
      location_type: location_type || experience.location_type,
      start_date: start_date || experience.start_date,
      end_date: end_date !== undefined ? end_date : experience.end_date,
      bullet_points: bullet_points || experience.bullet_points,
      order_index: order_index !== undefined ? order_index : experience.order_index,
    });

    res.json(experience);
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/experiences/:id (Admin)
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found.' });

    await experience.destroy();
    res.json({ message: 'Experience deleted successfully.' });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
