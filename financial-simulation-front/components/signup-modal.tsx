"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export const SignupModal = ({ isOpen, onClose, onSignup, onSwitchToLogin }: SignupModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // 模拟注册延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSignup(name, email, password);
    setIsLoading(false);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    onClose();
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
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-600">Sign up to get started</p>
          </ModalHeader>
          
          <ModalBody className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isRequired
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              classNames={{
                input: "text-sm",
                inputWrapper: "border-gray-300 focus-within:border-blue-500",
              }}
            />
            
            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" required />
              <span className="text-gray-600">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </span>
            </div>
          </ModalBody>
          
          <ModalFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
              isLoading={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <Divider className="my-2" />
            
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                onClick={onSwitchToLogin}
              >
                Sign in
              </button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
