import React from 'react';
import { Link } from 'react-router-dom';
import { User, Boxes, MessageCircle } from 'lucide-react';

import { useEffect, useState } from "react";
import axios from "axios";
import * as api from "../../api";
import { useSelector } from "react-redux";


const API_URL: string = api.API_URL + "v0/";

export const dashboardLinks = [
  {
    title: 'User Profile',
    description: 'View and edit your profile details.',
    to: '/dashboard/profile',
    icon: <User className="h-6 w-6 text-white" />,
  },
  {
    title: 'My Items',
    description: 'Manage your listed items for sale.',
    to: '/dashboard/items',
    icon: <Boxes className="h-6 w-6 text-white" />,
  },
  {
    title: 'Messages',
    description: 'Check and reply to your messages.',
    to: '/messages',
    icon: <MessageCircle className="h-6 w-6 text-white" />,
  },
];

export const Dashboard: React.FC = () => {


  const currentUser = useSelector((state: any) => state.auth.user);


  const [stats, setStats] = useState({
    activeListings: 0,
    newMessages: 0,
    totalChats: 0,
    positiveFeedback: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}users/dashboard/stats/${currentUser._id}`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-secondary/60 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome back 👋</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Here's a quick look at what’s going on today.
          </p>
        </header>

        {/* Quick Stats - could be dynamic later */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-4 text-center">
        <p className="text-lg font-semibold text-primary">{stats.activeListings}</p>
        <p className="text-sm text-gray-500">Active Listings</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 text-center">
        <p className="text-lg font-semibold text-primary">{stats.newMessages}</p>
        <p className="text-sm text-gray-500">New Messages</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 text-center">
        <p className="text-lg font-semibold text-primary">{stats.totalChats}</p>
        <p className="text-sm text-gray-500">Total Chats</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 text-center">
        <p className="text-lg font-semibold text-primary">{stats.positiveFeedback}%</p>
        <p className="text-sm text-gray-500">Positive Feedback</p>
      </div>
    </div>


        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardLinks.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl bg-primary text-white p-6 shadow-md transition-all hover:shadow-xl hover:scale-[1.015]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent rounded-lg">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <p className="text-sm opacity-90">{card.description}</p>
              <Link
                to={card.to}
                className="inline-block mt-4 text-sm underline text-accent/90 hover:text-accent"
              >
                Go to {card.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

