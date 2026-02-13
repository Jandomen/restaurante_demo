'use client';

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, UtensilsCrossed, ClipboardList, Receipt, Settings,
  Plus, Download, CheckCircle2, AlertCircle, Clock, User, FileText,
  MapPin, TrendingUp, Search, ArrowRight, ExternalLink, Loader2,
  Printer, Trash2, Save, Coffee, ShoppingBag, Menu as MenuIcon, X
} from 'lucide-react';

// Importaciones de la nueva arquitectura
import { NavItem } from '../src/components/NavItem';
import { StatCard } from '../src/components/StatCard';
import { WelcomeScreen } from '../src/components/WelcomeScreen';
import { facturaService } from '../src/services/facturaService';
import { Invoice } from '../src/models/Factura';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };
  const [showWelcome, setShowWelcome] = useState(true);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [step, setStep] = useState(1);
  const [isTimbrando, setIsTimbrando] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    rfc: '',
    useCfdi: 'G03 - Gastos en general',
    cp: '',
    amount: 845.00
  });

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Búsqueda
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv =>
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.rfc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [invoices, searchQuery]);

  // Estadísticas
  const statsSummary = useMemo(() => {
    const totalRaw = invoices.reduce((acc, inv) => inv.status === 'Timbrada' ? acc + inv.amount : acc, 0);
    const timbradas = invoices.filter(inv => inv.status === 'Timbrada').length;
    const pendientes = invoices.filter(inv => inv.status === 'Pendiente').length;
    return {
      total: `$${totalRaw.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      timbradas: timbradas.toString(),
      pendientes: pendientes.toString()
    };
  }, [invoices]);

  const handleTimbrar = async () => {
    try {
      setIsTimbrando(true);
      const invoice = await facturaService.timbrarFactura(newInvoice, invoices.length);
      setInvoices([invoice, ...invoices]);
      setSelectedInvoice(invoice);
      setIsTimbrando(false);
      setStep(3);
    } catch (error: any) {
      alert(error.message);
      setIsTimbrando(false);
    }
  };

  const handleDownloadReport = () => {
    showToast('Preparando reporte consolidado del día... ¡Descarga iniciada!');
  };

  // Estados de UI y Datos
  const [selectedCer, setSelectedCer] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Comidas', price: '' });

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Tacos Al Pastor', category: 'Comidas', price: 120 },
    { id: 2, name: 'Enchiladas Suizas', category: 'Comidas', price: 165 },
    { id: 3, name: 'Jugo de Naranja', category: 'Bebidas', price: 45 },
  ]);

  const [activeTickets, setActiveTickets] = useState([
    { id: '842', table: 'Mesa 4', amount: 845.00 },
    { id: '843', table: 'Mesa 12', amount: 1250.00 },
    { id: '844', table: 'Mesa 8', amount: 430.50 }
  ]);

  const [orders, setOrders] = useState([
    { id: '101', table: 'Mesa 2', items: '2x Tacos Al Pastor, 1x Coca Cola', status: 'En preparación', time: '5 min' },
    { id: '102', table: 'Mesa 5', items: '1x Enchiladas Suizas', status: 'Listo', time: '12 min' },
  ]);

  const handleFileUpload = (type: 'cer' | 'key') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (type === 'cer') setSelectedCer(file.name);
        else setSelectedKey(file.name);
      }
    };
    input.click();
  };

  const handleDeleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleUpdateOrderStatus = (id: string) => {
    setOrders(orders.map(order =>
      order.id === id
        ? { ...order, status: order.status === 'Listo' ? 'Entregado' : 'Listo' }
        : order
    ));
  };

  const handleAddMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems([{
        id: menuItems.length + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price)
      }, ...menuItems]);
      setShowAddMenuModal(false);
      setNewItem({ name: '', category: 'Comidas', price: '' });
      showToast('¡Platillo añadido con éxito!');
    }
  };

  const closeAndReset = () => {
    setShowInvoiceModal(false);
    setShowPdfPreview(false);
    setTimeout(() => {
      setStep(1);
      setNewInvoice({ customer: '', rfc: '', useCfdi: 'G03 - Gastos en general', cp: '', amount: 845.00 });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1E293B] font-sans">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center text-white shadow-md">
            <UtensilsCrossed size={16} strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-black tracking-tight text-slate-900">GastroManager</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200/60 p-8 z-[70] transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 overflow-y-auto custom-scrollbar'} lg:block`}>
        <div className="hidden lg:flex items-center gap-3 mb-12 px-2">
          <div className="w-11 h-11 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
            <UtensilsCrossed size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">GastroManager</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Restaurante Pro</p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => { setActiveTab('Dashboard'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={UtensilsCrossed} label="Menú" active={activeTab === 'Menú'} onClick={() => { setActiveTab('Menú'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={ClipboardList} label="Pedidos" active={activeTab === 'Pedidos'} onClick={() => { setActiveTab('Pedidos'); setIsMobileMenuOpen(false); }} />
          <NavItem icon={Receipt} label="Facturación" active={activeTab === 'Facturación'} onClick={() => { setActiveTab('Facturación'); setIsMobileMenuOpen(false); }} highlight />
          <NavItem icon={Settings} label="Configuración" active={activeTab === 'Configuración'} onClick={() => { setActiveTab('Configuración'); setIsMobileMenuOpen(false); }} />
        </nav>

        <div className="mt-12">
          <button onClick={() => { if (confirm('¿Borrar datos?')) setInvoices([]); }} className="w-full flex items-center justify-center gap-2 group p-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold text-xs uppercase tracking-widest">
            <Trash2 size={16} /> Borrar Todo
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-72 p-6 md:p-10 max-w-[1600px] mx-auto">
        {activeTab === 'Dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-gradient">Panel de Control</h2>
                <div className="flex items-center gap-2 mt-1.5"><p className="text-sm font-medium text-slate-500">Certificados SAT: <span className="text-green-600 font-bold">Vigentes</span></p></div>
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button onClick={handleDownloadReport} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm"><Download size={18} /> Reporte</button>
                <button onClick={() => setShowInvoiceModal(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95"><Plus size={18} /> Nueva Factura</button>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <StatCard title="Ventas del Día" value={statsSummary.total} trend="+12.5%" isPositive icon={TrendingUp} delay="0ms" />
              <StatCard title="Facturas Emitidas" value={statsSummary.timbradas} trend="+5.2%" isPositive icon={CheckCircle2} delay="100ms" />
              <StatCard title="Por Facturar" value={statsSummary.pendientes} trend="-2.4%" isPositive={false} icon={Clock} delay="200ms" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden min-h-[400px]">
                <div className="p-5 md:p-7 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 sticky lg:top-0 z-20 bg-white/50 backdrop-blur-sm">
                  <h3 className="font-black text-lg text-slate-800">Historial de Facturación</h3>
                  <div className="relative group w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Buscar RFC..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-orange-500 transition-all w-full uppercase" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {filteredInvoices.length > 0 ? (
                    <table className="w-full text-left min-w-[600px]">
                      <thead><tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-wider text-slate-400"><th className="px-7 py-4">Cliente / RFC</th><th className="px-7 py-4">Monto</th><th className="px-7 py-4">Estado</th><th className="px-7 py-4">Fecha</th><th className="px-7 py-4 text-right">Acciones</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-7 py-5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">{inv.customer[0]}</div><div><p className="font-black text-sm text-slate-800">{inv.customer}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{inv.rfc}</p></div></div></td>
                            <td className="px-7 py-5 font-black text-sm text-slate-700">${inv.amount.toLocaleString()}</td>
                            <td className="px-7 py-5"><span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700 flex items-center gap-1.5 w-fit"><div className="w-1 h-1 rounded-full bg-green-500" />{inv.status}</span></td>
                            <td className="px-7 py-5 text-xs font-bold text-slate-400">{inv.date}</td>
                            <td className="px-7 py-5 text-right"><button onClick={() => { setSelectedInvoice(inv); setShowPdfPreview(true); }} className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900"><ExternalLink size={16} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6 relative">
                        <Receipt size={40} className="text-slate-200" />
                        <div className="absolute top-0 right-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 animate-bounce">
                          <Plus size={16} />
                        </div>
                      </div>
                      <h4 className="font-black text-slate-900 text-lg mb-2">No hay facturas emitidas</h4>
                      <p className="text-slate-400 text-sm max-w-[280px] font-medium leading-relaxed">
                        Parece que no has generado CFDI hoy. Inicia una nueva factura para ver el historial.
                      </p>
                      <button
                        onClick={() => setShowInvoiceModal(true)}
                        className="mt-8 text-orange-500 font-black text-xs uppercase tracking-widest hover:text-orange-600 transition-colors"
                      >
                        + Crear Primera Factura
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <aside className="space-y-6">
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2">Tickets Pendientes</h3>
                    <p className="text-slate-400 text-sm mb-6">Emite facturas al instante desde tickets de mesa.</p>
                    <div className="space-y-3">
                      {activeTickets.map(ticket => (
                        <div key={ticket.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all"
                          onClick={() => { setNewInvoice({ ...newInvoice, amount: ticket.amount }); setShowInvoiceModal(true); }}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{ticket.table} • #{ticket.id}</span>
                            <span className="text-xs font-bold">${ticket.amount.toLocaleString()}</span>
                          </div>
                          <button className="mt-3 w-full bg-white text-slate-900 py-2.5 rounded-xl text-[10px] font-black shadow-lg uppercase">
                            Facturar Ticket
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px]"></div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {activeTab === 'Menú' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight text-gradient">Gestión del Menú</h2>
                <p className="text-slate-500 font-medium">Personaliza platillos y precios en tiempo real</p>
              </div>
              <button
                onClick={() => setShowAddMenuModal(true)}
                className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Nuevo Platillo
              </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                      <Coffee size={24} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-colors"><Settings size={14} /></button>
                      <button onClick={() => handleDeleteMenuItem(item.id)} className="p-2 bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="text-gradient">
                    <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{item.name}</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.category}</span>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-2xl font-black text-orange-500">${item.price}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Pedidos' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <header className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight text-gradient">Monitor de Comandas</h2>
              <p className="text-slate-500 font-medium">Gestión de cocina en tiempo real</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 hover:shadow-lg transition-all border-l-[12px] border-l-slate-900">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Orden #{order.id}</span>
                      <h3 className="text-2xl font-black text-slate-900">{order.table}</h3>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest 
                      ${order.status === 'Listo' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}
                    `}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium text-sm mb-8 leading-relaxed">
                    {order.items}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                      <Clock size={14} /> {order.time}
                    </div>
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id)}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                    >
                      {order.status === 'Listo' ? 'Marcar Entregado' : 'Marcar Listo'}
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="col-span-full bg-white rounded-[2rem] p-16 text-center border border-slate-200 text-slate-400">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-black text-slate-900">Sin comandas activas</h3>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Configuración' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl">
            <header className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight text-gradient">Configuración SAT</h2>
              <p className="text-slate-500 font-medium mt-1">Sube tus certificados oficiales y datos fiscales</p>
            </header>
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 space-y-10">
              <div className="text-gradient">
                <div className="flex gap-4 mb-8 items-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900">Sellos Digitales (CSD)</h3>
                    <p className="text-slate-500 text-sm">Validación oficial ante el SAT</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() => handleFileUpload('cer')}
                    className="border-2 border-dashed border-slate-200 p-10 rounded-[2rem] text-center hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all"
                  >
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest">
                      {selectedCer ? `✅ ${selectedCer}` : 'Subir archivo .CER'}
                    </p>
                  </div>
                  <div
                    onClick={() => handleFileUpload('key')}
                    className="border-2 border-dashed border-slate-200 p-10 rounded-[2rem] text-center hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all"
                  >
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest">
                      {selectedKey ? `✅ ${selectedKey}` : 'Subir archivo .KEY'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  showToast('¡Configuración guardada exitosamente!', 'success');
                  setActiveTab('Dashboard');
                }}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black transition-all hover:bg-slate-800 flex items-center justify-center gap-2 shadow-xl shadow-slate-100"
              >
                <Save size={18} /> GUARDAR CONFIGURACIÓN
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 my-auto">
            {step === 1 && (
              <div className="p-8 md:p-12 text-gradient">
                <header className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">Información Fiscal</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Emisión de CFDI 4.0 Oficial</p>
                  </div>
                  <button onClick={closeAndReset} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-black">✕</button>
                </header>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">RFC</label><input type="text" placeholder="RFC123456ABC" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-black uppercase" value={newInvoice.rfc} onChange={(e) => setNewInvoice({ ...newInvoice, rfc: e.target.value.toUpperCase() })} /></div>
                    <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nombre</label><input type="text" placeholder="Razón Social" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-black" value={newInvoice.customer} onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })} /></div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-between items-end">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monto (MXN)</p><div className="flex items-baseline gap-1 text-2xl font-black text-slate-900"><span>$</span><input type="number" className="bg-transparent outline-none w-32 border-b-2 border-slate-200" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) || 0 })} /></div></div>
                    <button onClick={() => setStep(2)} disabled={!newInvoice.rfc || !newInvoice.customer} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs hover:bg-slate-800 disabled:opacity-30">CONTINUAR</button>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="p-12 text-center items-center">
                <Receipt size={48} className="mx-auto mb-6 text-orange-500" />
                <h3 className="text-2xl font-black text-slate-900 mb-2">Revisión Final</h3>
                <p className="text-slate-500 mb-10 uppercase text-xs font-bold tracking-widest">RFC: {newInvoice.rfc}</p>
                <button onClick={handleTimbrar} disabled={isTimbrando} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-4">{isTimbrando ? <><Loader2 className="animate-spin" /> TIMBRANDO...</> : <>TIMBRAR CFDI</>}</button>
                <button onClick={() => setStep(1)} className="mt-4 text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">Atrás</button>
              </div>
            )}
            {step === 3 && (
              <div className="p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-10 leading-tight">Factura Timbrada</h3>
                <button onClick={closeAndReset} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest">VOLVER AL PANEL</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PDF View */}
      {showPdfPreview && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/90 z-[200] flex items-center justify-center p-2 md:p-10 animate-in fade-in">
          <div className="bg-[#525659] w-full max-w-5xl h-full rounded-2xl overflow-hidden flex flex-col items-center">
            <div className="w-full bg-[#323639] py-3 px-6 flex justify-between items-center"><span className="text-white text-xs font-bold">FE_{selectedInvoice.id}.pdf</span><button onClick={() => setShowPdfPreview(false)} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-xs font-black transition-all">CERRAR</button></div>
            <div className="flex-1 overflow-y-auto p-4 md:p-10 w-full flex justify-center custom-scrollbar">
              <div className="bg-white w-full max-w-[800px] min-h-[1100px] p-10 md:p-16 text-slate-900 font-sans shadow-2xl">
                <header className="border-b-2 border-slate-900 pb-8 mb-10 flex justify-between items-start">
                  <div><h1 className="text-xl font-black">GASTRO SOLUTIONS S.A. DE C.V.</h1><p className="text-xs font-bold text-slate-500">RFC: GSOL123456ABC</p></div>
                  <div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase">Factura</p><p className="text-2xl font-black">A-{selectedInvoice.id}</p></div>
                </header>
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div><p className="text-[10px] font-black text-slate-400 mb-1 uppercase">Receptor</p><p className="font-black text-sm uppercase">{selectedInvoice.customer}</p><p className="text-xs font-bold">RFC: {selectedInvoice.rfc}</p></div>
                  <div className="text-right"><p className="text-[10px] font-black text-slate-400 mb-1 uppercase">Detalles</p><p className="text-xs">Fecha: {selectedInvoice.date}</p><p className="text-[10px] font-black uppercase mt-2">Total</p><p className="text-xl font-black">${selectedInvoice.amount.toLocaleString()} MXN</p></div>
                </div>
                <table className="w-full border-y-2 border-slate-900 mb-10 text-xs text-left"><thead><tr><th className="py-2">Descripción</th><th className="py-2 text-right">Importe</th></tr></thead><tbody><tr><td className="py-4 font-bold">CONSUMO DE ALIMENTOS Y BEBIDAS</td><td className="py-4 text-right font-black">${selectedInvoice.amount.toLocaleString()}</td></tr></tbody></table>
                <div className="text-center italic text-[10px] text-slate-400 mt-64 border-t pt-4">Representación impresa de un CFDI 4.0 - Sandbox</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Nuevo Platillo */}
      {showAddMenuModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden animate-in zoom-in-95 my-auto shadow-[0_32px_128px_rgba(0,0,0,0.15)]">
            <div className="p-8 md:p-10">
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">Nuevo Platillo</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Añadir al menú digital</p>
                </div>
                <button onClick={() => setShowAddMenuModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-black">✕</button>
              </header>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nombre del Platillo</label>
                  <input
                    type="text"
                    placeholder="Ej. Hamburguesa Gourmet"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-black focus:border-orange-500 outline-none transition-all"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Categoría</label>
                    <select
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-black appearance-none cursor-pointer outline-none focus:border-orange-500"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    >
                      <option>Desayunos</option>
                      <option>Comidas</option>
                      <option>Bebidas</option>
                      <option>Postres</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Precio (MXN)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-black focus:border-orange-500 outline-none transition-all"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddMenuItem}
                  disabled={!newItem.name || !newItem.price}
                  className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-sm shadow-2xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30 uppercase tracking-widest mt-4"
                >
                  Confirmar y Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Notificación Toast (Flotante) */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-5 duration-500">
          <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-md
            ${toast.type === 'success' ? 'bg-white/90 border-green-100 text-slate-900' : 'bg-slate-900 text-white border-slate-800'}
          `}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center
              ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-white/10 text-white'}
            `}>
              <CheckCircle2 size={16} />
            </div>
            <p className="font-black text-sm tracking-tight">{toast.message}</p>
          </div>
        </div>
      )}

      {showWelcome && (
        <WelcomeScreen onEnter={() => setShowWelcome(false)} />
      )}
    </div>
  );
};

export default Dashboard;
