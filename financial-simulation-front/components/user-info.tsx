"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardBody } from "@heroui/card";

export const UserInfo = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Card className="w-full mb-6">
      <CardBody className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Welcome back, {user?.name}!</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
