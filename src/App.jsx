import { useState, useEffect, useRef } from 'react'
import './App.css'
import { 
  Home, 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Code2,
  Rocket,
  Eye,
  MessageSquare,
  ExternalLink,
  Phone,
  MapPin,
  Send,
  ChevronDown,
  Menu,
  X,
  BarChart,
  Clock,
  Target,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  FileCode,
  Palette,
  Zap,
  Component,
  Wind,
  Grid3x3,
  Server,
  Truck,
  Database,
  Leaf,
  GitBranch,
  Terminal,
  Figma,
  Box,
  Flame,
  Layers,
  Hash,
  PackageOpen
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import profileImage from './assets/profile.jpg'
import profileImage2 from './assets/cy.png'
import rorImage from './assets/ror.png'
import ecert1 from './assets/ecert1.png'
import ecert2 from './assets/ecer2.png'
import ecert3 from './assets/ecert3.png'
import ecert4 from './assets/ecert4.png'
import ecert5 from './assets/ecert5.png'

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [activeAccordion, setActiveAccordion] = useState(0); // 0 for first item active by default
  
  // Refs for auto-scrolling carousels
  const languagesCarouselRef = useRef(null);
  const frameworksCarouselRef = useRef(null);
  const databasesCarouselRef = useRef(null);
  const toolsCarouselRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const carousels = [
      languagesCarouselRef.current,
      frameworksCarouselRef.current,
      databasesCarouselRef.current,
      toolsCarouselRef.current
    ];

    const scrollSpeed = 1; // pixels per interval
    const intervalTime = 30; // milliseconds

    const intervals = carousels.map(carousel => {
      if (!carousel) return null;

      let isPaused = false;

      // Pause on hover
      carousel.addEventListener('mouseenter', () => {
        isPaused = true;
      });

      carousel.addEventListener('mouseleave', () => {
        isPaused = false;
      });

      // Auto-scroll logic with seamless loop
      const interval = setInterval(() => {
        if (!isPaused && carousel) {
          carousel.scrollLeft += scrollSpeed;

          // When we reach halfway (where duplicated content starts), reset to beginning
          const halfwayPoint = carousel.scrollWidth / 2;
          if (carousel.scrollLeft >= halfwayPoint) {
            carousel.scrollLeft = 0;
          }
        }
      }, intervalTime);

      return interval;
    });

    // Cleanup
    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  // Handle theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about-me', 'studies', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS Configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      // Debug: Log the values (first few characters only for security)
      console.log('EmailJS Config Check:', {
        serviceId: serviceId ? `${serviceId.substring(0, 10)}...` : 'MISSING',
        templateId: templateId ? `${templateId.substring(0, 10)}...` : 'MISSING',
        publicKey: publicKey ? `${publicKey.substring(0, 10)}...` : 'MISSING',
        hasServiceId: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
        hasTemplateId: !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      });

      // Validate that credentials are set
      if (serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
        throw new Error("EmailJS credentials not configured. Please set up your .env file in the my-portfolio directory with your EmailJS credentials. Make sure to restart the dev server after creating/updating the .env file. See EMAILJS_SETUP.md for instructions.");
      }

      // Additional validation - check if values are empty strings
      if (!serviceId || !templateId || !publicKey || serviceId.trim() === '' || templateId.trim() === '' || publicKey.trim() === '') {
        throw new Error("EmailJS credentials are empty. Please check your .env file and make sure all three values are set correctly.");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: socialLinks.email,
      };

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('EmailJS success:', response);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('EmailJS error details:', {
        error,
        text: error.text,
        status: error.status,
        message: error.message
      });
      
      // Provide more helpful error messages
      let errorMsg = "Failed to send message. Please try again or email me directly.";
      
      if (error.text) {
        errorMsg = `Error: ${error.text}`;
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      } else if (error.status === 400) {
        errorMsg = "Invalid EmailJS configuration. Please check your Service ID, Template ID, and Public Key in your .env file.";
      } else if (error.status === 401) {
        errorMsg = "Unauthorized. Please check your EmailJS Public Key.";
      } else if (error.status === 404) {
        errorMsg = "Service or Template not found. Please check your Service ID and Template ID.";
      }
      
      // Store error message in state for display
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
      console.error('Full error:', error);
      
      // Clear error message after 8 seconds (longer for user to read)
      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Leantech',
      description: 'Full-stack e-commerce platform for electronics with user-friendly interface and secure payment integration.',
      tags: ['HTML5', 'CSS3', 'Python', 'Flask', 'JavaScript', 'MySQL'],
      github: 'https://github.com/sayreall/leantech-shop',
      demo: 'https://drive.google.com/drive/folders/1wjCwC2FQjz2o52XSFsDMK8sMWDHJgzXH',
      image: `url(${rorImage})`
    },
    {
      id: 2,
      title: 'E-Commerce Leantech Mobile App',
      description: 'Mobile application for the Leantech e-commerce platform with seamless shopping experience.',
      tags: ['Php', 'Flutter', 'MySQL', 'Dart'],
      github: 'https://github.com/sayreall/leantech-shop-mobile',
      demo: 'https://drive.google.com/drive/folders/1wjCwC2FQjz2o52XSFsDMK8sMWDHJgzXH',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Interactive weather app with forecasts, maps, and location-based alerts.',
      tags: ['JavaScript', 'API', 'CSS3'],
      github: '#',
      demo: '#',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'Portfolio Generator',
      description: 'Tool to create customizable portfolios with multiple themes and templates.',
      tags: ['React', 'TypeScript', 'Styled Components'],
      github: '#',
      demo: '#',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  const skills = {
    languages: [
      { name: 'C#', icon: Hash, proficiency: 75, color: '#239120' },
      { name: 'PHP', icon: Code2, proficiency: 80, color: '#777BB4' },
      { name: 'Python', icon: FileCode, proficiency: 85, color: '#3776AB' },
      { name: 'JavaScript', icon: Zap, proficiency: 88, color: '#F7DF1E' },
      { name: 'HTML5', icon: FileCode, proficiency: 90, color: '#E34F26' },
      { name: 'CSS3', icon: Palette, proficiency: 85, color: '#1572B6' }
    ],
    frameworks: [
      { name: 'jQuery', icon: Component, proficiency: 70, color: '#0769AD' },
      { name: 'Bootstrap', icon: Grid3x3, proficiency: 80, color: '#7952B3' },
      { name: 'Node.js', icon: Server, proficiency: 80, color: '#339933' },
      { name: 'React', icon: Component, proficiency: 85, color: '#61DAFB' },
      { name: 'Laravel', icon: Layers, proficiency: 78, color: '#FF2D20' },
      { name: 'Tailwind', icon: Wind, proficiency: 82, color: '#06B6D4' }
    ],
    databases: [
      { name: 'MySQL', icon: Database, proficiency: 85, color: '#4479A1' },
      { name: 'PostgreSQL', icon: Database, proficiency: 75, color: '#336791' },
      { name: 'Firebase', icon: Flame, proficiency: 80, color: '#FFCA28' }
    ],
    tools: [
      { name: 'Git', icon: GitBranch, proficiency: 85, color: '#F05032' },
      { name: 'GitHub', icon: Github, proficiency: 85, color: '#181717' },
      { name: 'VS Code', icon: Terminal, proficiency: 90, color: '#007ACC' },
      { name: 'Postman', icon: Send, proficiency: 80, color: '#FF6C37' }
    ]
  };

  // Add your social media links here
  const socialLinks = {
    github: 'https://github.com/sayreall',
    linkedin: 'https://www.linkedin.com/in/san-antonio-john-cyril-8bb4a7357/',
    twitter: 'https://x.com/cyrilsanantoni0',
    email: 'cyrilsanantonio19@gmail.com'
  };

  const certificates = [
    {
      id: 1,
      title: 'Front End Database: MySQL PHP',
      issuer: 'Ethel Programming Computer Programming Services',
      date: 'December 2025',
      description: 'Certificate of Recognition for participating in the MySQL PHP webinar event.',
      image: ecert1
    },
    {
      id: 2,
      title: 'Cybersecurity Fundamentals',
      issuer: 'Ethel Programming Computer Programming Services',
      date: 'December 2025',
      description: 'Certificate of Participation in Cybersecurity Fundamentals webinar event.',
      image: ecert2
    },
    {
      id: 3,
      title: 'Linux Essentials',
      issuer: 'Cisco Networking Academy',
      date: 'December 2025',
      description: 'Successfully completed Linux Essentials through the Cisco Networking Academy program.',
      image: ecert3
    },
    {
      id: 4,
      title: 'Network Security & Troubleshooting',
      issuer: 'Ethel Programming Computer Programming Services',
      date: 'January 2026',
      description: 'Certificate of Participation in Network Security and Network Troubleshooting webinar.',
      image: ecert4
    },
    {
      id: 5,
      title: 'Operating Systems Basics',
      issuer: 'Cisco Networking Academy',
      date: 'November 2025',
      description: 'Successfully completed Operating Systems Basics through the Cisco Networking Academy program.',
      image: ecert5
    }
  ];

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About Me', icon: User },
    { name: 'Studies', icon: GraduationCap },
    { name: 'Projects', icon: Briefcase },
    { name: 'Skills', icon: Wrench },
    { name: 'Contact', icon: Mail }
  ];

  return (
    <div className="app-container">
      {/* Animated Particles Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => scrollToSection('home')}>
          <div className={`nav-profile-section ${scrolled ? 'expanded' : ''}`}>
            <div className="nav-profile-pic">
              <img src={profileImage} alt="Profile" />
              <div className="status-indicator"></div>
            </div>
            {scrolled && (
              <div className="nav-profile-info">
                <span className="nav-status">Available for work</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.slice(0, -1).map((item) => {
            const id = item.name.toLowerCase().replace(' ', '-');
            return (
              <li key={item.name}>
                <button 
                  onClick={() => scrollToSection(id)}
                  className={activeSection === id ? 'active' : ''}
                >
                  {item.name}
                </button>
              </li>
            );
          })}
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-contact-btn"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="hero-content">
          <div className="glow-effect"></div>
          <div className="hero-text animate-fade-in">
            <Code2 size={80} className="hero-icon" />
            <h1 className="main-title">
              sayreal<span className="highlight">.dev</span>
            </h1>
            <p className="subtitle">
              <GraduationCap size={20} className="inline-icon" /> WEB DEVELOPER
            </p>
            <p className="tagline">
              Building the future, one line of code at a time. <Rocket size={20} className="inline-icon" />
            </p>
            <div className="cta-buttons">
              <button onClick={() => scrollToSection('projects')} className="btn primary">
                <Eye size={20} />
                View Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn secondary">
                <MessageSquare size={20} />
                Contact Me
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('about-me')}>
          <span>Scroll Down</span>
          <ChevronDown size={24} className="arrow-icon" />
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-content">
            <div className="services-left">
              <h2 className="services-heading">WHAT I CAN DO FOR YOU</h2>
              <p className="services-description">
                As a full-stack developer, I am a digital craftsman, creating experiences that connect deeply and spark innovation.
              </p>
              
              <div className="services-accordion">
                <div className={`accordion-item ${activeAccordion === 0 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 0 ? -1 : 0)}>
                    <span className="accordion-number">1.</span>
                    <h3>UI/UX DESIGN</h3>
                    <ChevronDown size={24} className="accordion-icon" />
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Wireframing and prototyping</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>User Interface design for web and mobile apps</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Usability testing and user feedback analysis</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Interaction design and micro-animations</span>
                    </div>
                  </div>
                </div>

                <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 1 ? -1 : 1)}>
                    <span className="accordion-number">2.</span>
                    <h3>MOBILE APP DEVELOPMENT</h3>
                    <ChevronDown size={24} className="accordion-icon" />
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Native iOS and Android development</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Cross-platform development with React Native</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>App store deployment and optimization</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Push notifications and real-time features</span>
                    </div>
                  </div>
                </div>

                <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 2 ? -1 : 2)}>
                    <span className="accordion-number">3.</span>
                    <h3>WEB DEVELOPMENT</h3>
                    <ChevronDown size={24} className="accordion-icon" />
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Responsive website development</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>Full-stack web applications</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>E-commerce and CMS solutions</span>
                    </div>
                    <div className="accordion-detail">
                      <CheckCircle2 size={18} />
                      <span>API development and integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="services-right">
              <div className="services-image">
                <img src={profileImage2} alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-me" className="section about-section-modern">
        <div className="about-modern-container">
          <div className="about-left">
            <div className="about-label">ABOUT ME</div>
            <h2 className="about-main-title">Crafting Digital Experiences with Code & Creativity</h2>
            
            <div className="about-description">
              <p>
                I'm a passionate full-stack developer and student at Laguna State Polytechnic University, 
                dedicated to building innovative web solutions that merge elegant design with robust functionality.
              </p>
              <p>
                My journey in tech is driven by curiosity and a commitment to continuous learning. 
                I specialize in creating responsive, user-centric applications that solve real-world problems.
              </p>
            </div>

            <div className="stats-inline">
              <div className="stat-badge">
                <BarChart size={20} />
                <div>
                  <strong>10+</strong>
                  <span>Projects</span>
                </div>
              </div>
              <div className="stat-badge">
                <Clock size={20} />
                <div>
                  <strong>2+</strong>
                  <span>Years Exp</span>
                </div>
              </div>
              <div className="stat-badge">
                <Target size={20} />
                <div>
                  <strong>5+</strong>
                  <span>Tech Stack</span>
                </div>
              </div>
            </div>

            <div className="expertise-areas">
              <h3>Expertise</h3>
              <div className="expertise-tags">
                <span className="expertise-tag">
                  <Code2 size={16} />
                  Full-Stack Development
                </span>
                <span className="expertise-tag">
                  <Palette size={16} />
                  UI/UX Design
                </span>
                <span className="expertise-tag">
                  <Zap size={16} />
                  Performance Optimization
                </span>
                <span className="expertise-tag">
                  <Server size={16} />
                  API Development
                </span>
              </div>
            </div>

            <div className="about-social">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className="about-right">
            <div className="about-image-modern">
              <div className="image-decoration"></div>
              <img src={profileImage} alt="Profile" />
            </div>
          </div>
        </div>
      </section>

      {/* Studies Section */}
      <section id="studies" className="section education-section-modern">
        <div className="education-header">
          <div className="education-label">EDUCATION</div>
          <h2 className="education-title">Academic Journey</h2>
          <p className="education-subtitle">Building a strong foundation through continuous learning and growth</p>
        </div>
        
        <div className="education-grid">
          <div className="education-card">
            <div className="education-year">2022 - Present</div>
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <h3>Bachelor of Science in Information Technology</h3>
            <p className="education-institution">Laguna State Polytechnic University</p>
            <p className="education-description">
              Currently pursuing a degree with specialization in software development, 
              web technologies, and information systems. Active involvement in coding projects 
              and technical workshops.
            </p>
            <div className="education-badges">
              <span className="edu-badge">Software Development</span>
              <span className="edu-badge">Web Technologies</span>
              <span className="edu-badge">Information Systems</span>
            </div>
          </div>

          <div className="education-card">
            <div className="education-year">2020 - 2022</div>
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <h3>Senior High School</h3>
            <p className="education-institution">Philippine Women's University</p>
            <p className="education-description">
              Successfully completed senior high school education with outstanding academic 
              performance and graduated with honor.
            </p>
            <div className="education-badges">
              <span className="edu-badge honor">With Honor</span>
              <span className="edu-badge">Academic Excellence</span>
            </div>
          </div>

          <div className="education-card">
            <div className="education-year">2018 - 2020</div>
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <h3>Junior High School</h3>
            <p className="education-institution">San Juan National High School</p>
            <p className="education-description">
              Completed junior high school education with excellent academic standing 
              and active participation in school activities.
            </p>
            <div className="education-badges">
              <span className="edu-badge honor">With Honor</span>
              <span className="edu-badge">Active Participation</span>
            </div>
          </div>

          <div className="education-card">
            <div className="education-year">2010 - 2018</div>
            <div className="education-icon">
              <GraduationCap size={32} />
            </div>
            <h3>Elementary Education</h3>
            <p className="education-institution">Longos Elementary School</p>
            <p className="education-description">
              Demonstrated excellence in both academics and sports during elementary education. 
              Achieved 1st place in Badminton at District Meet.
            </p>
            <div className="education-badges">
              <span className="edu-badge achievement">🏆 1st Place Badminton</span>
              <span className="edu-badge">District Meet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section certificates-section-modern">
        <div className="certificates-header">
          <div className="certificates-label">CERTIFICATIONS</div>
          <h2 className="certificates-title">Professional Certificates</h2>
          <p className="certificates-subtitle">Continuous learning through industry-recognized certifications</p>
        </div>
        
        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-image">
                <img src={certificate.image} alt={certificate.title} />
              </div>
              <div className="certificate-content">
                <div className="certificate-date">{certificate.date}</div>
                <h3>{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-description">{certificate.description}</p>
                <div className="certificate-badge">
                  <span>Certified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section-modern">
        <div className="projects-header">
          <div className="projects-label">PORTFOLIO</div>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">Showcasing my recent work and technical achievements</p>
        </div>
        
        <div className="projects-grid-modern">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card-modern">
              <div className="project-visual">
                <div 
                  className="project-image" 
                  style={{ backgroundImage: project.image }}
                >
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a href={project.github} className="action-btn" title="View Code">
                        <Github size={20} />
                      </a>
                      <a href={project.demo} className="action-btn" title="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-category-badge">
                  <Code2 size={14} />
                  <span>Web Application</span>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title-large">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section-modern">
        <div className="skills-header">
          <div className="skills-label">TECH STACK</div>
          <h2 className="skills-title">Technologies & Tools</h2>
          <p className="skills-subtitle">My technical arsenal for building modern applications</p>
        </div>

        <div className="skills-container-modern">
          <div className="skills-category">
            <div className="category-header">
              <FileCode size={24} />
              <h3>Programming Languages</h3>
            </div>
            <div className="skills-grid-modern">
              {skills.languages.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div key={skill.name} className="skill-item-modern">
                    <div className="skill-icon-modern" style={{ color: skill.color }}>
                      <IconComponent size={36} strokeWidth={1.5} />
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-level">
                        <div className="level-bar" style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}></div>
                      </div>
                      <span className="proficiency-text">{skill.proficiency}% Proficiency</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="skills-category">
            <div className="category-header">
              <Layers size={24} />
              <h3>Frameworks & Libraries</h3>
            </div>
            <div className="skills-grid-modern">
              {skills.frameworks.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div key={skill.name} className="skill-item-modern">
                    <div className="skill-icon-modern" style={{ color: skill.color }}>
                      <IconComponent size={36} strokeWidth={1.5} />
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-level">
                        <div className="level-bar" style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}></div>
                      </div>
                      <span className="proficiency-text">{skill.proficiency}% Proficiency</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="skills-category">
            <div className="category-header">
              <Database size={24} />
              <h3>Databases</h3>
            </div>
            <div className="skills-grid-modern">
              {skills.databases.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div key={skill.name} className="skill-item-modern">
                    <div className="skill-icon-modern" style={{ color: skill.color }}>
                      <IconComponent size={36} strokeWidth={1.5} />
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-level">
                        <div className="level-bar" style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}></div>
                      </div>
                      <span className="proficiency-text">{skill.proficiency}% Proficiency</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="skills-category">
            <div className="category-header">
              <Wrench size={24} />
              <h3>Tools & Platforms</h3>
            </div>
            <div className="skills-grid-modern">
              {skills.tools.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div key={skill.name} className="skill-item-modern">
                    <div className="skill-icon-modern" style={{ color: skill.color }}>
                      <IconComponent size={36} strokeWidth={1.5} />
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-level">
                        <div className="level-bar" style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}></div>
                      </div>
                      <span className="proficiency-text">{skill.proficiency}% Proficiency</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section-modern">
        <div className="contact-header">
          <div className="contact-label">CONTACT</div>
          <h2 className="contact-title">Let's Work Together</h2>
          <p className="contact-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you</p>
        </div>

        <div className="contact-wrapper-modern">
          <div className="contact-info-modern">
            <div className="contact-intro">
              <h3>Get In Touch</h3>
              <p>Feel free to reach out through any of these channels. I typically respond within 24 hours.</p>
            </div>

            <div className="contact-methods">
              <a href={socialLinks.email} className="contact-method-card">
                <div className="method-icon">
                  <Mail size={24} />
                </div>
                <div className="method-content">
                  <h4>Email</h4>
                  <p>cyrilsanantonio19@gmail.com</p>
                </div>
                <ExternalLink size={18} className="method-arrow" />
              </a>

              <div className="contact-method-card">
                <div className="method-icon">
                  <Phone size={24} />
                </div>
                <div className="method-content">
                  <h4>Phone</h4>
                  <p>+639505960921</p>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon">
                  <MapPin size={24} />
                </div>
                <div className="method-content">
                  <h4>Location</h4>
                  <p>Kalayaan, Laguna, Philippines</p>
                </div>
              </div>
            </div>

            <div className="social-connect">
              <h4>Connect With Me</h4>
              <div className="social-links-modern">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link-modern">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-modern">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link-modern">
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-modern">
            <div className="form-header">
              <h3>Send Me a Message</h3>
              <p>Fill out the form below and I'll get back to you as soon as possible</p>
            </div>

            <form onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <CheckCircle2 size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  <AlertCircle size={20} />
                  <span>{errorMessage || "Failed to send message. Please try again or email me directly."}</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..." 
                  rows="6" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-submit-modern" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="spinning" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
          

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 sayreal.dev. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Theme Toggle Button */}
      <button 
        className="theme-toggle-floating"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  )
}

export default App
