
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";
import Logo from "@/components/Logo";
import { 
  Cloud, 
  Thermometer, 
  LineChart, 
  Bell, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import { WaterDropIcon } from "@/components/icons/WaterDropIcon";

export default function HomePage() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    // In a real app, would handle newsletter signup
    alert(`Thanks for signing up with ${email}! We'll be in touch soon.`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 container-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Smart Crop Monitoring System for Modern Agriculture
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              AeroSense simulates real-time agricultural data to help farmers, researchers, and students monitor crop conditions without expensive IoT hardware.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[400px] w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" 
                alt="Crop field" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-primary font-semibold">Temperature</div>
                    <div className="text-2xl font-bold">27.5°C</div>
                  </div>
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-primary font-semibold">Humidity</div>
                    <div className="text-2xl font-bold">68%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-4 animate-slide-down">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Cloud className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">Soil Moisture</div>
                  <div className="text-lg font-bold">58%</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">Crop Health</div>
                  <div className="text-lg font-bold">92%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 container-padding bg-white dark:bg-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AeroSense provides a comprehensive suite of tools to monitor and analyze crop conditions without physical sensors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Thermometer className="h-8 w-8 text-red-500" />,
              title: "Environmental Monitoring",
              description: "Track temperature, humidity, and other environmental factors affecting crop growth."
            },
            {
              icon: <WaterDropIcon className="h-8 w-8 text-blue-500" />,
              title: "Soil Analysis",
              description: "Monitor soil moisture levels and nutrient content to optimize irrigation schedules."
            },
            {
              icon: <LineChart className="h-8 w-8 text-green-500" />,
              title: "Crop Health Tracking",
              description: "Track crop health indices to identify and address issues before they escalate."
            },
            {
              icon: <Bell className="h-8 w-8 text-yellow-500" />,
              title: "Real-time Alerts",
              description: "Receive notifications for critical conditions requiring immediate attention."
            },
            {
              icon: <Globe className="h-8 w-8 text-purple-500" />,
              title: "Plot Management",
              description: "Organize and manage multiple plots with different crops and growth stages."
            },
            {
              icon: <Zap className="h-8 w-8 text-orange-500" />,
              title: "Data Analysis",
              description: "Analyze historical data to identify trends and optimize farming practices."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-secondary/50 dark:bg-slate-800 p-6 rounded-2xl card-hover"
            >
              <div className="p-3 bg-white dark:bg-slate-700 rounded-xl inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 container-padding bg-blue-50 dark:bg-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AeroSense is helping farmers, researchers, and students across the country.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "AeroSense has revolutionized how I teach agricultural technology. Students can now practice with simulated data before working with real sensors.",
              author: "Dr. Rajan Patel",
              role: "Professor, Agricultural Sciences"
            },
            {
              quote: "The simulation capabilities of AeroSense have helped me test different irrigation strategies without risking my actual crops. A game-changer for small farmers!",
              author: "Amita Sharma",
              role: "Small-scale Farmer"
            },
            {
              quote: "As a researcher, I use AeroSense to validate my hypotheses before expensive field trials. The historical data analysis is particularly valuable.",
              author: "Vikram Singh",
              role: "Agricultural Researcher"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm card-hover"
            >
              <div className="mb-4 text-4xl">"</div>
              <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
              <div className="mt-auto">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 container-padding bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming Approach?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of users who are already benefiting from AeroSense's powerful simulation and monitoring capabilities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 container-padding bg-white dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about AeroSense? We're here to help! Fill out the form and our team will get back to you shortly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Email Us</div>
                  <div className="text-muted-foreground">info@aerosense.io</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">Call Us</div>
                  <div className="text-muted-foreground">+91 9876 543 210</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-muted-foreground">123 AgriTech Park, Bangalore, India</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/50 dark:bg-slate-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                  placeholder="Message subject"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background resize-none"
                  placeholder="Your message"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 container-padding bg-blue-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest updates and agricultural insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg border border-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-slate-900 border-t">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-muted-foreground mb-4">
                Modern agriculture monitoring for everyone, no expensive hardware required.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Demo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} AeroSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Imported components
function Mail(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Phone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function Droplets(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.94" />
    </svg>
  )
}
