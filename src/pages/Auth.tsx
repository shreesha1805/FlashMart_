import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setEmailSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isSignUp ? "Sign up failed" : "Login failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-2">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="font-heading text-2xl">Check your email</CardTitle>
            <CardDescription className="text-muted-foreground">
              We've sent a verification link to <strong className="text-foreground">{email}</strong>. Click the link to activate your account.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => { setEmailSent(false); setIsSignUp(true); }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign up
            </Button>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Return to home
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-extrabold text-lg">M</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">FlashMart_</span>
          </div>
          <CardTitle className="font-heading text-2xl">
            {isSignUp ? "Create your account" : "Welcome back"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSignUp
              ? "Sign up to get groceries delivered in minutes"
              : "Log in to your MartFlash account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  minLength={6}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground border-0 font-semibold"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
            </Button>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
