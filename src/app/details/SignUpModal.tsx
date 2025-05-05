"use client";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import { HiArrowLongRight } from "react-icons/hi2";
import GoogleSvg from "../_components/Svg/GoogleSvg";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

interface GoogleError {
  message: string;
  error: any;
}

export function LoginModal() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [googleError, setGoogleError] = useState<GoogleError | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${ApiBaseMysql}/auth/jwt/create/`,
        formData
      );
      const { access } = response.data.data;
      localStorage.setItem("access_token", access);
      Cookies.set("access_token", access);
      const decodedToken: any = jwtDecode(access);
      Cookies.set("user_id", decodedToken.user_id);
      Cookies.set("email", decodedToken.email);
      toast.success(`Login Successful`);
      setIsOpen(false);
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    try {
      setGoogleError(null);
      setGoogleLoading(true);
      const res = await axios.get(
        `${ApiBaseMysql}/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/login/`
      );
      window.location.replace(res.data.data.authorization_url);
    } catch (err: any) {
      setGoogleError({
        message: "An error occurred while initiating Google OAuth",
        error: err,
      });
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Sign in</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Register Link */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Register here
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-in Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={continueWithGoogle}
          disabled={googleLoading}
        >
          <div className="flex items-center justify-center gap-2">
            <GoogleSvg />
            <span>Google</span>
          </div>
        </Button>

        {/* Error Messages */}
        {error && (
          <div className="text-sm text-destructive text-center">{error}</div>
        )}
        {googleError && (
          <div className="text-sm text-destructive text-center">
            {googleError.message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}