export interface PortfolioData {
  hero: {
    name: string;
    bio: {
      text: string;
      highlightedWords: string[];
    };
    profileImage: string;
  };
  navigation: {
    items: Array<{
      label: string;
      href?: string;
    }>;
    switchVibeButton: {
      label: string;
    };
  };
  social: {
    email: {
      url: string;
    };
    linkedin: {
      url: string;
    };
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    badge: 'Case study' | 'Showcase';
    image: string;
    imageFocused?: string; // Optional focused theme image
    imageBackgroundColor: string;
  }>;
}

export const portfolioData: PortfolioData = {
  hero: {
    name: "Jenny",
    bio: {
      text: "I love design, exploring new ideas, and being challenged by complex products.",
      highlightedWords: ["love", "people", "usability"]
    },
    profileImage: '/images/profile_image .png'
  },
  navigation: {
    items: [
      { label: 'Home' },
      { label: 'About' },
      { label: 'Work' }
    ],
    switchVibeButton: {
      label: 'Switch vibe'
    }
  },
  social: {
    email: {
      url: 'mailto:jenny8880@gmail.com'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/jenny-vainshtein-a30b0362/'
    }
  },
  projects: [
    {
      id: 'kemtai',
      title: 'Kemtai',
      description: 'AI-powered physical therapy platform',
      badge: 'Showcase',
      image: '/images/kemtai_project_calm.png',
      imageFocused: '/images/kemtai_focused.png',
      imageBackgroundColor: '#e9f2f9'
    },
    {
      id: 'adaptive-portfolio',
      title: 'Adaptive portfolio',
      description: 'My portfolio',
      badge: 'Case study',
      image: '/images/adaptive_portfolio_calm.png',
      imageFocused: '/images/portfolio_project_focused.png',
      imageBackgroundColor: '#eaf1fb'
    },
    {
      id: 'philips',
      title: 'EPD - Philips',
      description: 'Heart imaging and navigation system',
      badge: 'Case study',
      image: '/images/philips_project_calm.png',
      imageFocused: '/images/philips_project_focused.png',
      imageBackgroundColor: '#eef3f9'
    },
    {
      id: 'selected-work',
      title: 'Selected work',
      description: 'Some of my work through the years',
      badge: 'Showcase',
      image: '/images/selected_work_calm.png',
      imageFocused: '/images/selected_work_focused.png',
      imageBackgroundColor: '#edf1fa'
    }
  ]
};

