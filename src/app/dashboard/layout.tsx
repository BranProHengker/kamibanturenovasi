export const metadata = {
  title: 'Admin Dashboard | KamiBantuRenovasi',
  description: 'Pengelolaan data website KamiBantuRenovasi',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      {/* Top Navigation Bar for Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark flex items-center justify-center">
              <span className="text-gold font-bold text-lg leading-none">K</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Admin Dashboard</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
