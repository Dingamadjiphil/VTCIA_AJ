import { useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatNumberWithAbbreviation } from "@/utils/formatNumber";

interface DashboardProps {
  onNavigateToTransactions?: () => void;
  onNavigateToExpenses?: () => void;
}

export function Dashboard({
  onNavigateToTransactions,
  onNavigateToExpenses,
}: DashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState("general");
  const [chartPeriod, setChartPeriod] = useState<
    "week" | "month" | "3months" | "year"
  >("month");

  const statsGeneral = [
    { label: "ACTIFS", value: "42" },
    { label: "INACTIFS", value: "8" },
    { label: "CONTRATS VENTE", value: "15" },
    { label: "CONTRATS CLASSIQUES", value: "27" },
  ];

  const statsFinances = [
    { label: "RECETTES TOTALES", value: 248500, trend: "+16.4%" },
    { label: "RECETTES EN ATTENTE", value: 32100, isPending: true },
    { label: "DÉPENSES TOTALES", value: 142300 },
    { label: "BÉNÉFICE NET", value: 106200, trend: "+8.2%" },
  ];

  const recentPayments = [
    {
      id: 1,
      driver: "Jean Dupont",
      vehicle: "AB-123-CD",
      amount: 2450,
      status: "Payé",
      date: "15/01/2026",
    },
    {
      id: 2,
      driver: "Marie Laurent",
      vehicle: "EF-456-GH",
      amount: 1820,
      status: "En attente",
      date: "15/01/2026",
    },
    {
      id: 3,
      driver: "Ahmed Ben",
      vehicle: "IJ-789-KL",
      amount: 3120,
      status: "Payé",
      date: "14/01/2026",
    },
    {
      id: 4,
      driver: "Sophie Martin",
      vehicle: "MN-012-OP",
      amount: 1650,
      status: "En attente",
      date: "14/01/2026",
    },
    {
      id: 5,
      driver: "Pierre Dubois",
      vehicle: "IJ-789-KL",
      amount: 2890,
      status: "Payé",
      date: "13/01/2026",
    },
  ];

  const recentExpenses = [
    {
      id: 1,
      category: "Carburant",
      vehicle: "AB-123-CD",
      amount: 450,
      date: "15/01/2026",
    },
    {
      id: 2,
      category: "Maintenance",
      vehicle: "EF-456-GH",
      amount: 1200,
      date: "15/01/2026",
    },
    {
      id: 3,
      category: "Assurance",
      vehicle: "IJ-789-KL",
      amount: 890,
      date: "14/01/2026",
    },
    {
      id: 4,
      category: "Carburant",
      vehicle: "MN-012-OP",
      amount: 380,
      date: "14/01/2026",
    },
    {
      id: 5,
      category: "Réparation",
      vehicle: "QR-345-ST",
      amount: 2340,
      date: "13/01/2026",
    },
  ];

  const alerts = [
    {
      id: 1,
      driver: "Jean Dupont",
      vehicle: "AB-123-CD",
      message: "Entretien requis - 180,000 km atteints",
      severity: "warning",
      time: "14:30",
    },
    {
      id: 2,
      driver: "Marie Laurent",
      vehicle: "EF-456-GH",
      message: "Accident mineur - Pare-choc avant",
      severity: "high",
      time: "12:45",
    },
    {
      id: 3,
      driver: "Ahmed Ben",
      vehicle: "IJ-789-KL",
      message: "Problème technique - Voyant moteur",
      severity: "high",
      time: "10:20",
    },
    {
      id: 4,
      driver: "Sophie Martin",
      vehicle: "MN-012-OP",
      message: "Contrôle technique expiré",
      severity: "warning",
      time: "09:15",
    },
  ];

  const recentVehicles = [
    {
      id: 1,
      plate: "AB-123-CD",
      type: "Classique",
      status: "Actif",
      earnings: "12,450 F",
    },
    {
      id: 2,
      plate: "EF-456-GH",
      type: "Vente",
      status: "Actif",
      earnings: "8,230 F",
    },
    {
      id: 3,
      plate: "IJ-789-KL",
      type: "Classique",
      status: "Actif",
      earnings: "15,670 F",
    },
    {
      id: 4,
      plate: "MN-012-OP",
      type: "Classique",
      status: "Inactif",
      earnings: "9,540 F",
    },
  ];

  const savingsHistory = [
    {
      id: 1,
      date: "15/01/2026",
      amount: 5000,
      method: "Virement bancaire",
      driver: "Jean Dupont",
    },
    {
      id: 2,
      date: "10/01/2026",
      amount: 3500,
      method: "Espèces",
      driver: "Marie Laurent",
    },
    {
      id: 3,
      date: "08/01/2026",
      amount: 4200,
      method: "Virement bancaire",
      driver: "Ahmed Ben",
    },
    {
      id: 4,
      date: "05/01/2026",
      amount: 2800,
      method: "Chèque",
      driver: "Sophie Martin",
    },
    {
      id: 5,
      date: "03/01/2026",
      amount: 6100,
      method: "Virement bancaire",
      driver: "Pierre Dubois",
    },
    {
      id: 6,
      date: "01/01/2026",
      amount: 3900,
      method: "Espèces",
      driver: "Emma Leroy",
    },
  ];

  const insuranceHistory = [
    {
      id: 1,
      date: "15/01/2026",
      amount: 890,
      type: "Responsabilité civile",
      vehicle: "AB-123-CD",
    },
    {
      id: 2,
      date: "15/01/2026",
      amount: 1200,
      type: "Tous risques",
      vehicle: "EF-456-GH",
    },
    {
      id: 3,
      date: "14/01/2026",
      amount: 750,
      type: "Au tiers",
      vehicle: "IJ-789-KL",
    },
    {
      id: 4,
      date: "12/01/2026",
      amount: 980,
      type: "Tous risques",
      vehicle: "MN-012-OP",
    },
    {
      id: 5,
      date: "10/01/2026",
      amount: 820,
      type: "Responsabilité civile",
      vehicle: "QR-345-ST",
    },
    {
      id: 6,
      date: "08/01/2026",
      amount: 1150,
      type: "Tous risques",
      vehicle: "UV-678-WX",
    },
  ];

  const tabs = [
    { id: "general", label: "GÉNÉRAL" },
    { id: "finances", label: "FINANCES" },
    { id: "alertes", label: "ALERTES" },
    { id: "epargne", label: "ÉPARGNE" },
    { id: "assurances", label: "ASSURANCES" },
  ];

  // Chart data for different periods
  const chartData = {
    week: [
      { label: "Lun", recettesTotales: 35000, recettesEnAttente: 4200 },
      { label: "Mar", recettesTotales: 38500, recettesEnAttente: 5100 },
      { label: "Mer", recettesTotales: 42000, recettesEnAttente: 4800 },
      { label: "Jeu", recettesTotales: 39200, recettesEnAttente: 6300 },
      { label: "Ven", recettesTotales: 45800, recettesEnAttente: 5700 },
      { label: "Sam", recettesTotales: 52100, recettesEnAttente: 7100 },
      { label: "Dim", recettesTotales: 48900, recettesEnAttente: 6500 },
    ],
    month: [
      { label: "Sem 1", recettesTotales: 58000, recettesEnAttente: 7500 },
      { label: "Sem 2", recettesTotales: 62500, recettesEnAttente: 8100 },
      { label: "Sem 3", recettesTotales: 67200, recettesEnAttente: 9200 },
      { label: "Sem 4", recettesTotales: 71800, recettesEnAttente: 10800 },
    ],
    "3months": [
      { label: "Nov", recettesTotales: 248500, recettesEnAttente: 32100 },
      { label: "Déc", recettesTotales: 265300, recettesEnAttente: 28500 },
      { label: "Jan", recettesTotales: 282100, recettesEnAttente: 35200 },
    ],
    year: [
      { label: "Jan", recettesTotales: 248500, recettesEnAttente: 32100 },
      { label: "Fév", recettesTotales: 265300, recettesEnAttente: 28500 },
      { label: "Mar", recettesTotales: 282100, recettesEnAttente: 35200 },
      { label: "Avr", recettesTotales: 298400, recettesEnAttente: 29800 },
      { label: "Mai", recettesTotales: 315600, recettesEnAttente: 41300 },
      { label: "Juin", recettesTotales: 329800, recettesEnAttente: 38700 },
      { label: "Juil", recettesTotales: 345200, recettesEnAttente: 44100 },
      { label: "Août", recettesTotales: 362500, recettesEnAttente: 39600 },
      { label: "Sep", recettesTotales: 378900, recettesEnAttente: 46800 },
      { label: "Oct", recettesTotales: 395200, recettesEnAttente: 42300 },
      { label: "Nov", recettesTotales: 412600, recettesEnAttente: 48900 },
      { label: "Déc", recettesTotales: 428300, recettesEnAttente: 45100 },
    ],
  };

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          DASHBOARD
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Bienvenue, Marcus. Votre shift commence maintenant.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeSubTab === tab.id
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            {tab.label}
            {activeSubTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Content Based on Active Tab */}
      {activeSubTab === "general" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statsGeneral.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-4 md:p-6"
              >
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Liste des Véhicules Récents */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                LISTE DES VÉHICULES
              </h2>
              <button className="text-white hover:text-white/60 text-sm font-medium flex items-center gap-2">
                VOIR TOUT
              </button>
            </div>
            <div className="space-y-3">
              {recentVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-black/50 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{vehicle.plate}</p>
                      <p className="text-white/40 text-sm">{vehicle.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white font-medium">{vehicle.earnings}</p>
                    <Badge
                      className={
                        vehicle.status === "Actif"
                          ? "bg-white/10 text-white border-white/20"
                          : "bg-white/5 text-white/40 border-white/10"
                      }
                    >
                      {vehicle.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/5 border border-white/10 p-4 md:p-6 hover:border-white/20 transition-all cursor-pointer">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                GÉRER LES VÉHICULES
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                50
              </p>
              <p className="text-white/60">Véhicules au total</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 md:p-6 hover:border-white/20 transition-all cursor-pointer">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                GÉRER LES CHAUFFEURS
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                68
              </p>
              <p className="text-white/60">Chauffeurs enregistrés</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "finances" && (
        <div className="space-y-6">
          {/* Financial Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statsFinances.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-4 md:p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/60 text-sm">{stat.label}</p>
                  {stat.trend && (
                    <span className="text-white text-xs flex items-center gap-1">
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p
                  className={`text-3xl md:text-4xl font-bold ${stat.isPending ? "text-red-500" : "text-white"}`}
                >
                  {formatNumberWithAbbreviation(stat.value)}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                ÉVOLUTION DES RECETTES
              </h2>
              {/* Period Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setChartPeriod("week")}
                  className={`px-4 py-2 text-sm font-medium border transition-all ${
                    chartPeriod === "week"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white border-white/10 hover:border-white/20"
                  }`}
                >
                  SEMAINE
                </button>
                <button
                  onClick={() => setChartPeriod("month")}
                  className={`px-4 py-2 text-sm font-medium border transition-all ${
                    chartPeriod === "month"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white border-white/10 hover:border-white/20"
                  }`}
                >
                  MOIS
                </button>
                <button
                  onClick={() => setChartPeriod("3months")}
                  className={`px-4 py-2 text-sm font-medium border transition-all ${
                    chartPeriod === "3months"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white border-white/10 hover:border-white/20"
                  }`}
                >
                  3 MOIS
                </button>
                <button
                  onClick={() => setChartPeriod("year")}
                  className={`px-4 py-2 text-sm font-medium border transition-all ${
                    chartPeriod === "year"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white border-white/10 hover:border-white/20"
                  }`}
                >
                  AN
                </button>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData[chartPeriod]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRecettesTotales"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorRecettesEnAttente"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    stroke="#ffffff60"
                    style={{ fontSize: "12px" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#ffffff60"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k F`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "0",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    formatter={(value: any) => [
                      `${value.toLocaleString()} F`,
                      "",
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ color: "#ffffff" }}
                    formatter={(value) => {
                      if (value === "recettesTotales")
                        return "Recettes Totales";
                      if (value === "recettesEnAttente")
                        return "Recettes en Attente";
                      return value;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="recettesTotales"
                    stroke="#ffffff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRecettesTotales)"
                  />
                  <Area
                    type="monotone"
                    dataKey="recettesEnAttente"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRecettesEnAttente)"
                    strokeDasharray="3 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              APERÇU FINANCIER MENSUEL
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10">
                <div>
                  <p className="text-white font-medium">REVENUS DE JANVIER</p>
                  <p className="text-white/40 text-sm">
                    Collectés: 28/31 jours
                  </p>
                </div>
                <p className="text-white font-bold text-2xl">248,500 F</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                HISTORIQUE DES PAIEMENTS
              </h2>
              <button
                onClick={onNavigateToTransactions}
                className="text-white hover:text-white/60 text-sm font-medium"
              >
                VOIR TOUT
              </button>
            </div>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-black/50 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{payment.driver}</p>
                      <p className="text-white/40 text-sm">
                        Véhicule: {payment.vehicle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white/60 text-sm">{payment.date}</p>
                    <p
                      className={`font-bold ${payment.status === "En attente" ? "text-red-500" : "text-white"}`}
                    >
                      {payment.amount} F
                    </p>
                    <Badge
                      className={
                        payment.status === "Payé"
                          ? "bg-white/10 text-white border-white/20 w-24 justify-center"
                          : "bg-red-500/10 text-red-500 border-red-500/20 w-24 justify-center"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                HISTORIQUE DES DÉPENSES
              </h2>
              <button
                onClick={onNavigateToExpenses}
                className="text-white hover:text-white/60 text-sm font-medium"
              >
                VOIR TOUT
              </button>
            </div>
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-black/50 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">
                        {expense.category}
                      </p>
                      <p className="text-white/40 text-sm">
                        Véhicule: {expense.vehicle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white/60 text-sm">{expense.date}</p>
                    <p className="text-white font-bold">{expense.amount} F</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "alertes" && (
        <div className="space-y-6">
          {/* Alerts List */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              SIGNALEMENTS DES CHAUFFEURS
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border border-white/10 transition-all hover:border-white/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 ${
                          alert.severity === "high" ? "bg-red-500" : "bg-white"
                        }`}
                      />
                      <div>
                        <p className="text-white font-medium">{alert.driver}</p>
                        <p className="text-white/40 text-sm">
                          Véhicule: {alert.vehicle}
                        </p>
                      </div>
                    </div>
                    <span className="text-white/40 text-sm">{alert.time}</span>
                  </div>
                  <p className="ml-5 text-white">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "epargne" && (
        <div className="space-y-6">
          {/* Savings Total Card */}
          <div className="bg-white/5 border border-white/10 p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              ÉPARGNE TOTALE
            </h2>
            <div className="flex items-end gap-4">
              <p className="text-5xl font-bold text-[rgb(182,253,93)]">
                25,500 F
              </p>
              <p className="text-white/60 text-lg mb-2">Total épargné</p>
            </div>
            <p className="text-white/40 text-sm mt-4">6 versements effectués</p>
          </div>

          {/* Savings History */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              HISTORIQUE DES VERSEMENTS
            </h2>
            <div className="space-y-3">
              {savingsHistory.map((saving) => (
                <div
                  key={saving.id}
                  className="bg-black/50 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{saving.driver}</p>
                      <p className="text-white/40 text-sm">{saving.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white/60 text-sm">{saving.date}</p>
                    <p className="text-white font-bold">
                      {saving.amount.toLocaleString()} F
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "assurances" && (
        <div className="space-y-6">
          {/* Insurance Total Card */}
          <div className="bg-white/5 border border-white/10 p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              TOTAL DES COTISATIONS
            </h2>
            <div className="flex items-end gap-4">
              <p className="text-5xl font-bold text-[rgb(182,253,93)]">
                5,790 F
              </p>
              <p className="text-white/60 text-lg mb-2">Total cotisé</p>
            </div>
            <p className="text-white/40 text-sm mt-4">
              6 cotisations enregistrées
            </p>
          </div>

          {/* Insurance History */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              HISTORIQUE DES COTISATIONS
            </h2>
            <div className="space-y-3">
              {insuranceHistory.map((insurance) => (
                <div
                  key={insurance.id}
                  className="bg-black/50 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">
                        {insurance.vehicle}
                      </p>
                      <p className="text-white/40 text-sm">{insurance.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-white/60 text-sm">{insurance.date}</p>
                    <p className="text-white font-bold">
                      {insurance.amount.toLocaleString()} F
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
