
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/MainNav";

interface AuthProps {
  defaultTab?: "login" | "register";
}

export default function AuthPage({ defaultTab = "login" }: AuthProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.error("Login error in component:", error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      return;
    }
    
    setIsRegisterLoading(true);
    
    try {
      await signUp(registerEmail, registerPassword, registerName);
      
      // Form is reset in the useEffect when redirected
      
    } catch (error) {
      console.error("Register error in component:", error);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-md">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Login to AeroSense</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoginLoading}
                    >
                      {isLoginLoading ? "Logging in..." : "Login"}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-primary underline"
                        onClick={() => setActiveTab("register")}
                      >
                        Register
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Enter your details to create your AeroSense account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input 
                        id="register-password" 
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isRegisterLoading}
                    >
                      {isRegisterLoading ? "Creating account..." : "Create Account"}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-primary underline"
                        onClick={() => setActiveTab("login")}
                      >
                        Login
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
