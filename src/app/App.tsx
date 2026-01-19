import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Dashboard } from "@/app/components/Dashboard";
import { Vehicles } from "@/app/components/Vehicles";
import { Drivers } from "@/app/components/Drivers";
import { DriverApprovals } from "@/app/components/DriverApprovals";
import { Contraventions } from "@/app/components/Contraventions";
import { Alertes } from "@/app/components/Alertes";
import { Groups } from "@/app/components/Groups";
import { Settings } from "@/app/components/Settings";
import { TransactionsHistory } from "@/app/components/TransactionsHistory";
import { ExpensesHistory } from "@/app/components/ExpensesHistory";
import { useTheme } from "@/app/components/ThemeContext";
import { Menu } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showTransactionsHistory, setShowTransactionsHistory] = useState(false);
  const [showExpensesHistory, setShowExpensesHistory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const renderContent = () => {
    if (showTransactionsHistory) {
      return (
        <TransactionsHistory onBack={() => setShowTransactionsHistory(false)} />
      );
    }

    if (showExpensesHistory) {
      return <ExpensesHistory onBack={() => setShowExpensesHistory(false)} />;
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            onNavigateToTransactions={() => setShowTransactionsHistory(true)}
            onNavigateToExpenses={() => setShowExpensesHistory(true)}
          />
        );
      case "vehicules":
        return <Vehicles />;
      case "chauffeurs":
        return <Drivers />;
      case "approbations":
        return <DriverApprovals />;
      case "contraventions":
        return <Contraventions />;
      case "alertes":
        return <Alertes />;
      case "groupes":
        return <Groups />;
      case "parametres":
        return <Settings />;
      default:
        return (
          <Dashboard
            onNavigateToTransactions={() => setShowTransactionsHistory(true)}
            onNavigateToExpenses={() => setShowExpensesHistory(true)}
          />
        );
    }
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${theme === "sombre" ? "bg-[#0a0a0a]" : "bg-white"}`}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false); // Close sidebar on mobile after selection
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden bg-black border-b border-white/10 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="text-white font-bold text-xl">JET</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
