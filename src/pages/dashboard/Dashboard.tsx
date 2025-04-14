import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, User, Upload, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="rounded-2xl shadow p-4">
          <CardContent className="flex flex-col items-center text-center">
            <User className="h-10 w-10 text-blue-600 mb-2" />
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-gray-600">View and update your personal details</p>
            <a href='/profile' className="mt-4 w-full">Go to Profile</a>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow p-4">
          <CardContent className="flex flex-col items-center text-center">
            <ShoppingCart className="h-10 w-10 text-green-600 mb-2" />
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-gray-600">Track your recent purchases</p>
            <Button className="mt-4 w-full">View Orders</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow p-4">
          <CardContent className="flex flex-col items-center text-center">
            <Package className="h-10 w-10 text-purple-600 mb-2" />
            <h2 className="text-xl font-semibold">My Products</h2>
            <p className="text-gray-600">Manage your listed items</p>
            <Button className="mt-4 w-full">Manage Products</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Upload Form */}
        <Card className="rounded-2xl shadow p-4">
          <CardContent>
            <div className="flex items-center mb-4">
              <Upload className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Upload New Product</h2>
            </div>
            <form className="space-y-4">
              <Input placeholder="Product Name" />
              <Textarea placeholder="Product Description" />
              <Input type="number" placeholder="Price" />
              <Input type="file" />
              <Button type="submit" className="w-full">Upload</Button>
            </form>
          </CardContent>
        </Card>

        {/* Buyer Chat Section */}
        <Card className="rounded-2xl shadow p-4">
          <CardContent>
            <div className="flex items-center mb-4">
              <MessageSquare className="h-6 w-6 text-pink-600 mr-2" />
              <h2 className="text-xl font-semibold">Buyer Messages</h2>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium">Alice</p>
                <p className="text-gray-600 text-sm">Hi, is the red jacket still available?</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium">Bob</p>
                <p className="text-gray-600 text-sm">Can you ship to California?</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium">Charlie</p>
                <p className="text-gray-600 text-sm">What’s the size of the sneakers?</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

