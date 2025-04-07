
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X,
  Bell, 
  User,
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthenticated = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${isHome ? 'bg-transparent' : 'bg-background'}`}>
      <div className="container-padding flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {isHome && (
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="/#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link to="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          {isHome ? (
            <>
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-96 overflow-y-auto">
                    {[...Array(3)].map((_, i) => (
                      <DropdownMenuItem key={i} className="py-3 cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Low Soil Moisture Alert</span>
                            <span className="text-xs text-muted-foreground">{i + 1}h ago</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Plot B12 reports critically low soil moisture levels. Immediate irrigation recommended.</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <Link to="/" className="w-full">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <ThemeToggle />
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
              <Logo />
              <Button variant="ghost" size="icon" onClick={closeMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col gap-6">
              {isHome ? (
                <>
                  <Link to="/#features" className="text-base font-medium" onClick={closeMenu}>
                    Features
                  </Link>
                  <Link to="/#testimonials" className="text-base font-medium" onClick={closeMenu}>
                    Testimonials
                  </Link>
                  <Link to="/#contact" className="text-base font-medium" onClick={closeMenu}>
                    Contact
                  </Link>
                  <Link to="/login" className="text-base font-medium" onClick={closeMenu}>
                    Log in
                  </Link>
                  <Link to="/register" className="text-base font-medium" onClick={closeMenu}>
                    Get Started
                  </Link>
                </>
              ) : (
                <Link to="/" className="text-base font-medium" onClick={closeMenu}>
                  Back to Home
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
