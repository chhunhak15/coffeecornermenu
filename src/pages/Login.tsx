import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Logged in successfully!");
      navigate("/admin");
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-xl border-0">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Coffee className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your password to manage the menu</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <Button type="button" variant="ghost" className="w-full gap-2" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" /> Back to Menu
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">Demo password: admin123</p>
        </CardContent>
      </Card>
    </div>
  );
}
