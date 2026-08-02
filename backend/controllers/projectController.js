const { Project } = require('../models');

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['created_at', 'DESC']] });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/projects (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, github_url, live_url } = req.body;
    let { tags, featured, image_url } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    // Since FormData sends text, we might need to parse tags/featured
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch (e) { tags = tags.split(',').map(t => t.trim()); }
    }
    if (typeof featured === 'string') {
      featured = (featured === 'true');
    }

    // Handle Uploaded File
    let finalImageUrl = image_url || '';
    if (req.file) {
      finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const project = await Project.create({
      title,
      slug,
      description,
      image_url: finalImageUrl,
      tags: tags || [],
      github_url,
      live_url,
      featured: featured || false,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/projects/:id (Admin)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    const { title, description, github_url, live_url } = req.body;
    let { tags, featured, image_url } = req.body;

    if (title) {
      project.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Parse tag/featured string from FormData
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch (e) { tags = tags.split(',').map(t => t.trim()); }
    }
    if (typeof featured === 'string') {
      featured = (featured === 'true');
    }

    let finalImageUrl = image_url !== undefined ? image_url : project.image_url;
    
    if (req.file) {
      // Dynamic absolute URL based on host
      finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    await project.update({
      title: title || project.title,
      slug: project.slug,
      description: description || project.description,
      image_url: finalImageUrl,
      tags: tags || project.tags,
      github_url: github_url !== undefined ? github_url : project.github_url,
      live_url: live_url !== undefined ? live_url : project.live_url,
      featured: featured !== undefined ? featured : project.featured,
    });

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/projects/:id (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    await project.destroy();
    res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
