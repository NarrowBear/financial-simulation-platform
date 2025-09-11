"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { SignupModal } from "./signup-modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin, onSignup }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(email, password);
    setIsLoading(false);
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    await onSignup(name, email, password);
    setIsSignupModalOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      placement="center"
      size="sm"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200",
        body: "py-6",
        footer: "border-t border-gray-200",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </ModalHeader>
          
          <ModalBody className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </ModalBody>
          
          <ModalFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
              isLoading={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <Divider className="my-2" />
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign up
              </button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
      
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignup={handleSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </Modal>
  );
};
