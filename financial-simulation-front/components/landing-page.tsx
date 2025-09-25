import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@heroui/button';
import { useRouter } from 'next/router';
import AuthModal from '@/components/auth-modal';

const LandingPage = () => {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleGetStarted = () => {
    router.push('/market');
  };

  const handleSignIn = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Logo width={400} height={200} className="text-coral-500 mx-auto" />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Welcome to <span className="text-coral-400">Averium</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Advanced financial simulation and trading platform. 
            Practice trading with real market data in a risk-free environment.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Real Market Data</h3>
              <p className="text-gray-300">Access live market data and historical information</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Risk-Free Trading</h3>
              <p className="text-gray-300">Practice trading strategies without financial risk</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-300">Comprehensive portfolio analysis and reporting</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3"
              onClick={handleGetStarted}
            >
              Explore Market
            </Button>
            
            <Button
              size="lg"
              variant="bordered"
              className="border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white px-8 py-3"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
          {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
    </div>
  );
};

export default LandingPage;
