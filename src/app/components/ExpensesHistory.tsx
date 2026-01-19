import { ArrowLeft } from "lucide-react";
import { formatNumberWithAbbreviation } from "@/utils/formatNumber";

interface ExpensesHistoryProps {
  onBack: () => void;
}

export function ExpensesHistory({ onBack }: ExpensesHistoryProps) {
  const expenses = [
    {
      id: 1,
      category: "Carburant",
      vehicle: "AB-123-CD",
      amount: 450,
      description: "Plein essence",
      date: "2026-01-15",
      time: "08:30",
    },
    {
      id: 2,
      category: "Maintenance",
      vehicle: "EF-456-GH",
      amount: 1200,
      description: "Révision complète",
      date: "2026-01-15",
      time: "10:00",
    },
    {
      id: 3,
      category: "Assurance",
      vehicle: "IJ-789-KL",
      amount: 890,
      description: "Prime mensuelle",
      date: "2026-01-14",
      time: "14:00",
    },
    {
      id: 4,
      category: "Carburant",
      vehicle: "MN-012-OP",
      amount: 380,
      description: "Plein diesel",
      date: "2026-01-14",
      time: "09:15",
    },
    {
      id: 5,
      category: "Réparation",
      vehicle: "QR-345-ST",
      amount: 2340,
      description: "Changement freins",
      date: "2026-01-13",
      time: "11:30",
    },
    {
      id: 6,
      category: "Carburant",
      vehicle: "AB-123-CD",
      amount: 420,
      description: "Plein essence",
      date: "2026-01-13",
      time: "07:45",
    },
    {
      id: 7,
      category: "Péage",
      vehicle: "EF-456-GH",
      amount: 85,
      description: "Autoroute A1",
      date: "2026-01-12",
      time: "16:20",
    },
    {
      id: 8,
      category: "Maintenance",
      vehicle: "IJ-789-KL",
      amount: 650,
      description: "Vidange + filtres",
      date: "2026-01-12",
      time: "10:30",
    },
    {
      id: 9,
      category: "Carburant",
      vehicle: "MN-012-OP",
      amount: 395,
      description: "Plein diesel",
      date: "2026-01-11",
      time: "08:15",
    },
    {
      id: 10,
      category: "Parking",
      vehicle: "QR-345-ST",
      amount: 120,
      description: "Parking mensuel",
      date: "2026-01-11",
      time: "00:00",
    },
    {
      id: 11,
      category: "Assurance",
      vehicle: "AB-123-CD",
      amount: 910,
      description: "Prime mensuelle",
      date: "2026-01-10",
      time: "00:00",
    },
    {
      id: 12,
      category: "Carburant",
      vehicle: "EF-456-GH",
      amount: 410,
      description: "Plein essence",
      date: "2026-01-10",
      time: "07:30",
    },
    {
      id: 13,
      category: "Réparation",
      vehicle: "IJ-789-KL",
      amount: 780,
      description: "Remplacement pneu",
      date: "2026-01-09",
      time: "15:00",
    },
    {
      id: 14,
      category: "Carburant",
      vehicle: "MN-012-OP",
      amount: 365,
      description: "Plein diesel",
      date: "2026-01-09",
      time: "08:45",
    },
    {
      id: 15,
      category: "Péage",
      vehicle: "QR-345-ST",
      amount: 92,
      description: "Autoroute A6",
      date: "2026-01-08",
      time: "17:30",
    },
    {
      id: 16,
      category: "Maintenance",
      vehicle: "AB-123-CD",
      amount: 1450,
      description: "Contrôle technique + révision",
      date: "2026-01-08",
      time: "09:00",
    },
    {
      id: 17,
      category: "Carburant",
      vehicle: "EF-456-GH",
      amount: 435,
      description: "Plein essence",
      date: "2026-01-07",
      time: "08:00",
    },
    {
      id: 18,
      category: "Assurance",
      vehicle: "MN-012-OP",
      amount: 850,
      description: "Prime mensuelle",
      date: "2026-01-07",
      time: "00:00",
    },
  ];

  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stats = {
    total: expenses.reduce((sum, e) => sum + e.amount, 0),
    carburant: categoryTotals["Carburant"] || 0,
    maintenance:
      (categoryTotals["Maintenance"] || 0) +
      (categoryTotals["Réparation"] || 0),
    assurance: categoryTotals["Assurance"] || 0,
    autres: (categoryTotals["Péage"] || 0) + (categoryTotals["Parking"] || 0),
  };

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={20} />
          RETOUR
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          HISTORIQUE DES DÉPENSES
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Suivi complet des dépenses par véhicule
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL DÉPENSES</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.total)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">CARBURANT</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.carburant)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">MAINTENANCE</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.maintenance)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">ASSURANCE</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.assurance)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">AUTRES</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.autres)}
          </p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
          TOUTES LES DÉPENSES
        </h2>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-black/50 border border-white/10 p-3 md:p-4 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {expense.category.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{expense.category}</p>
                    <p className="text-white/60 text-sm">
                      {expense.description}
                    </p>
                    <p className="text-white/40 text-xs">
                      Véhicule: {expense.vehicle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <div className="text-left sm:text-right">
                    <p className="text-white/60 text-sm">DATE</p>
                    <p className="text-white font-medium">{expense.date}</p>
                    <p className="text-white/40 text-xs">{expense.time}</p>
                  </div>

                  <div className="text-left sm:text-right sm:w-40">
                    <p className="text-white/60 text-sm">MONTANT</p>
                    <p className="text-white font-bold text-lg md:text-xl">
                      {expense.amount.toLocaleString()} F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
