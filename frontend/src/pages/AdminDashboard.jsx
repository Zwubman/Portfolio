import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '../store/services/projectsApi';
import {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from '../store/services/experiencesApi';
import {
  useGetMessagesQuery,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} from '../store/services/contactApi';
import {
  FolderKanban, Briefcase, Mail, LogOut, ArrowLeft, Plus,
  Trash2, Edit, Check, Eye, Trash, ExternalLink, Calendar,
  MapPin, ToggleLeft, ToggleRight, Sparkles, Send, X, Code2,
  FileText, UploadCloud
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Queries
  const { data: projects = [], isLoading: loadingProjects } = useGetProjectsQuery();
  const { data: experiences = [], isLoading: loadingExperiences } = useGetExperiencesQuery();
  const { data: messages = [], isLoading: loadingMessages } = useGetMessagesQuery();

  // Mutations
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [markMessageAsRead] = useMarkAsReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    id: null,
    title: '',
    description: '',
    image_url: '',
    imageFile: null,
    tags: '',
    github_url: '',
    live_url: '',
    featured: false,
  });
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Experience Form State
  const [experienceForm, setExperienceForm] = useState({
    id: null,
    company: '',
    role: '',
    location_type: 'Remote',
    start_date: '',
    end_date: '',
    bullet_points: [''],
    order_index: 0,
  });
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully.');
  };

  // --- Project Handlers ---
  const openProjectCreate = () => {
    setProjectForm({
      id: null,
      title: '',
      description: '',
      image_url: '',
      imageFile: null,
      tags: '',
      github_url: '',
      live_url: '',
      featured: false,
    });
    setIsEditingProject(false);
    setShowProjectModal(true);
  };

  const openProjectEdit = (proj) => {
    setProjectForm({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      image_url: proj.image_url || '',
      imageFile: null,
      tags: (proj.tags || []).join(', '),
      github_url: proj.github_url || '',
      live_url: proj.live_url || '',
      featured: proj.featured || false,
    });
    setIsEditingProject(true);
    setShowProjectModal(true);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    
    // Convert comma tags to array string
    const tagArray = projectForm.tags ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    formData.append('tags', JSON.stringify(tagArray));
    
    formData.append('github_url', projectForm.github_url || '');
    formData.append('live_url', projectForm.live_url || '');
    formData.append('featured', projectForm.featured.toString());
    
    if (projectForm.imageFile) {
      formData.append('image', projectForm.imageFile);
    } else if (projectForm.image_url) {
      formData.append('image_url', projectForm.image_url);
    }

    try {
      if (isEditingProject) {
        formData.append('id', projectForm.id); // In case we need it, though ID goes in URL via RTK
        const uploadPayload = { id: projectForm.id, ...Object.fromEntries(formData) };
        // Wait, RTK Query body can safely accept formData itself for mutations where body=formData
        // To correctly route the ID and FormData in RTK: 
        await updateProject({ id: projectForm.id, body: formData }).unwrap();
        toast.success('Project updated successfully.');
      } else {
        await createProject(formData).unwrap();
        toast.success('Project created successfully.');
      }
      setShowProjectModal(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        toast.success('Project deleted successfully.');
      } catch (err) {
        toast.error('Failed to delete project.');
      }
    }
  };

  // --- Experience Handlers ---
  const openExperienceCreate = () => {
    setExperienceForm({
      id: null,
      company: '',
      role: '',
      location_type: 'Remote',
      start_date: '',
      end_date: '',
      bullet_points: [''],
      order_index: (experiences.length ? Math.max(...experiences.map(e => e.order_index || 0)) + 1 : 1),
    });
    setIsEditingExperience(false);
    setShowExperienceModal(true);
  };

  const openExperienceEdit = (exp) => {
    setExperienceForm({
      id: exp.id,
      company: exp.company,
      role: exp.role,
      location_type: exp.location_type || 'Remote',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      bullet_points: exp.bullet_points && exp.bullet_points.length ? [...exp.bullet_points] : [''],
      order_index: exp.order_index || 0,
    });
    setIsEditingExperience(true);
    setShowExperienceModal(true);
  };

  const addExperienceBullet = () => {
    setExperienceForm((prev) => ({
      ...prev,
      bullet_points: [...prev.bullet_points, ''],
    }));
  };

  const removeExperienceBullet = (idx) => {
    setExperienceForm((prev) => ({
      ...prev,
      bullet_points: prev.bullet_points.filter((_, i) => i !== idx),
    }));
  };

  const updateExperienceBullet = (idx, value) => {
    const fresh = [...experienceForm.bullet_points];
    fresh[idx] = value;
    setExperienceForm((prev) => ({
      ...prev,
      bullet_points: fresh,
    }));
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    const payload = {
      ...experienceForm,
      bullet_points: experienceForm.bullet_points.filter(Boolean),
    };

    try {
      if (isEditingExperience) {
        await updateExperience(payload).unwrap();
        toast.success('Experience updated successfully.');
      } else {
        await createExperience(payload).unwrap();
        toast.success('Experience created successfully.');
      }
      setShowExperienceModal(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save experience.');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      try {
        await deleteExperience(id).unwrap();
        toast.success('Experience listing deleted.');
      } catch (err) {
        toast.error('Failed to delete experience.');
      }
    }
  };

  // --- Message Handlers ---
  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id).unwrap();
      toast.success('Message marked as read.');
    } catch (err) {
      toast.error('Failed to mark read.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (confirm('Delete this message?')) {
      try {
        await deleteMessage(id).unwrap();
        toast.success('Message deleted.');
      } catch (err) {
        toast.error('Failed to delete message.');
      }
    }
  };

  return (
    <div className="bg-[#0E0B24] min-h-screen text-purple-100 flex flex-col md:flex-row selection:bg-purple-500/30 selection:text-white font-sans overflow-hidden">
      
      {/* ─── SIDEBAR (Left Edge) ─── */}
      <aside className="w-full md:w-64 shrink-0 bg-[#0E0B24] border-r border-purple-500/10 md:h-screen flex flex-col">
        {/* App Title area */}
        <div className="h-16 flex items-center px-6 border-b border-purple-500/10 shrink-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Admin Panel
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          <h2 className="text-[10px] font-bold text-purple-300/40 uppercase tracking-[0.2em] mb-2 px-2">Menu</h2>
          {[
            { id: 'projects', label: 'Projects', icon: FolderKanban },
            { id: 'experiences', label: 'Experience', icon: Briefcase },
            { id: 'messages', label: 'Messages', icon: Mail },
            { id: 'resume', label: 'Resume / CV', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const count = tab.id === 'messages' ? messages.filter((m) => !m.is_read).length : 0;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-500/15 text-purple-100 shadow-[0_0_15px_rgba(124,58,237,0.1)]'
                    : 'text-purple-300/60 hover:text-purple-200 hover:bg-purple-500/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={activeTab === tab.id ? "text-purple-400" : "text-purple-300/50"} />
                  {tab.label}
                </div>
                {count > 0 && (
                  <span className="w-6 h-6 rounded-full bg-fuchsia-600 text-white text-[11px] flex items-center justify-center font-bold shadow-[0_0_10px_purple]">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* User / Bottom area */}
        <div className="p-4 border-t border-purple-500/10 shrink-0">
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-3 flex items-center justify-between">
            <div className="overflow-hidden">
              <p className="text-[10px] text-purple-300/50 font-semibold uppercase tracking-wider mb-0.5">Logged In</p>
              <p className="text-xs text-purple-200 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 flex flex-col min-w-0 md:h-screen overflow-hidden bg-[#0A081A]">
        {/* Top Header */}
        <header className="h-16 shrink-0 border-b border-purple-500/10 bg-[#0E0B24]/80 backdrop-blur-xl flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={14} /> View Live Site
            </Link>
          </div>
        </header>

        {/* Scrollable Content Workspace */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">

        {/* --- PROJECTS MANAGEMENT TAB --- */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-purple-100">Manage Projects</h2>
              <button
                onClick={openProjectCreate}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>

            {loadingProjects ? (
              <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-purple-500/10 rounded-2xl">
                <p className="text-purple-300/40">No projects added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl border border-purple-500/10 bg-purple-500/5 p-4 flex flex-col justify-between"
                  >
                    <div>
                      {proj.image_url ? (
                        <img
                          src={proj.image_url}
                          alt={proj.title}
                          className="w-full h-36 object-cover rounded-xl mb-4 border border-purple-500/10"
                        />
                      ) : (
                        <div className="w-full h-36 bg-purple-950/40 rounded-xl mb-4 flex items-center justify-center border border-purple-500/5 text-purple-300/20 text-xs">
                          No Image Link
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-purple-100 mb-1 line-clamp-1">{proj.title}</h3>
                        {proj.featured && (
                          <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-purple-300/50 text-xs line-clamp-3 mb-4">{proj.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
                      <div className="flex gap-2">
                        {proj.github_url && (
                          <a
                            href={proj.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-300 hover:text-white"
                          >
                            <Code2 size={16} />
                          </a>
                        )}
                        {proj.live_url && (
                          <a
                            href={proj.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-300 hover:text-white"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openProjectEdit(proj)}
                          className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-500/10 cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- EXPERIENCE TIMELINE TAB --- */}
        {activeTab === 'experiences' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-purple-100">Manage Experience Timeline</h2>
              <button
                onClick={openExperienceCreate}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
              >
                <Plus size={16} /> Add Position
              </button>
            </div>

            {loadingExperiences ? (
              <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-purple-500/10 rounded-2xl">
                <p className="text-purple-300/40">No work experience listings added yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl border border-purple-500/10 bg-purple-500/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-purple-100">{exp.company}</h3>
                        <span className="text-[10px] text-purple-300/40 bg-purple-500/5 px-2 py-0.5 border border-purple-500/10 rounded-full">
                          Index: {exp.order_index}
                        </span>
                      </div>
                      <p className="text-purple-300/70 text-sm">{exp.role}</p>
                      <div className="flex items-center gap-3 text-xs text-purple-300/30 mt-1">
                        <span>{exp.location_type}</span>
                        <span>•</span>
                        <span>
                          {exp.start_date} — {exp.end_date || 'Present'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end md:self-auto">
                      <button
                        onClick={() => openExperienceEdit(exp)}
                        className="px-3 py-1.5 rounded-lg border border-purple-500/10 text-purple-300 hover:text-white hover:bg-purple-500/10 text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- MESSAGES MANAGEMENT TAB --- */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-xl font-bold text-purple-100 mb-6">Visitor Contact Inquiries</h2>

            {loadingMessages ? (
              <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-purple-500/10 rounded-2xl">
                <p className="text-purple-300/40">No messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      msg.is_read
                        ? 'border-purple-500/10 bg-purple-500/5 opacity-70'
                        : 'border-purple-500/25 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 shadow-lg shadow-purple-500/5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-purple-100">{msg.sender_name}</h3>
                          {!msg.is_read && (
                            <span className="text-[10px] bg-fuchsia-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              New
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${msg.sender_email}`}
                          className="text-xs text-purple-300/50 hover:underline"
                        >
                          {msg.sender_email}
                        </a>
                      </div>
                      <span className="text-[10px] text-purple-300/30">
                        {new Date(msg.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-purple-200/70 text-sm whitespace-pre-wrap leading-relaxed max-w-4xl mb-4">
                      {msg.message}
                    </p>

                    <div className="flex gap-2 justify-end pt-3 border-t border-purple-500/5">
                      {!msg.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="px-3 py-1.5 rounded-lg border border-purple-500/15 text-purple-200 hover:bg-purple-500/10 text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check size={12} /> Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/15 text-red-400 hover:bg-red-500/10 text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- RESUME/CV MANAGEMENT TAB --- */}
        {activeTab === 'resume' && (
          <div>
            <h2 className="text-xl font-bold text-purple-100 mb-6">Manage Resume / CV</h2>
            
            <div className="max-w-2xl bg-purple-500/5 border border-purple-500/15 rounded-2xl p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <FileText size={32} className="text-purple-400" />
              </div>
              
              <h3 className="text-lg font-bold text-purple-100 mb-2">Upload Profile Resume</h3>
              <p className="text-sm text-purple-300/60 mb-8 max-w-sm">
                Upload a PDF of your latest resume. It will be served when users click "Resume" on your landing page.
              </p>
              
              <div className="w-full relative border-2 border-dashed border-purple-500/20 rounded-xl p-8 hover:bg-purple-500/5 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept="application/pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        toast('Resume API upload route needed! (For now place file manually in public/Wubamlak_Girum_Resume.pdf)', { icon: '⚠️' })
                      }
                  }}
                />
                <div className="flex flex-col items-center gap-3 text-purple-300">
                  <UploadCloud size={28} className="text-purple-400 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-sm font-semibold">Click to select PDF or drag and drop</span>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      </main>

      {/* --- ADD/EDIT PROJECT MODAL --- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#0E0B24]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#13102e] border border-purple-500/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-100">
                {isEditingProject ? 'Modify Project details' : 'Add new Project to grid'}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-purple-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none focus:border-purple-500/40"
                  placeholder="E.g. E-Commerce Platform"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none focus:border-purple-500/40 resize-none"
                  placeholder="Detail the stack, architecture, metrics..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">Cover Image (Upload)</label>
                <div className="flex flex-col gap-2">
                  <div className="relative border-2 border-dashed border-purple-500/20 rounded-xl p-4 flex items-center justify-center hover:bg-purple-500/5 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProjectForm({ ...projectForm, imageFile: e.target.files[0] });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex gap-2 items-center text-purple-300 text-sm">
                      <UploadCloud size={18} /> 
                      {projectForm.imageFile ? projectForm.imageFile.name : 'Click or drop image file here'}
                    </div>
                  </div>
                  {!projectForm.imageFile && projectForm.image_url && (
                    <div className="text-xs text-purple-300/40 flex items-center gap-1.5 px-1 truncate">
                      <span>Current saved image:</span>
                      <a href={projectForm.image_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                        {projectForm.image_url.slice(0, 45)}...
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none focus:border-purple-500/40"
                  placeholder="React, Redux, Node, Tailwind"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Production Live Link</label>
                  <input
                    type="url"
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <button
                  type="button"
                  onClick={() => setProjectForm({ ...projectForm, featured: !projectForm.featured })}
                  className="text-purple-300 hover:text-white cursor-pointer"
                >
                  {projectForm.featured ? (
                    <span className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                      <ToggleRight className="text-amber-300" size={24} /> Highlight/Feature this Project
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-xs font-semibold text-purple-300/40">
                      <ToggleLeft size={24} /> Highlight/Feature this Project
                    </span>
                  )}
                </button>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-purple-500/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 border border-purple-500/10 hover:bg-white/5 text-purple-300 rounded-xl text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD/EDIT EXPERIENCE MODAL --- */}
      {showExperienceModal && (
        <div className="fixed inset-0 z-50 bg-[#0E0B24]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#13102e] border border-purple-500/20 p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-100">
                {isEditingExperience ? 'Modify Job Entry' : 'Add New Work Entry'}
              </h3>
              <button
                onClick={() => setShowExperienceModal(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-purple-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveExperience} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.company}
                    onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                    placeholder="E.g. Teamwork IT Solution"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.role}
                    onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                    placeholder="E.g. Full Stack Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Location Type</label>
                  <select
                    value={experienceForm.location_type}
                    onChange={(e) => setExperienceForm({ ...experienceForm, location_type: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Order index (Sorting)</label>
                  <input
                    type="number"
                    value={experienceForm.order_index}
                    onChange={(e) => setExperienceForm({ ...experienceForm, order_index: parseInt(e.target.value || 0) })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    required
                    value={experienceForm.start_date}
                    onChange={(e) => setExperienceForm({ ...experienceForm, start_date: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1.5">End Date (Blank if Current)</label>
                  <input
                    type="date"
                    value={experienceForm.end_date}
                    onChange={(e) => setExperienceForm({ ...experienceForm, end_date: e.target.value })}
                    className="w-full px-3/5 py-2.5 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-purple-300">Bullet point highlights</label>
                  <button
                    type="button"
                    onClick={addExperienceBullet}
                    className="text-xs text-purple-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} /> Add highlight
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {experienceForm.bullet_points.map((pt, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={pt}
                        onChange={(e) => updateExperienceBullet(idx, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0E0B24] border border-purple-500/15 text-purple-100 text-sm focus:outline-none"
                        placeholder="Explain responsibility, achievement, or stack..."
                      />
                      <button
                        type="button"
                        onClick={() => removeExperienceBullet(idx)}
                        disabled={experienceForm.bullet_points.length <= 1}
                        className="p-2 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/10 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-purple-500/10">
                <button
                  type="button"
                  onClick={() => setShowExperienceModal(false)}
                  className="px-4 py-2 border border-purple-500/10 hover:bg-white/5 text-purple-300 rounded-xl text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
