
import { useState, useEffect, useRef } from "react";
import { MainNav } from "@/components/MainNav";
import { FooterSection } from "@/components/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Code, Leaf, LineChart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function AboutPage() {
  const [isInView, setIsInView] = useState<string | null>(null);
  const sectionRefs = {
    story: useRef<HTMLDivElement>(null),
    vision: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null),
    impact: useRef<HTMLDivElement>(null)
  };
  
  // Timeline events for the journey section
  const timelineEvents = [
    {
      year: "2020",
      title: "Problem Identification",
      description: "Swatik identified the need for accessible crop monitoring systems during field research."
    },
    {
      year: "2021",
      title: "Research & Development",
      description: "Extensive research into agricultural tech and IoT alternatives began, focusing on simulation."
    },
    {
      year: "2022",
      title: "Prototype Development",
      description: "First working prototype of AeroSense was created, focusing on core monitoring features."
    },
    {
      year: "2023",
      title: "Beta Testing",
      description: "Partnerships with local farmers and agricultural institutions to test and refine the platform."
    },
    {
      year: "2024",
      title: "Official Launch",
      description: "AeroSense platform officially launched to help farmers monitor crops without expensive hardware."
    }
  ];
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe all section refs
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav onScrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 container-padding overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[80%] h-[80%] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-[60%] -left-[10%] w-[60%] h-[60%] bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-blob delay-300"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <AnimatedLogo variant="large" className="mb-4" />
          </div>
          
          <h1 className="text-gradient mb-6 font-bold">
            <span className="animate-slide-down inline-block">The story of AeroSense</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            How Swatik Baral's vision to democratize agriculture technology became reality
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up">
            <Button 
              size="lg" 
              variant="gradient" 
              onClick={() => scrollToSection('story')}
              className="btn-premium"
            >
              Our Story <ArrowRight size={16} />
            </Button>
            <Link to="/register">
              <Button size="lg" variant="outline" className="btn-3d">
                Join Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Founder's Story Section */}
      <section 
        id="story" 
        ref={sectionRefs.story}
        className={`py-20 container-padding ${isInView === 'story' ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gradient mb-6">The Founder's Journey</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  It all began in 2020 when Swatik Baral, an agricultural engineering graduate with a passion for technology, 
                  was working with small-scale farmers in rural communities. Swatik observed a critical challenge: farmers needed 
                  reliable data to make informed decisions, but couldn't afford expensive IoT sensors and monitoring systems.
                </p>
                <p>
                  "I witnessed farmers losing crops due to preventable issues that could have been identified with proper monitoring," 
                  recalls Swatik. "The technology existed, but it was inaccessible to those who needed it most."
                </p>
                <p>
                  This realization sparked an idea: what if farmers, students, and researchers could access sophisticated crop 
                  monitoring without expensive hardware? What if simulation could bridge this gap and democratize agricultural technology?
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="premium-card aspect-square w-full max-w-md mx-auto p-6 rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1592991538534-00972b6f59ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" 
                    alt="Agricultural Technology" 
                    className="w-full h-full object-cover mix-blend-overlay dark:mix-blend-soft-light opacity-80"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-blue-400/20 dark:bg-blue-400/10 animate-float"></div>
                <div className="absolute bottom-8 left-8 h-12 w-12 rounded-full bg-teal-400/20 dark:bg-teal-400/10 animate-float delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision and Mission Section */}
      <section 
        id="vision" 
        ref={sectionRefs.vision}
        className={`py-20 container-padding bg-gradient-cool ${isInView === 'vision' ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gradient mb-4">Our Vision & Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The core principles that drive our innovation and guide our path forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="premium-card p-8 rounded-2xl">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To create a world where agricultural technology is accessible to everyone, regardless of resources or technical expertise, 
                enabling sustainable farming practices and food security through data-driven decision making.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-2xl">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-teal-500/10 text-teal-500">
                  <Leaf className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide affordable, user-friendly agricultural monitoring solutions that simulate real-world data, 
                helping farmers optimize resource usage, researchers develop new techniques, and students learn through practical experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Journey Timeline Section */}
      <section 
        id="journey" 
        ref={sectionRefs.journey}
        className={`py-20 container-padding ${isInView === 'journey' ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gradient mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The path from concept to a fully-realized agricultural monitoring platform
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform -translate-x-1/2"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${
                  index % 2 === 0 ? 'md:flex-row-reverse text-right' : ''
                }`}
              >
                {/* Year bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg z-10">
                  {event.year.slice(2)}
                </div>
                
                {/* Content */}
                <div className="md:w-1/2"></div>
                <div className={`premium-card p-6 rounded-xl md:w-1/2 mt-6 md:mt-0 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className="text-lg font-bold text-gradient-cool mb-1">{event.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section 
        id="impact" 
        ref={sectionRefs.impact}
        className={`py-20 container-padding bg-gradient-warm ${isInView === 'impact' ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gradient mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The difference AeroSense is making in agriculture and education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "15,000+ Users",
                description: "Farmers, researchers, and students using AeroSense worldwide"
              },
              {
                icon: <LineChart className="h-8 w-8 text-green-500" />,
                title: "30% Resource Savings",
                description: "Average resource optimization achieved with our monitoring solutions"
              },
              {
                icon: <Award className="h-8 w-8 text-yellow-500" />,
                title: "Award Winning",
                description: "Recognized for innovation in agricultural technology"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-effect-strong p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
          
          <div className="premium-card p-8 rounded-2xl mt-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
                <Code className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Swatik's Vision for the Future</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              "My dream is to see AeroSense in every agricultural community, educational institution, and research facility, 
              enabling data-driven decisions without financial barriers. Technology should empower everyone, not just those who can afford it."
            </p>
            <div className="font-semibold">- Swatik Baral, Founder & CEO</div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 container-padding bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold mb-6 text-white">
            <span className="kinetic-text">
              <span data-text="Join Us">Join Us</span>
            </span> on This Journey
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Experience how AeroSense can transform your approach to agriculture and crop monitoring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto btn-3d">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto btn-3d">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FooterSection onScrollToSection={scrollToSection} />
    </div>
  );
}
