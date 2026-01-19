import logoJet from "../../assets/fc371d0f2e60d9c1c67dce24118376b36d2c0cf7.png";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const handleLogout = () => {
    // TODO: Implement logout logic
    alert("Fonction de déconnexion à implémenter");
  };

  const menuItems = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "vehicules", label: "VÉHICULES" },
    { id: "chauffeurs", label: "CHAUFFEURS" },
    { id: "approbations", label: "INSCRIPTIONS" },
    { id: "contraventions", label: "CONTRAVENTIONS" },
    { id: "alertes", label: "ALERTES" },
    { id: "groupes", label: "GROUPES" },
    { id: "parametres", label: "PARAMÈTRES" },
  ];

  return (
    <div className="w-64 h-screen bg-black border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={logoJet}
              alt="JET Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-bold text-xl italic">JET</span>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 transition-all ${
                isActive
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <span className="text-black font-bold">MV</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Marcus V.</p>
            <p className="text-white/40 text-xs">Administrateur</p>
          </div>
          <button
            className="text-white/60 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
