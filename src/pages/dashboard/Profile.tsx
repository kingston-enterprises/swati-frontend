import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Card className="mb-6 rounded-2xl shadow p-6 max-w-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="space-y-4">
            <Input label="First Name" defaultValue="John" readOnly />
            <Input label="Last Name" defaultValue="Doe" readOnly />
            <Input label="Email" defaultValue="john.doe@example.com" readOnly />
            <Input label="Phone Number" defaultValue="+1234567890" readOnly />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow p-6 max-w-xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Update Password</h2>
          <form className="space-y-4">
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm New Password" />
            <Button type="submit" className="w-full">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

