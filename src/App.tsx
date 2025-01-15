import React, { useState, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight, Bell, Search, User, Home, Users, Settings, HelpCircle, LayoutDashboard } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 992 && width <= 1600) {
        setScale(0.9);
      } else if (width >= 700 && width <= 767) {
        setScale(0.8);
      } else if (width >= 600 && width < 700) {
        setScale(0.75);
      } else if (width <= 600) {
        setScale(0.5);
      } else {
        setScale(1);
      }

      // Auto-close menu on mobile
      if (width < 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Users size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {/* Enhanced Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-[1000]">
        <div className="flex items-center justify-between h-full px-4 mx-auto max-w-[1920px]">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <Home className="h-6 w-6 text-indigo-600" />
              <span className="text-indigo-600 font-bold text-xl hidden sm:inline-block">Dashboard Pro</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Search anything..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <button className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <div className="relative w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={20} className="text-indigo-600" />
              </div>
              <span className="hidden md:inline text-sm font-medium">John Doe</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[950] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Layout with proper spacing */}
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Left Menu */}
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-[900] 
            ${isMenuOpen ? 'w-64' : 'w-16'} 
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <div className="p-4 relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute right-0 top-2 p-2 hover:bg-gray-100 rounded-lg text-gray-600 hidden md:block"
            >
              {isMenuOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <ul className="space-y-2 mt-8">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button className="w-full flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-gray-500">{item.icon}</span>
                    {isMenuOpen && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isMenuOpen ? 'md:ml-64' : 'md:ml-16'
          }`}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Content Area */}
            <div className="flex-1 p-4 sm:p-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { title: 'Total Users', value: '1,234', change: '+12%' },
                    { title: 'Revenue', value: '$12,345', change: '+8%' },
                    { title: 'Active Projects', value: '45', change: '+5%' }
                  ].map((stat) => (
                    <div key={stat.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                      <div className="flex items-baseline mt-2">
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    Welcome to your dashboard. Here you can monitor key metrics and manage your application.
                  </p>
                  
                  {/* Sample Content */}
                  <div className="mt-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-900">Sample Section {i + 1}</h3>
                        <p className="mt-2 text-gray-600">
                          This is a sample content section that demonstrates the scrolling behavior
                          and responsive layout of the dashboard.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-80 p-4 sm:p-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-4">
                  {['Create Project', 'Add User', 'Generate Report'].map((action) => (
                    <button
                      key={action}
                      className="w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        <p className="text-gray-600">Activity update {i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm font-semibold text-gray-800">Dashboard Pro</h4>
              <p className="text-xs text-gray-500">© 2024 All rights reserved</p>
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;