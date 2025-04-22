import React from 'react';
import { Link } from 'react-router-dom'; // Or your framework's routing

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-primary w-64 p-4 shadow-md hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Dashboard Menu</h2>
        <nav className="space-y-2">
          <Link to="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-gray-200">My Items</Link>
          <Link to="/dashboard/items" className="block py-2 px-4 rounded hover:bg-gray-200">Recent Purchases</Link>
          <Link to="/listings" className="block py-2 px-4 rounded hover:bg-gray-200">Listed Items</Link>
          <Link to="/messages" className="block py-2 px-4 rounded hover:bg-gray-200">Messages</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-primary-accent">Welcome to your Dashboard!</h1>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-primary-accent mb-2">User Profile</h3>
            <p className="text-sm text-primary-accent">View your profile details, edit information.</p>
            <Link to="/dashboard/profile" className="inline-block mt-2 text-secondary-accent hover:underline">Go to My Profile</Link>
          </div>
          <div className="bg-primary shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-primary-accent mb-2">My Items</h3>
            <p className="text-sm text-primary-accent">Manage your currently listed items for sale.</p>
            <Link to="/dashboard/items" className="inline-block mt-2 text-secondary-accent hover:underline">Go To My Items</Link>
          </div>
          <div className="bg-primary shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-primary-accent mb-2">Listed Items</h3>
            <p className="text-sm text-primary-accent">Manage your currently listed items for sale.</p>
            <Link to="/listings" className="inline-block mt-2 text-secondary-accent hover:underline">Manage Listings</Link>
          </div>
          <div className="bg-primary shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-primary-accent mb-2">Messages</h3>
            <p className="text-sm text-primary-accent">Read and respond to your messages from buyers.</p>
            <Link to="/messages" className="inline-block mt-2 text-secondary-accent hover:underline">View Messages</Link>
          </div>
        </div>

        {/* Recent Activity & Chats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-primary shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold text-primary-accent mb-4">Recent Activity</h2>
            {/* Example Recent Purchases/Listings */}
            <ul className="space-y-2">
              <li>
                <p className="text-primary-accent">Item "Awesome Gadget" purchased <span className="text-sm text-primary-accent">5 mins ago</span></p>
              </li>
              <li>
                <p className="text-primary-accent">Item "Vintage Camera" listed <span className="text-sm text-primary-accent">1 hour ago</span></p>
              </li>
              {/* More recent activity items */}
            </ul>
          </div>

          <div className="bg-primary shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold text-primary-accent mb-4">Buyer Chats</h2>
            {/* Example Buyer Chats */}
            <ul className="space-y-4">
              <li className="border rounded-md p-3">
                <p className="font-semibold text-primary-accent">Buyer A: Interested in "Old Book"</p>
                <p className="text-primary-accent text-sm">Hey, is this still available?</p>
                <Link to="/messages" className="inline-block mt-2 text-secondary-accent hover:underline">View Chat</Link>
              </li>
              <li className="border rounded-md p-3">
                <p className="font-semibold text-primary-accent">Buyer B: Question about "Blue Shirt"</p>
                <p className="text-primary-accent text-sm">What's the size of this shirt?</p>
                <Link to="/messages" className="inline-block mt-2 text-secondary-accent hover:underline">View Chat</Link>
              </li>
              {/* More buyer chats */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
