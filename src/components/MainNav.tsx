
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedLogo from "@/components/AnimatedLogo";

type MainNavProps = {
  onScrollToSection?: (id: string) => void;
};

export function MainNav({ onScrollToSection }: MainNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  // Check if we're on the dashboard or other internal pages
  const isDashboardPage = location.pathname.includes('/dashboard') || 
                          location.pathname.includes('/plots') || 
                          location.pathname.includes('/crops') || 
                          location.pathname.includes('/alerts') || 
                          location.pathname.includes('/historical') || 
                          location.pathname.includes('/settings');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleNavClick = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
      setIsMobileMenuOpen(false);
    }
  };
  
  const isHomePage = location.pathname === '/';
  
  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-padding">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <AnimatedLogo />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {!isDashboardPage && (
              <>
                {isHomePage ? (
                  <>
                    <button 
                      onClick={() => handleNavClick("home")}
                      className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => handleNavClick("features")}
                      className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => handleNavClick("testimonials")}
                      className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                      Testimonials
                    </button>
                    <button 
                      onClick={() => handleNavClick("contact")}
                      className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium"
                    >
                      Contact
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/" className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium">
                      Home
                    </Link>
                    <Link to="/about" className="nav-link text-foreground/80 hover:text-primary transition-colors font-medium">
                      About Us
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 btn-3d"
                onClick={() => signOut()}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Link to="/about" className="md:hidden lg:block">
                  <Button variant="outline" size="sm" className="flex items-center gap-1 btn-3d">
                    <Info size={16} />
                    <span>About</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="btn-3d">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="gradient" className="btn-premium">Sign Up</Button>
                </Link>
              </div>
            )}
            
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-5 bg-white dark:bg-slate-900 border-t">
          <div className="container-padding">
            <nav className="flex flex-col space-y-4">
              {!isDashboardPage && !user && (
                <>
                  {isHomePage ? (
                    <>
                      <button 
                        onClick={() => handleNavClick("home")}
                        className="text-foreground/80 hover:text-primary transition-colors py-2"
                      >
                        Home
                      </button>
                      <button 
                        onClick={() => handleNavClick("features")}
                        className="text-foreground/80 hover:text-primary transition-colors py-2"
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => handleNavClick("testimonials")}
                        className="text-foreground/80 hover:text-primary transition-colors py-2"
                      >
                        Testimonials
                      </button>
                      <button 
                        onClick={() => handleNavClick("contact")}
                        className="text-foreground/80 hover:text-primary transition-colors py-2"
                      >
                        Contact
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/" className="text-foreground/80 hover:text-primary transition-colors py-2">
                        Home
                      </Link>
                    </>
                  )}
                  
                  <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors py-2">
                    About Us
                  </Link>
                </>
              )}
              
              {user ? (
                <Button 
                  variant="outline"
                  className="flex items-center justify-center gap-2 btn-3d"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              ) : (
                <div className="flex space-x-3 pt-2">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full btn-3d">Log in</Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button variant="gradient" className="w-full btn-premium">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
