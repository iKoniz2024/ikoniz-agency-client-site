"use client";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

interface AuthFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
}

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLoginSuccess?: () => void;
  handleBook?: () => any;
  defaultTab?: "login" | "signup";
}

export function AuthModal({
  isOpen: propIsOpen,
  onOpenChange: propOnOpenChange,
  onLoginSuccess,
  handleBook,
  defaultTab = "login",
}: AuthModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [loginForm, setLoginForm] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState<AuthFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if controlled or uncontrolled
  const isControlled = propIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (isControlled) {
      if (propOnOpenChange) propOnOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "login" | "signup"
  ) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const validateSignupForm = () => {
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (signupForm.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleContinueAsGuest = () => {
    setIsOpen(false);
    if (handleBook) handleBook();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${ApiBaseMysql}/auth/jwt/create/`,
        loginForm
      );
      const { access } = response.data.data;
      localStorage.setItem("access_token", access);
      Cookies.set("access_token", access);
      const decodedToken: any = jwtDecode(access);
      Cookies.set("user_id", decodedToken.user_id);
      Cookies.set("email", decodedToken.email);
      toast.success("Login Successful");
      setIsOpen(false);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignupForm()) return;

    setLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...signupData } = signupForm;
      const response = await axios.post(
        `${ApiBaseMysql}/auth/users/`,
        signupData
      );
      if (response.status === 201) {
        toast.success("Signup Successful");
        setActiveTab("login");
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        });
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.details?.email?.[0] ||
        err.response?.data?.details?.password?.[0] ||
        "Signup failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => handleInputChange(e, "login")}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginForm.password}
                    onChange={(e) => handleInputChange(e, "login")}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              {error && (
                <div className="text-sm text-destructive text-center">
                  {error}
                </div>
              )}
              <div className="text-center text-sm">
                <button
                  className="text-primary hover:underline"
                  onClick={handleContinueAsGuest}
                >
                  Continue As Guest
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={signupForm.firstName}
                    onChange={(e) => handleInputChange(e, "signup")}
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={signupForm.lastName}
                    onChange={(e) => handleInputChange(e, "signup")}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={signupForm.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Enter password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="Confirm password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
              {error && (
                <div className="text-sm text-destructive text-center">
                  {error}
                </div>
              )}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setActiveTab("login")}
                >
                  Sign in
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
