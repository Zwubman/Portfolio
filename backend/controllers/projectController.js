const { Project } = require('../models');

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['order_index', 'ASC'], ['created_at', 'DESC']] });
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
    const { title, description, summary, github_url, live_url } = req.body;
    let { tags, featured, image_url, features } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    // Since FormData sends text, we might need to parse tags/featured
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch (e) { tags = tags.split(',').map(t => t.trim()); }
    }
    if (typeof features === 'string') {
      try { features = JSON.parse(features); } catch (e) { features = []; }
    }
    if (typeof featured === 'string') {
      featured = (featured === 'true');
    }

    // Handle Uploaded File
    let finalImageUrl = image_url || '';
    if (req.file) {
      finalImageUrl = req.file.path;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const project = await Project.create({
      title,
      slug,
      description: description || '',
      summary: summary || '',
      features: features || [],
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

    const { title, description, summary, github_url, live_url } = req.body;
    let { tags, featured, image_url, features } = req.body;

    if (title) {
      project.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Parse tag/featured/features string from FormData
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch (e) { tags = tags.split(',').map(t => t.trim()); }
    }
    if (typeof features === 'string') {
      try { features = JSON.parse(features); } catch (e) { features = []; }
    }
    if (typeof featured === 'string') {
      featured = (featured === 'true');
    }

    let finalImageUrl = image_url !== undefined ? image_url : project.image_url;
    
    if (req.file) {
      finalImageUrl = req.file.path;
    }

    await project.update({
      title: title || project.title,
      slug: project.slug,
      description: description !== undefined ? description : project.description,
      summary: summary !== undefined ? summary : project.summary,
      features: features !== undefined ? features : project.features,
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

// PUT /api/projects/reorder (Admin) - Bulk update order
const reorderProjects = async (req, res) => {
  try {
    const { projects } = req.body;
    
    if (!Array.isArray(projects)) {
      return res.status(400).json({ message: 'Projects array is required.' });
    }

    await Promise.all(
      projects.map(({ id, order_index }) => 
        Project.update({ order_index }, { where: { id } })
      )
    );

    const updatedProjects = await Project.findAll({ order: [['order_index', 'ASC'], ['created_at', 'DESC']] });
    res.json(updatedProjects);
  } catch (error) {
    console.error('Reorder projects error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject, reorderProjects };
