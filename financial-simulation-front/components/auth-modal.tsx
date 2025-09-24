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
import { authApi } from "@/lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setFormData({
      account: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      agreeToTerms: false,
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const response = await authApi.login(formData.account, formData.password);
        console.log("登录成功:", response);
        handleClose();
      } else {
        const response = await authApi.register(formData);
        console.log("注册成功:", response);
        handleClose();
      }
    } catch (error) {
      console.error("认证失败:", error);
      alert("认证失败，请检查您的凭据");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        base: "bg-gray-900 border border-gray-700",
        header: "border-b border-gray-700",
        body: "py-6",
        footer: "border-t border-gray-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-0 py-1">
          <div className="flex items-center justify-center w-full">
            <Logo width={300} height={100} className="text-coral-500" />
          </div>
          <h2 className="text-xl font-bold text-center text-white">
            {mode === "login" ? "Welcome Back to Averium" : "Create Your Averium Account"}
          </h2>
          <p className="text-xs text-gray-300 text-center">
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
                  color="default"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  isRequired
                />
                <Input
                  label="Last Name"
                  color="default"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  isRequired
                />
                
              </div>
            )}

            {mode === "register" && (
              <div className="flex flex-col gap-4">
                <Input
                  color="default"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  isRequired
                />
                <Input
                  color="default"
                  type="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  isRequired
                />
              </div>

            )}

            {mode === "login" && (
              <Input
                color="default"
                label="Account"
                placeholder="Enter your email address or phone number"
                value={formData.account}
                onChange={(e) => handleInputChange("account", e.target.value)}
                isRequired
              />
            ) }
            
            <Input
              color="default"
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
            />

            {mode === "register" && (
              <Input
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                isRequired
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
