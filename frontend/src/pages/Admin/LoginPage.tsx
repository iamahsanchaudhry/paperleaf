import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/context/AuthContext"; 
import { adminLogin } from "@/api/adminApi";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill both fields");
      return;
    }

    try {
      setLoading(true);
      const res = await adminLogin(email, password);

      if (res.success) {
        // Save token & admin info
        if(res.token)
          login(res.token);
          navigate("/");
           toast.success(res.message, {
           description: "Welcome back Admin!",
         });
      } else {
        toast.success(res.message, {
           description: "Invalid credentials",
         })
      }
    } catch (err: any) {
       toast.error(err.message, {
           description: "Please enter correct email and password!",
         })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 pt-24">
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="w-full grid grid-cols-1 mb-4">
          <TabsTrigger value="login" className="font-medium">
            LOGIN
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="w-full shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email and password to continue.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full text-base py-2"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
