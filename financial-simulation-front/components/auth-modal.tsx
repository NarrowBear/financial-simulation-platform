import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Divider,
} from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Logo } from "@/components/icons";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      console.log("Login:", { email: formData.email, password: formData.password });
    } else {
      console.log("Register:", formData);
    }
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      classNames={{
        base: "bg-gray-900 border border-gray-700",
        header: "border-b border-gray-700",
        body: "py-6",
        footer: "border-t border-gray-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-center w-full">
            <Logo size={200} className="text-coral-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            {mode === "login" ? "Welcome Back to Averium" : "Create Your Averium Account"}
          </h2>
          <p className="text-sm text-gray-300 text-center">
            {mode === "login" 
              ? "Sign in to your account to continue using financial services" 
              : "Register a new account to start your investment journey"
            }
          </p>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  isRequired
                  classNames={{
                    inputWrapper: "border-gray-600 bg-gray-800 data-[focus=true]:bg-gray-800 data-[focus=true]:border-coral-400",
                    label: "text-gray-300",
                    input: "text-white placeholder:text-gray-400",
                  }}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  isRequired
                  classNames={{
                    inputWrapper: "border-gray-600 bg-gray-800 data-[focus=true]:bg-gray-800 data-[focus=true]:border-coral-400",
                    label: "text-gray-300",
                    input: "text-white placeholder:text-gray-400",
                  }}
                />
              </div>
            )}

            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              isRequired
              classNames={{
                inputWrapper: "border-gray-600 bg-gray-800 data-[focus=true]:bg-gray-800 data-[focus=true]:border-coral-400",
                label: "text-gray-300",
                input: "text-white placeholder:text-gray-400",
              }}
            />

            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              }
              classNames={{
                inputWrapper: "border-gray-600 bg-gray-800 data-[focus=true]:bg-gray-800 data-[focus=true]:border-coral-400",
                label: "text-gray-300",
                input: "text-white placeholder:text-gray-400",
              }}
            />

            {mode === "register" && (
              <Input
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                isRequired
                classNames={{
                  inputWrapper: "border-gray-300",
                  label: "text-gray-700",
                }}
              />
            )}

            {mode === "register" && (
              <Checkbox
                isSelected={formData.agreeToTerms}
                onValueChange={(checked) => handleInputChange("agreeToTerms", checked)}
                classNames={{
                  label: "text-sm text-gray-300",
                }}
              >
                I agree to the
                <a href="#" className="text-coral-400 hover:text-coral-300 ml-1">
                  Terms of Service
                </a>
                and
                <a href="#" className="text-coral-400 hover:text-coral-300 ml-1">
                  Privacy Policy
                </a>
              </Checkbox>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <Checkbox
                  classNames={{
                    label: "text-sm text-gray-300",
                  }}
                >
                  Remember me
                </Checkbox>
                <a href="#" className="text-sm text-coral-400 hover:text-coral-300">
                  Forgot password?
                </a>
              </div>
            )}
          </ModalBody>

          <ModalFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: '#FF6B6B' }}
              size="lg"
            >
              {mode === "login" ? "Sign In" : "Sign Up"}
            </Button>

            <Divider className="my-2" />

            <div className="text-center">
              <span className="text-sm text-gray-300">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button
                type="button"
                onClick={() => onModeChange(mode === "login" ? "register" : "login")}
                className="text-sm text-coral-400 hover:text-coral-300 ml-1 font-medium"
              >
                {mode === "login" ? "Sign up now" : "Sign in now"}
              </button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
