import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';



const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile, shown on click or on larger screens */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 mr-2 rounded-md text-primary hover:bg-slate-200 transition-colors"
          >
            <Menu size={20} />
          </button>
        </Header>
        
        {/* Content Area with padding */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;