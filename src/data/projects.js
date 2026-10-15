// Fallback project data used when the backend API is unavailable.
// Projects stored in PostgreSQL are the source of truth when the server is running.

export const fallbackProjects = [
  {
    id: 1,
    title: 'VastuGrid',
    description:
      'A comprehensive platform designed for civil engineering projects, enabling users to explore, manage, and collaborate on construction and architectural plans with modern tools and data visualization.',
    image_url: null,
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'fullstack',
    github_url: 'https://github.com/abhay-kumar',
    live_demo_url: '#',
  },
  {
    id: 2,
    title: 'ResQMeal',
    description:
      'A food rescue platform that connects surplus food donors—restaurants, events, households—with NGOs and shelters, reducing food waste and fighting hunger through a streamlined donation workflow.',
    image_url: null,
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    category: 'fullstack',
    github_url: 'https://github.com/abhay-kumar',
    live_demo_url: '#',
  },
  {
    id: 3,
    title: 'BiharBees',
    description:
      'A blogging and content platform showcasing Bihar\'s rich culture, heritage, stories, and local talent. Features a modern reading experience with categories, search, and community engagement.',
    image_url: null,
    technologies: ['React.js', 'CSS3', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    github_url: 'https://github.com/abhay-kumar',
    live_demo_url: '#',
  },
  {
    id: 4,
    title: 'Secure Messaging System',
    description:
      'A real-time messaging application with end-to-end encryption, JWT-based authentication, and secure data transmission. Built with a focus on privacy, reliability, and clean architecture.',
    image_url: null,
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Bcrypt'],
    category: 'backend',
    github_url: 'https://github.com/abhay-kumar',
    live_demo_url: '#',
  },
];

export const projectCategories = ['All', 'Frontend', 'Full Stack', 'Backend'];

// Map display labels to data values
export const categoryMap = {
  'All': 'all',
  'Frontend': 'frontend',
  'Full Stack': 'fullstack',
  'Backend': 'backend',
};
