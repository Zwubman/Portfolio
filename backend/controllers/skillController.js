const { Skill } = require('../models');

// GET /api/skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({ order: [['category', 'ASC'], ['name', 'ASC']] });
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getSkills };
