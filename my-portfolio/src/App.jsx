import { useState, useEffect } from 'react'
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
  AlertCircle
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import profileImage from './assets/profile.jpg'
import rorImage from './assets/ror.png'

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

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
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind', 'Bootstrap'],
    backend: ['Node.js', 'Express', 'Python', 'SQL', 'MongoDB'],
    tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Docker']
  };

  // Add your social media links here
  const socialLinks = {
    github: 'https://github.com/sayreall',
    linkedin: 'https://www.linkedin.com/in/san-antonio-john-cyril-8bb4a7357/',
    twitter: 'https://x.com/cyrilsanantoni0',
    email: 'cyrilsanantonio19@gmail.com'
  };

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
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => scrollToSection('home')}>
          <Code2 size={24} className="brand-icon" />
          sayreal<span className="highlight">.dev</span>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => {
            const id = item.name.toLowerCase().replace(' ', '-');
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <button 
                  onClick={() => scrollToSection(id)}
                  className={activeSection === id ? 'active' : ''}
                >
                  <Icon size={18} className="nav-icon" />
                  {item.name}
                </button>
              </li>
            );
          })}
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
              <GraduationCap size={20} className="inline-icon" /> STUDENT DEVELOPER
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

      {/* About Section */}
      <section id="about-me" className="section">
        <h2 className="section-title">
          <User size={32} className="title-icon" />
          About Me
        </h2>
        <div className="about-content">
          <div className="profile-card">
            <div className="profile-image">
              <img src={profileImage} alt="Profile" />
            </div>
            <div className="social-icons">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href={socialLinks.email} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="about-text">
            <p>
              Hello! I'm a passionate student developer with a curiosity for how things work on the web. 
              I love turning complex problems into simple, beautiful, and intuitive interface designs.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open source projects,
              and learning about the latest trends in web development. I believe in writing clean,
              maintainable code and creating user experiences that delight.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <BarChart size={32} className="stat-icon" />
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <Clock size={32} className="stat-icon" />
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <Target size={32} className="stat-icon" />
                <h3>5+</h3>
                <p>Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studies Section */}
      <section id="studies" className="section">
        <h2 className="section-title">
          <GraduationCap size={32} className="title-icon" />
          Studies
        </h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">Present - 2022</div>
            <div className="timeline-content">
              <h3>Bachelor Program</h3>
              <p>Laguna State Polytechnic University (LSPU)</p>
              <p className="description">
                Bachelor Science of Information Technology. Currently pursuing degree with focus on 
                software development, web technologies, and information systems.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2020 - 2022</div>
            <div className="timeline-content">
              <h3>Secondary</h3>
              <p>Philippine Women's University (PWU)</p>
              <p className="description">
                Graduated with Honor. Successfully completed senior high school education with 
                outstanding academic performance.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2018 - 2020</div>
            <div className="timeline-content">
              <h3>Secondary</h3>
              <p>San Juan National High School</p>
              <p className="description">
                Graduated with Honor. Completed junior high school education with excellent 
                academic standing and active participation in school activities.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2010 - 2018</div>
            <div className="timeline-content">
              <h3>Elementary</h3>
              <p>Longos Elementart School</p>
              <p className="description">
                1st place Badminton in District Meet. Demonstrated excellence in both academics 
                and sports during elementary education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2 className="section-title">
          <Briefcase size={32} className="title-icon" />
          Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div 
                className="project-image" 
                style={{ backgroundImage: project.image }}
              >
                <div className="project-overlay">
                  <a href={project.github} className="project-link">
                    <Github size={20} />
                    GitHub
                  </a>
                  <a href={project.demo} className="project-link">
                    <ExternalLink size={20} />
                    Demo
                  </a>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2 className="section-title">
          <Wrench size={32} className="title-icon" />
          Skills
        </h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-tags">
              {skills.frontend.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <div className="skill-tags">
              {skills.backend.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="skill-category">
            <h3>Tools & Others</h3>
            <div className="skill-tags">
              {skills.tools.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2 className="section-title">
          <Mail size={32} className="title-icon" />
          Get In Touch
        </h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>Have a question or want to work together? Feel free to reach out!</p>
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} className="contact-icon" />
                <a href={socialLinks.email}>cyrilsanantonio19@gmail.com</a>
              </div>
              <div className="contact-item">
                <Phone size={20} className="contact-icon" />
                <span>+639505960921</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} className="contact-icon" />
                <span>Kalayaan, Laguna, Philippines</span>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
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
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn primary full-width" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="spinning" />
                  Sending...
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
    </div>
  )
}

export default App
