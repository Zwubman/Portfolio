const bcrypt = require('bcryptjs');
const { User, Skill, Experience } = require('../models');

const seedDatabase = async () => {
  try {
    // Seed admin user
    const existingAdmin = await User.findOne({ where: { email: 'wubamlak@admin.com' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@2026', 12);
      await User.create({
        email: 'wubamlak@admin.com',
        password_hash: hashedPassword,
        role: 'ADMIN',
      });
      console.log('✅ Admin user seeded.');
    }

    // Seed skills
    const skillCount = await Skill.count();
    if (skillCount === 0) {
      await Skill.bulkCreate([
        // Frontend
        { category: 'Frontend', name: 'JavaScript', icon_name: 'FileCode2' },
        { category: 'Frontend', name: 'TypeScript', icon_name: 'FileType' },
        { category: 'Frontend', name: 'React', icon_name: 'Atom' },
        { category: 'Frontend', name: 'Redux Toolkit', icon_name: 'Layers' },
        { category: 'Frontend', name: 'Tailwind CSS', icon_name: 'Palette' },
        // Backend
        { category: 'Backend', name: 'Node.js', icon_name: 'Server' },
        { category: 'Backend', name: 'Express.js', icon_name: 'Zap' },
        { category: 'Backend', name: 'NestJS', icon_name: 'Box' },
        // Databases
        { category: 'Databases', name: 'PostgreSQL', icon_name: 'Database' },
        { category: 'Databases', name: 'MongoDB', icon_name: 'HardDrive' },
        { category: 'Databases', name: 'MySQL', icon_name: 'Table2' },
        // Tools
        { category: 'Tools', name: 'Git', icon_name: 'GitBranch' },
        { category: 'Tools', name: 'Docker', icon_name: 'Container' },
      ]);
      console.log('✅ Skills seeded.');
    }

    // Seed experiences
    const expCount = await Experience.count();
    if (expCount === 0) {
      await Experience.bulkCreate([
        {
          company: 'Teamwork IT Solution',
          role: 'Full-time Remote Backend Engineer',
          location_type: 'Remote',
          start_date: '2025-06-01',
          end_date: '2026-04-30',
          bullet_points: [
            'Architected RESTful APIs and optimized database schemas for enterprise applications.',
            'Developed core transaction engines for Microfinance and Land Administration Systems.',
            'Implemented multi-tier Role-Based Access Control (RBAC) managing permissions across Woreda, Zone, and Regional levels.',
            'Integrated WebSockets for real-time messaging, dynamic notifications, and automated onboarding/applicant tracking pipelines.',
          ],
          order_index: 1,
        },
        {
          company: 'Askuala Link',
          role: 'Remote Software Engineer Intern',
          location_type: 'Remote',
          start_date: '2025-03-01',
          end_date: '2025-06-30',
          bullet_points: [
            'Optimized RESTful APIs across core platforms and submodules.',
            'Integrated payment gateways, banking systems, and SMS APIs for real-time alerts.',
            'Engineered finance and HR submodules to automate fee processing, attendance, and employee tracking.',
          ],
          order_index: 2,
        },
      ]);
      console.log('✅ Experiences seeded.');
    }

    console.log('🌱 Database seeding complete.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

module.exports = seedDatabase;
