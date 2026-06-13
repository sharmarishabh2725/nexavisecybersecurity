import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, MessageSquare, Database, Plus, Trash2, ShieldCheck, RefreshCw, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const AdminDashboard = () => {
  const { user, token, loading } = useAuth();
  const { refreshData } = useData();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'analytics' | 'inquiries' | 'content'>('analytics');
  
  const [stats, setStats] = useState({ totalVisitors: 0, activeUsers: 0 });
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  // Data for Content Management
  const [sectors, setSectors] = useState<any[]>([]);
  const [sectorServices, setSectorServices] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  
  // Forms
  const [newSector, setNewSector] = useState({ id: '', name: '', icon: 'Shield', description: '' });
  const [newSectorService, setNewSectorService] = useState({ sector_id: '', name: '', description: '' });
  const [newServiceCategory, setNewServiceCategory] = useState({ id: '', name: '', icon: 'Shield', description: '' });
  const [newService, setNewService] = useState({ category_id: '', name: '', icon: 'Shield', description: '' });

  // Drill-down UI States
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [sectorMode, setSectorMode] = useState<'list' | 'add_sub' | 'manage_sub'>('list');
  
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceMode, setServiceMode] = useState<'list' | 'add_sub' | 'manage_sub'>('list');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'inquiries') fetchInquiries();
    if (activeTab === 'content') {
      fetchSectors();
      fetchSectorServices();
      fetchServiceCategories();
      fetchServices();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {}
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        console.error("Failed to fetch inquiries:", data);
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
      setInquiries([]);
    }
  };

  const fetchSectors = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/sectors');
      const data = await res.json();
      if (Array.isArray(data)) setSectors(data);
    } catch (e) {}
  };

  const fetchSectorServices = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/sector_services');
      const data = await res.json();
      if (Array.isArray(data)) setSectorServices(data);
    } catch (e) {}
  };

  const fetchServiceCategories = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/service_categories');
      const data = await res.json();
      if (Array.isArray(data)) setServiceCategories(data);
    } catch (e) {}
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/services');
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (e) {}
  };

  const handleAddSector = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/sectors', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSector)
      });
      setNewSector({ id: '', name: '', icon: 'Shield', description: '' });
      fetchSectors();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteSector = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/sectors/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSectors();
      refreshData();
    } catch (e) {}
  };

  const handleAddSectorService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/sector_services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSectorService)
      });
      setNewSectorService({ sector_id: '', name: '', description: '' });
      fetchSectorServices();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteSectorService = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/sector_services/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSectorServices();
      refreshData();
    } catch (e) {}
  };

  const handleAddServiceCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/service_categories', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newServiceCategory)
      });
      setNewServiceCategory({ id: '', name: '', icon: 'Shield', description: '' });
      fetchServiceCategories();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteServiceCategory = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/service_categories/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchServiceCategories();
      refreshData();
    } catch (e) {}
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newService)
      });
      setNewService({ category_id: '', name: '', icon: 'Shield', description: '' });
      fetchServices();
      refreshData();
    } catch (e) {}
  };

  const handleDeleteService = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/services/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchServices();
      refreshData();
    } catch (e) {}
  };

  // Render Tabs
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Visitors</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stats.totalVisitors}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Connections</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stats.activeUsers}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-cyan-500" /> 
          Contact Form Submissions
        </h3>
        <button onClick={fetchInquiries} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-black/20 text-xs uppercase tracking-widest text-gray-500">
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Date</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Name</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Email</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Sector/Service</th>
              <th className="p-4 border-b border-gray-200 dark:border-white/10">Message</th>
            </tr>
          </thead>
          <tbody>
            {(!inquiries || inquiries.length === 0) ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No inquiries yet.</td>
              </tr>
            ) : inquiries.map((inq, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {new Date(inq.created_at).toLocaleString()}
                </td>
                <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                  {inq.first_name} {inq.last_name}
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{inq.email}</td>
                <td className="p-4 text-xs">
                  <span className="block text-cyan-600 dark:text-cyan-400">{inq.sector || 'N/A'}</span>
                  <span className="block text-gray-500">{inq.service || 'N/A'}</span>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate" title={inq.message}>
                  {inq.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* SECTORS COLUMN */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {sectorMode === 'list' ? (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-500" /> 
                Main Sectors
              </h3>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <form onSubmit={handleAddSector} className="flex gap-2">
                <input required placeholder="ID" value={newSector.id} onChange={e => setNewSector({...newSector, id: e.target.value})} className="w-1/3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <input required placeholder="Name" value={newSector.name} onChange={e => setNewSector({...newSector, name: e.target.value})} className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-400 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sectors.map(s => (
                <div key={s.id} onClick={() => { setSelectedSector(s); setSectorMode('manage_sub'); }} className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl group border-b border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{s.name}</h4>
                    <p className="text-xs text-gray-500">{s.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteSector(s.id); }} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center gap-4">
              <button onClick={() => { setSectorMode('list'); setSelectedSector(null); }} className="p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSector?.name}</h3>
                <p className="text-xs text-blue-500">Sector Sub-Offerings</p>
              </div>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex gap-2">
              <button 
                onClick={() => setSectorMode('add_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${sectorMode === 'add_sub' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Add Offering
              </button>
              <button 
                onClick={() => setSectorMode('manage_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${sectorMode === 'manage_sub' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Manage Offerings
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sectorMode === 'add_sub' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  newSectorService.sector_id = selectedSector.id;
                  handleAddSectorService(e);
                  setSectorMode('manage_sub');
                }} className="space-y-4">
                  <input required placeholder="Offering Name" value={newSectorService.name} onChange={e => setNewSectorService({...newSectorService, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                  <textarea placeholder="Description (Optional)" value={newSectorService.description} onChange={e => setNewSectorService({...newSectorService, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none resize-none" rows={3} />
                  <button type="submit" className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-blue-400 transition-colors">
                    <Plus className="w-4 h-4" /> Save Sub-Offering
                  </button>
                </form>
              )}
              {sectorMode === 'manage_sub' && (
                <div className="space-y-2">
                  {sectorServices.filter(ss => ss.sector_id === selectedSector?.id).length === 0 ? (
                    <p className="text-center text-sm text-gray-500 mt-8">No offerings added yet.</p>
                  ) : (
                    sectorServices.filter(ss => ss.sector_id === selectedSector?.id).map(ss => (
                      <div key={ss.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{ss.name}</span>
                        <button onClick={() => handleDeleteSectorService(ss.id)} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* SERVICES COLUMN */}
      <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {serviceMode === 'list' ? (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-500" /> 
                Main Services
              </h3>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <form onSubmit={handleAddServiceCategory} className="flex gap-2">
                <input required placeholder="ID" value={newServiceCategory.id} onChange={e => setNewServiceCategory({...newServiceCategory, id: e.target.value})} className="w-1/3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <input required placeholder="Name" value={newServiceCategory.name} onChange={e => setNewServiceCategory({...newServiceCategory, name: e.target.value})} className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                <button type="submit" className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-purple-400 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {serviceCategories.map(sc => (
                <div key={sc.id} onClick={() => { setSelectedService(sc); setServiceMode('manage_sub'); }} className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl group border-b border-transparent hover:border-gray-100 dark:hover:border-white/5 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{sc.name}</h4>
                    <p className="text-xs text-gray-500">{sc.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteServiceCategory(sc.id); }} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center gap-4">
              <button onClick={() => { setServiceMode('list'); setSelectedService(null); }} className="p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedService?.name}</h3>
                <p className="text-xs text-purple-500">Sub-Services</p>
              </div>
            </div>
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex gap-2">
              <button 
                onClick={() => setServiceMode('add_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${serviceMode === 'add_sub' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Add Sub-Service
              </button>
              <button 
                onClick={() => setServiceMode('manage_sub')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${serviceMode === 'manage_sub' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                Manage Sub-Services
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {serviceMode === 'add_sub' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  newService.category_id = selectedService.id;
                  handleAddService(e);
                  setServiceMode('manage_sub');
                }} className="space-y-4">
                  <input required placeholder="Service Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none" />
                  <textarea placeholder="Description (Optional)" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none resize-none" rows={3} />
                  <button type="submit" className="w-full flex justify-center items-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-purple-400 transition-colors">
                    <Plus className="w-4 h-4" /> Save Sub-Service
                  </button>
                </form>
              )}
              {serviceMode === 'manage_sub' && (
                <div className="space-y-2">
                  {services.filter(s => s.category_id === selectedService?.id).length === 0 ? (
                    <p className="text-center text-sm text-gray-500 mt-8">No sub-services added yet.</p>
                  ) : (
                    services.filter(s => s.category_id === selectedService?.id).map(s => (
                      <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{s.name}</span>
                        <button onClick={() => handleDeleteService(s.id)} className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-[#05080c] relative">
      <Helmet>
        <title>Admin Dashboard | Nexavise</title>
      </Helmet>
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-[0] cyber-grid opacity-10 pointer-events-none" />
      <div className="orb orb-cyan w-[800px] h-[800px] top-[-200px] right-[-200px] z-[0] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-xl sticky top-32">
              <div className="mb-8 px-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-500" />
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">Admin Hub</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Command Center</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'analytics' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Activity className="w-4 h-4" /> Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'inquiries' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <MessageSquare className="w-4 h-4" /> Inquiries
                </button>
                <button 
                  onClick={() => setActiveTab('content')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'content' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                >
                  <Database className="w-4 h-4" /> Content CMS
                </button>
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'inquiries' && renderInquiries()}
              {activeTab === 'content' && renderContent()}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
