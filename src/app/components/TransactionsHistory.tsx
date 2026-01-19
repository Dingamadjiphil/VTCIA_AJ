import { ArrowLeft } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { formatNumberWithAbbreviation } from "@/utils/formatNumber";

interface TransactionsHistoryProps {
  onBack: () => void;
}

export function TransactionsHistory({ onBack }: TransactionsHistoryProps) {
  const transactions = [
    {
      id: 1,
      driver: "Jean Dupont",
      vehicle: "AB-123-CD",
      amount: 2450,
      status: "Payé",
      date: "2026-01-15",
      time: "14:30",
    },
    {
      id: 2,
      driver: "Marie Laurent",
      vehicle: "EF-456-GH",
      amount: 1820,
      status: "En attente",
      date: "2026-01-15",
      time: "12:45",
    },
    {
      id: 3,
      driver: "Ahmed Ben",
      vehicle: "IJ-789-KL",
      amount: 3120,
      status: "Payé",
      date: "2026-01-14",
      time: "18:20",
    },
    {
      id: 4,
      driver: "Sophie Martin",
      vehicle: "MN-012-OP",
      amount: 1650,
      status: "En attente",
      date: "2026-01-14",
      time: "16:15",
    },
    {
      id: 5,
      driver: "Pierre Dubois",
      vehicle: "IJ-789-KL",
      amount: 2890,
      status: "Payé",
      date: "2026-01-13",
      time: "11:30",
    },
    {
      id: 6,
      driver: "Fatima Zahra",
      vehicle: "QR-345-ST",
      amount: 2340,
      status: "Payé",
      date: "2026-01-13",
      time: "09:45",
    },
    {
      id: 7,
      driver: "Lucas Bernard",
      vehicle: "MN-012-OP",
      amount: 1950,
      status: "En attente",
      date: "2026-01-12",
      time: "15:20",
    },
    {
      id: 8,
      driver: "Emma Leroy",
      vehicle: "QR-345-ST",
      amount: 2780,
      status: "Payé",
      date: "2026-01-12",
      time: "13:10",
    },
    {
      id: 9,
      driver: "Thomas Martin",
      vehicle: "AB-123-CD",
      amount: 2120,
      status: "Payé",
      date: "2026-01-11",
      time: "17:30",
    },
    {
      id: 10,
      driver: "Jean Dupont",
      vehicle: "AB-123-CD",
      amount: 1890,
      status: "En attente",
      date: "2026-01-11",
      time: "10:15",
    },
    {
      id: 11,
      driver: "Marie Laurent",
      vehicle: "EF-456-GH",
      amount: 2560,
      status: "Payé",
      date: "2026-01-10",
      time: "14:45",
    },
    {
      id: 12,
      driver: "Ahmed Ben",
      vehicle: "IJ-789-KL",
      amount: 3340,
      status: "Payé",
      date: "2026-01-10",
      time: "12:20",
    },
    {
      id: 13,
      driver: "Sophie Martin",
      vehicle: "MN-012-OP",
      amount: 1720,
      status: "Payé",
      date: "2026-01-09",
      time: "16:50",
    },
    {
      id: 14,
      driver: "Pierre Dubois",
      vehicle: "IJ-789-KL",
      amount: 2450,
      status: "En attente",
      date: "2026-01-09",
      time: "11:40",
    },
    {
      id: 15,
      driver: "Fatima Zahra",
      vehicle: "QR-345-ST",
      amount: 2890,
      status: "Payé",
      date: "2026-01-08",
      time: "15:30",
    },
  ];

  const stats = {
    totalPaid: transactions
      .filter((t) => t.status === "Payé")
      .reduce((sum, t) => sum + t.amount, 0),
    totalPending: transactions
      .filter((t) => t.status === "En attente")
      .reduce((sum, t) => sum + t.amount, 0),
    paidCount: transactions.filter((t) => t.status === "Payé").length,
    pendingCount: transactions.filter((t) => t.status === "En attente").length,
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
          HISTORIQUE DES TRANSACTIONS
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Suivi complet des paiements par chauffeur
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL PAYÉ</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.totalPaid)}
          </p>
          <p className="text-white/60 text-sm mt-2">
            {stats.paidCount} transactions
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">EN ATTENTE</p>
          <p className="text-3xl md:text-4xl font-bold text-red-500">
            {formatNumberWithAbbreviation(stats.totalPending)}
          </p>
          <p className="text-white/60 text-sm mt-2">
            {stats.pendingCount} transactions
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL TRANSACTIONS</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {transactions.length}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">MONTANT MOYEN</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {Math.round(
              transactions.reduce((sum, t) => sum + t.amount, 0) /
                transactions.length,
            ).toLocaleString()}{" "}
            F
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
          TOUTES LES TRANSACTIONS
        </h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-black/50 border border-white/10 p-3 md:p-4 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">
                      {transaction.driver.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{transaction.driver}</p>
                    <p className="text-white/60 text-sm">
                      Véhicule: {transaction.vehicle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <div className="text-left sm:text-right">
                    <p className="text-white/60 text-sm">DATE</p>
                    <p className="text-white font-medium">{transaction.date}</p>
                    <p className="text-white/40 text-xs">{transaction.time}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-white/60 text-sm">MONTANT</p>
                    <p
                      className={`font-bold text-lg md:text-xl ${transaction.status === "En attente" ? "text-red-500" : "text-white"}`}
                    >
                      {transaction.amount.toLocaleString()} F
                    </p>
                  </div>

                  <div className="w-full sm:w-32">
                    <Badge
                      className={
                        transaction.status === "Payé"
                          ? "bg-white/10 text-white border-white/20 w-full justify-center"
                          : "bg-red-500/10 text-red-500 border-red-500/20 w-full justify-center"
                      }
                    >
                      {transaction.status}
                    </Badge>
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
