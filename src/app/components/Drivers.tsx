import { useState } from "react";
import { DollarSign, FileText, Car, Settings, X, Trash2 } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { DriversRegistration } from "@/app/components/DriverRegistration";

interface Driver {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Actif" | "Inactif" | "Licencié";
  group: "A" | "B" | "C" | "D" | "E" | "F";
  currentVehicle: string | null;
  dailyLimit: number;
}

interface Payment {
  id: number;
  amount: number;
  date: string;
  status: "Payé" | "En attente";
}

interface Document {
  id: number;
  type: "CNI" | "Permis de conduire" | "Certificat de résidence";
  fileName: string;
  uploadDate: string;
}

export function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showPaymentsDialog, setShowPaymentsDialog] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showNewDriverDialog, setShowNewDriverDialog] = useState(false);
  const [paymentsTab, setPaymentsTab] = useState<
    "recettes" | "epargne" | "assurance" | "contraventions"
  >("recettes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"liste" | "inscription">("liste");

  // Sort states for each tab
  const [recettesSortBy, setRecettesSortBy] = useState<
    "date" | "amount" | "status"
  >("date");
  const [recettesSortOrder, setRecettesSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [epargneSortBy, setEpargneSortBy] = useState<"date" | "amount">("date");
  const [epargneSortOrder, setEpargneSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [assuranceSortBy, setAssuranceSortBy] = useState<
    "date" | "amount" | "type"
  >("date");
  const [assuranceSortOrder, setAssuranceSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [finesSortBy, setFinesSortBy] = useState<
    "date" | "amount" | "status" | "type"
  >("date");
  const [finesSortOrder, setFinesSortOrder] = useState<"asc" | "desc">("desc");

  const [editForm, setEditForm] = useState({
    status: "Actif" as "Actif" | "Inactif" | "Licencié",
    group: "A" as "A" | "B" | "C" | "D" | "E" | "F",
    phone: "",
    dailyLimit: 0,
  });

  const [vehicleForm, setVehicleForm] = useState({
    vehicle: "",
    dailyLimit: 0,
  });

  const [newDriverForm, setNewDriverForm] = useState({
    name: "",
    phone: "",
    photo: null as File | null,
    cni: null as File | null,
    permis: null as File | null,
    certificat: null as File | null,
  });

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 1,
      name: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@example.com",
      status: "Actif",
      group: "A",
      currentVehicle: "AB-123-CD",
      dailyLimit: 500,
    },
    {
      id: 2,
      name: "Marie Laurent",
      phone: "+33 6 23 45 67 89",
      email: "marie.laurent@example.com",
      status: "Actif",
      group: "B",
      currentVehicle: "EF-456-GH",
      dailyLimit: 450,
    },
    {
      id: 3,
      name: "Ahmed Ben",
      phone: "+33 6 34 56 78 90",
      email: "ahmed.ben@example.com",
      status: "Actif",
      group: "C",
      currentVehicle: "IJ-789-KL",
      dailyLimit: 600,
    },
    {
      id: 4,
      name: "Sophie Martin",
      phone: "+33 6 45 67 89 01",
      email: "sophie.martin@example.com",
      status: "Inactif",
      group: "D",
      currentVehicle: null,
      dailyLimit: 400,
    },
  ]);

  const availableVehicles = [
    "AB-123-CD",
    "EF-456-GH",
    "IJ-789-KL",
    "MN-012-OP",
    "QR-345-ST",
    "UV-678-WX",
  ];

  // Mock data for payments
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, amount: 2450, date: "2026-01-15", status: "Payé" },
    { id: 2, amount: 1820, date: "2026-01-14", status: "En attente" },
    { id: 3, amount: 3120, date: "2026-01-13", status: "Payé" },
    { id: 4, amount: 1650, date: "2026-01-12", status: "Payé" },
    { id: 5, amount: 2890, date: "2026-01-11", status: "En attente" },
  ]);

  const documents: Document[] = [
    {
      id: 1,
      type: "CNI",
      fileName: "CNI_JeanDupont.pdf",
      uploadDate: "2025-12-01",
    },
    {
      id: 2,
      type: "Permis de conduire",
      fileName: "Permis_JeanDupont.pdf",
      uploadDate: "2025-12-01",
    },
    {
      id: 3,
      type: "Certificat de résidence",
      fileName: "Certificat_JeanDupont.pdf",
      uploadDate: "2025-12-05",
    },
  ];

  // Mock data for savings
  const savingsData = [
    { id: 1, amount: 500, date: "2026-01-15", status: "Versé" },
    { id: 2, amount: 500, date: "2026-01-08", status: "Versé" },
    { id: 3, amount: 500, date: "2026-01-01", status: "Versé" },
    { id: 4, amount: 500, date: "2025-12-25", status: "Versé" },
  ];

  // Mock data for insurance
  const insuranceData = [
    { id: 1, amount: 150, date: "2026-01-15", type: "Responsabilité civile" },
    { id: 2, amount: 150, date: "2026-01-08", type: "Responsabilité civile" },
    { id: 3, amount: 150, date: "2026-01-01", type: "Responsabilité civile" },
    { id: 4, amount: 150, date: "2025-12-25", type: "Responsabilité civile" },
  ];

  // Mock data for fines
  const finesData = [
    {
      id: 1,
      amount: 135,
      date: "2026-01-10",
      type: "Excès de vitesse",
      status: "Payé",
    },
    {
      id: 2,
      amount: 68,
      date: "2025-12-28",
      type: "Stationnement interdit",
      status: "Payé",
    },
    {
      id: 3,
      amount: 90,
      date: "2025-12-15",
      type: "Feu rouge",
      status: "En attente",
    },
  ];

  const handleOpenPayments = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowPaymentsDialog(true);
  };

  const handleOpenDocuments = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDocumentsDialog(true);
  };

  const handleOpenVehicle = (driver: Driver) => {
    setSelectedDriver(driver);
    setVehicleForm({
      vehicle: driver.currentVehicle || "",
      dailyLimit: driver.dailyLimit,
    });
    setShowVehicleDialog(true);
  };

  const handleOpenEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setEditForm({
      status: driver.status,
      group: driver.group,
      phone: driver.phone,
      dailyLimit: driver.dailyLimit,
    });
    setShowEditDialog(true);
  };

  const handleDeletePayment = (paymentId: number) => {
    setPayments(payments.filter((p) => p.id !== paymentId));
  };

  const handleSaveVehicle = () => {
    // Logic to save vehicle assignment
    setShowVehicleDialog(false);
  };

  const handleSaveEdit = () => {
    // Logic to save driver edits
    setShowEditDialog(false);
  };

  const closeAllDialogs = () => {
    setShowPaymentsDialog(false);
    setShowDocumentsDialog(false);
    setShowVehicleDialog(false);
    setShowEditDialog(false);
    setSelectedDriver(null);
  };

  const handleApproveDriver = (id: number) => {
    // Logic to approve driver and add to drivers list
    console.log("Driver approved:", id);
    // Here you would typically add the driver to the drivers list
  };

  const handleRejectDriver = (id: number) => {
    // Logic to reject driver
    console.log("Driver rejected:", id);
  };

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) => {
    const query = searchQuery.toLowerCase();
    return (
      driver.name.toLowerCase().includes(query) ||
      driver.phone.toLowerCase().includes(query) ||
      driver.email.toLowerCase().includes(query) ||
      (driver.currentVehicle &&
        driver.currentVehicle.toLowerCase().includes(query))
    );
  });

  // Sort functions
  const handleRecettesSort = (criteria: "date" | "amount" | "status") => {
    if (recettesSortBy === criteria) {
      setRecettesSortOrder(recettesSortOrder === "asc" ? "desc" : "asc");
    } else {
      setRecettesSortBy(criteria);
      setRecettesSortOrder("desc");
    }
  };

  const handleEpargneSort = (criteria: "date" | "amount") => {
    if (epargneSortBy === criteria) {
      setEpargneSortOrder(epargneSortOrder === "asc" ? "desc" : "asc");
    } else {
      setEpargneSortBy(criteria);
      setEpargneSortOrder("desc");
    }
  };

  const handleAssuranceSort = (criteria: "date" | "amount" | "type") => {
    if (assuranceSortBy === criteria) {
      setAssuranceSortOrder(assuranceSortOrder === "asc" ? "desc" : "asc");
    } else {
      setAssuranceSortBy(criteria);
      setAssuranceSortOrder("desc");
    }
  };

  const handleFinesSort = (criteria: "date" | "amount" | "status" | "type") => {
    if (finesSortBy === criteria) {
      setFinesSortOrder(finesSortOrder === "asc" ? "desc" : "asc");
    } else {
      setFinesSortBy(criteria);
      setFinesSortOrder("desc");
    }
  };

  // Sorted data
  const sortedPayments = [...payments].sort((a, b) => {
    let comparison = 0;
    if (recettesSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (recettesSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (recettesSortBy === "status") {
      comparison = a.status.localeCompare(b.status);
    }
    return recettesSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedSavings = [...savingsData].sort((a, b) => {
    let comparison = 0;
    if (epargneSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (epargneSortBy === "amount") {
      comparison = a.amount - b.amount;
    }
    return epargneSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedInsurance = [...insuranceData].sort((a, b) => {
    let comparison = 0;
    if (assuranceSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (assuranceSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (assuranceSortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    }
    return assuranceSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedFines = [...finesData].sort((a, b) => {
    let comparison = 0;
    if (finesSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (finesSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (finesSortBy === "status") {
      comparison = a.status.localeCompare(b.status);
    } else if (finesSortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    }
    return finesSortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CHAUFFEURS</h1>
          <p className="text-white/60">Gérez vos chauffeurs VTC</p>
        </div>
        <button
          onClick={() => setShowNewDriverDialog(true)}
          className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-all"
        >
          NOUVEAU CHAUFFEUR
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("liste")}
          className={`px-6 py-3 font-bold transition-all relative ${
            activeTab === "liste"
              ? "text-white"
              : "text-white/40 hover:text-white"
          }`}
        >
          LISTE
          {activeTab === "liste" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("inscription")}
          className={`px-6 py-3 font-bold transition-all relative ${
            activeTab === "inscription"
              ? "text-white"
              : "text-white/40 hover:text-white"
          }`}
        >
          INSCRIPTION
          {activeTab === "inscription" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </button>
      </div>

      {/* Liste Tab Content */}
      {activeTab === "liste" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">TOTAL CHAUFFEURS</p>
              <p className="text-4xl font-bold text-white">68</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">ACTIFS AUJOURD'HUI</p>
              <p className="text-4xl font-bold text-white">52</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">EN PAUSE</p>
              <p className="text-4xl font-bold text-white">12</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">HORS SERVICE</p>
              <p className="text-4xl font-bold text-white">4</p>
            </div>
          </div>

          {/* Drivers List */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              LISTE DES CHAUFFEURS
            </h2>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Rechercher un chauffeur (nom, email, téléphone, véhicule)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all placeholder:text-white/40"
              />
            </div>

            <div className="space-y-3">
              {filteredDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="bg-black/50 border border-white/10 p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white flex items-center justify-center">
                        <span className="text-black font-bold">
                          {driver.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">
                          {driver.name}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            {driver.phone}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            {driver.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-white/60 text-sm">VÉHICULE ACTUEL</p>
                        {driver.currentVehicle ? (
                          <p className="text-white font-medium">
                            {driver.currentVehicle}
                          </p>
                        ) : (
                          <p className="text-white/40 text-sm mt-1">
                            Non affecté
                          </p>
                        )}
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenPayments(driver)}
                          className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                          title="Recettes"
                        >
                          <DollarSign size={18} className="text-white" />
                        </button>

                        <button
                          onClick={() => handleOpenDocuments(driver)}
                          className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                          title="Documents"
                        >
                          <FileText size={18} className="text-white" />
                        </button>

                        <button
                          onClick={() => handleOpenVehicle(driver)}
                          className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                          title="Véhicule"
                        >
                          <Car size={18} className="text-white" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(driver)}
                          className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                          title="Modifier"
                        >
                          <Settings size={18} className="text-white" />
                        </button>
                      </div>

                      <Badge
                        className={
                          driver.status === "Actif"
                            ? "bg-white/10 text-white border-white/20"
                            : driver.status === "Licencié"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-white/5 text-white/40 border-white/10"
                        }
                      >
                        {driver.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Inscription Tab Content */}
      {activeTab === "inscription" && (
        <DriversRegistration
          onApprove={handleApproveDriver}
          onReject={handleRejectDriver}
        />
      )}

      {/* Payments Dialog */}
      {showPaymentsDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {selectedDriver.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedDriver.name}
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    Liste des paiements et statuts
                  </p>
                </div>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-white/10">
                <button
                  onClick={() => setPaymentsTab("recettes")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "recettes"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  RECETTES
                  {paymentsTab === "recettes" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("epargne")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "epargne"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  ÉPARGNE
                  {paymentsTab === "epargne" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("assurance")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "assurance"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  ASSURANCE
                  {paymentsTab === "assurance" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("contraventions")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "contraventions"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  CONTRAVENTIONS
                  {paymentsTab === "contraventions" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              </div>

              {/* Recettes Tab Content */}
              {paymentsTab === "recettes" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleRecettesSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {recettesSortBy === "date" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleRecettesSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {recettesSortBy === "amount" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleRecettesSort("status")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "status"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      STATUT{" "}
                      {recettesSortBy === "status" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            Paiement du {payment.date}
                          </p>
                          <p
                            className={`text-lg font-bold mt-1 ${payment.status === "En attente" ? "text-red-500" : "text-white"}`}
                          >
                            {payment.amount} F
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            className={
                              payment.status === "Payé"
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {payment.status}
                          </Badge>
                          <button
                            onClick={() => handleDeletePayment(payment.id)}
                            className="w-8 h-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL</p>
                      <p className="text-2xl font-bold text-white">
                        {payments.reduce((sum, p) => sum + p.amount, 0)} F
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/60">EN ATTENTE</p>
                      <p className="text-xl font-bold text-red-500">
                        {payments
                          .filter((p) => p.status === "En attente")
                          .reduce((sum, p) => sum + p.amount, 0)}{" "}
                        F
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Épargne Tab Content */}
              {paymentsTab === "epargne" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleEpargneSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        epargneSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {epargneSortBy === "date" &&
                        (epargneSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleEpargneSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        epargneSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {epargneSortBy === "amount" &&
                        (epargneSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedSavings.map((saving) => (
                      <div
                        key={saving.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            Versement du {saving.date}
                          </p>
                          <p className="text-lg font-bold text-white mt-1">
                            {saving.amount} F
                          </p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">
                          {saving.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL ÉPARGNÉ</p>
                      <p className="text-2xl font-bold text-white">
                        {savingsData.reduce((sum, s) => sum + s.amount, 0)} F
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Assurance Tab Content */}
              {paymentsTab === "assurance" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleAssuranceSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {assuranceSortBy === "date" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleAssuranceSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {assuranceSortBy === "amount" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleAssuranceSort("type")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "type"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      TYPE{" "}
                      {assuranceSortBy === "type" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedInsurance.map((insurance) => (
                      <div
                        key={insurance.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {insurance.type}
                          </p>
                          <p className="text-white/60 text-sm">
                            {insurance.date}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {insurance.amount} F
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL COTISÉ</p>
                      <p className="text-2xl font-bold text-white">
                        {insuranceData.reduce((sum, i) => sum + i.amount, 0)} F
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Contraventions Tab Content */}
              {paymentsTab === "contraventions" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleFinesSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {finesSortBy === "date" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {finesSortBy === "amount" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("status")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "status"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      STATUT{" "}
                      {finesSortBy === "status" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("type")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "type"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      TYPE{" "}
                      {finesSortBy === "type" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedFines.map((fine) => (
                      <div
                        key={fine.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">{fine.type}</p>
                          <p className="text-white/60 text-sm">{fine.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p
                            className={`text-lg font-bold ${fine.status === "En attente" ? "text-red-500" : "text-white"}`}
                          >
                            {fine.amount} F
                          </p>
                          <Badge
                            className={
                              fine.status === "Payé"
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {fine.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL</p>
                      <p className="text-2xl font-bold text-white">
                        {finesData.reduce((sum, f) => sum + f.amount, 0)} F
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/60">EN ATTENTE</p>
                      <p className="text-xl font-bold text-red-500">
                        {finesData
                          .filter((f) => f.status === "En attente")
                          .reduce((sum, f) => sum + f.amount, 0)}{" "}
                        F
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Documents Dialog */}
      {showDocumentsDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  DOCUMENTS - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Documents fournis par le chauffeur
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{doc.type}</p>
                          <p className="text-white/60 text-sm">
                            {doc.fileName}
                          </p>
                          <p className="text-white/40 text-xs mt-1">
                            Uploadé le {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                        VISUALISER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Dialog */}
      {showVehicleDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  GESTION VÉHICULE - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Réassigner un véhicule et définir le plafond
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Current Vehicle */}
              <div className="mb-6">
                <p className="text-white/60 text-sm mb-2">VÉHICULE ACTUEL</p>
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-medium text-lg">
                    {selectedDriver.currentVehicle || "Aucun véhicule affecté"}
                  </p>
                </div>
              </div>

              {/* Select New Vehicle */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NOUVEAU VÉHICULE
                </label>
                <select
                  value={vehicleForm.vehicle}
                  onChange={(e) =>
                    setVehicleForm({ ...vehicleForm, vehicle: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="">Sélectionner un véhicule</option>
                  {availableVehicles.map((vehicle) => (
                    <option
                      key={vehicle}
                      value={vehicle}
                      className="bg-[#0a0a0a]"
                    >
                      {vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Daily Limit */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PLAFOND RECETTE JOURNALIÈRE (F CFA)
                </label>
                <input
                  type="number"
                  value={vehicleForm.dailyLimit}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      dailyLimit: Number(e.target.value),
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveVehicle}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  ENREGISTRER
                </button>
                <button
                  onClick={closeAllDialogs}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Dialog */}
      {showEditDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  MODIFIER - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Modifier le statut, téléphone et plafond
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  STATUT
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status: e.target.value as
                        | "Actif"
                        | "Inactif"
                        | "Licencié",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="Actif" className="bg-[#0a0a0a]">
                    Actif
                  </option>
                  <option value="Inactif" className="bg-[#0a0a0a]">
                    Inactif
                  </option>
                  <option value="Licencié" className="bg-[#0a0a0a]">
                    Licencié
                  </option>
                </select>
              </div>

              {/* Group */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  GROUPE
                </label>
                <select
                  value={editForm.group}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      group: e.target.value as
                        | "A"
                        | "B"
                        | "C"
                        | "D"
                        | "E"
                        | "F",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="A" className="bg-[#0a0a0a]">
                    A
                  </option>
                  <option value="B" className="bg-[#0a0a0a]">
                    B
                  </option>
                  <option value="C" className="bg-[#0a0a0a]">
                    C
                  </option>
                  <option value="D" className="bg-[#0a0a0a]">
                    D
                  </option>
                  <option value="E" className="bg-[#0a0a0a]">
                    E
                  </option>
                  <option value="F" className="bg-[#0a0a0a]">
                    F
                  </option>
                </select>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NUMÉRO DE TÉLÉPHONE
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Daily Limit */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PLAFOND RECETTE JOURNALIÈRE (F CFA)
                </label>
                <input
                  type="number"
                  value={editForm.dailyLimit}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      dailyLimit: Number(e.target.value),
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  ENREGISTRER
                </button>
                <button
                  onClick={closeAllDialogs}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Driver Dialog */}
      {showNewDriverDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  NOUVEAU CHAUFFEUR
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Créer un nouveau profil chauffeur
                </p>
              </div>
              <button
                onClick={() => setShowNewDriverDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Name */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NOM ET PRÉNOMS
                </label>
                <input
                  type="text"
                  value={newDriverForm.name}
                  onChange={(e) =>
                    setNewDriverForm({ ...newDriverForm, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NUMÉRO DE TÉLÉPHONE
                </label>
                <input
                  type="tel"
                  value={newDriverForm.phone}
                  onChange={(e) =>
                    setNewDriverForm({
                      ...newDriverForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Photo */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PHOTO
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        photo: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.photo && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.photo.name}
                  </p>
                )}
              </div>

              {/* CNI */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CARTE NATIONALE D'IDENTITÉ (CNI)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        cni: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.cni && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.cni.name}
                  </p>
                )}
              </div>

              {/* Permis */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PERMIS DE CONDUIRE
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        permis: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.permis && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.permis.name}
                  </p>
                )}
              </div>

              {/* Certificat */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CERTIFICAT DE RÉSIDENCE
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        certificat: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.certificat && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.certificat.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Logic to create new driver
                    console.log("Creating new driver:", newDriverForm);
                    setShowNewDriverDialog(false);
                    setNewDriverForm({
                      name: "",
                      phone: "",
                      photo: null,
                      cni: null,
                      permis: null,
                      certificat: null,
                    });
                  }}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  CRÉER CHAUFFEUR
                </button>
                <button
                  onClick={() => {
                    setShowNewDriverDialog(false);
                    setNewDriverForm({
                      name: "",
                      phone: "",
                      photo: null,
                      cni: null,
                      permis: null,
                      certificat: null,
                    });
                  }}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  // Sort states for each tab
  const [recettesSortBy, setRecettesSortBy] = useState<
    "date" | "amount" | "status"
  >("date");
  const [recettesSortOrder, setRecettesSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [epargneSortBy, setEpargneSortBy] = useState<"date" | "amount">("date");
  const [epargneSortOrder, setEpargneSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [assuranceSortBy, setAssuranceSortBy] = useState<
    "date" | "amount" | "type"
  >("date");
  const [assuranceSortOrder, setAssuranceSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [finesSortBy, setFinesSortBy] = useState<
    "date" | "amount" | "status" | "type"
  >("date");
  const [finesSortOrder, setFinesSortOrder] = useState<"asc" | "desc">("desc");

  const [editForm, setEditForm] = useState({
    status: "Actif" as "Actif" | "Inactif" | "Licencié",
    group: "A" as "A" | "B" | "C" | "D" | "E" | "F",
    phone: "",
    dailyLimit: 0,
  });

  const [vehicleForm, setVehicleForm] = useState({
    vehicle: "",
    dailyLimit: 0,
  });

  const [newDriverForm, setNewDriverForm] = useState({
    name: "",
    phone: "",
    email: "",
    photo: null as File | null,
    cni: null as File | null,
    permis: null as File | null,
    certificat: null as File | null,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "drivers"));
        const driversData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            status: (data.status as "Actif" | "Inactif") || "Actif",
            group: data.group || "A",
            currentVehicle: data.currentVehicle || null,
            dailyLimit: Number(data.dailyLimit) || 500,
          } as Driver;
        });
        console.log("Loaded drivers from Firestore:", driversData);
        setDrivers(driversData);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        const vehiclesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vehicle[];
        console.log("Loaded vehicles from Firestore:", vehiclesData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchDrivers();
    fetchVehicles();
  }, []);

  // Available vehicles from Firestore
  const availableVehicles = vehicles.map((vehicle) => vehicle.plate);

  // Mock data for payments
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, amount: 2450, date: "2026-01-15", status: "Payé" },
    { id: 2, amount: 1820, date: "2026-01-14", status: "En attente" },
    { id: 3, amount: 3120, date: "2026-01-13", status: "Payé" },
    { id: 4, amount: 1650, date: "2026-01-12", status: "Payé" },
    { id: 5, amount: 2890, date: "2026-01-11", status: "En attente" },
  ]);

  const documents: Document[] = [
    {
      id: 1,
      type: "CNI",
      fileName: "CNI_JeanDupont.pdf",
      uploadDate: "2025-12-01",
      url: "/documents/cni-jean-dupont.pdf",
    },
    {
      id: 2,
      type: "Permis de conduire",
      fileName: "Permis_JeanDupont.pdf",
      uploadDate: "2025-12-01",
      url: "/documents/permis-jean-dupont.pdf",
    },
    {
      id: 3,
      type: "Certificat de résidence",
      fileName: "Certificat_JeanDupont.pdf",
      uploadDate: "2025-12-05",
      url: "/documents/certificat-jean-dupont.pdf",
    },
  ];

  // Mock data for savings
  const savingsData = [
    { id: 1, amount: 500, date: "2026-01-15", status: "Versé" },
    { id: 2, amount: 500, date: "2026-01-08", status: "Versé" },
    { id: 3, amount: 500, date: "2026-01-01", status: "Versé" },
    { id: 4, amount: 500, date: "2025-12-25", status: "Versé" },
  ];

  // Mock data for insurance
  const insuranceData = [
    { id: 1, amount: 150, date: "2026-01-15", type: "Responsabilité civile" },
    { id: 2, amount: 150, date: "2026-01-08", type: "Responsabilité civile" },
    { id: 3, amount: 150, date: "2026-01-01", type: "Responsabilité civile" },
    { id: 4, amount: 150, date: "2025-12-25", type: "Responsabilité civile" },
  ];

  // Mock data for fines
  const finesData = [
    {
      id: 1,
      amount: 135,
      date: "2026-01-10",
      type: "Excès de vitesse",
      status: "Payé",
    },
    {
      id: 2,
      amount: 68,
      date: "2025-12-28",
      type: "Stationnement interdit",
      status: "Payé",
    },
    {
      id: 3,
      amount: 90,
      date: "2025-12-15",
      type: "Feu rouge",
      status: "En attente",
    },
  ];

  const handleOpenPayments = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowPaymentsDialog(true);
  };

  const handleOpenDocuments = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDocumentsDialog(true);
  };

  const handleViewDocument = (document: Document) => {
    // Ouvrir le document dans un nouvel onglet
    window.open(document.url, "_blank");
  };

  const handleOpenVehicle = (driver: Driver) => {
    setSelectedDriver(driver);
    setVehicleForm({
      vehicle: driver.currentVehicle || "",
      dailyLimit: driver.dailyLimit,
    });
    setShowVehicleDialog(true);
  };

  const handleOpenEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setEditForm({
      status: driver.status,
      group: driver.group,
      phone: driver.phone,
      dailyLimit: driver.dailyLimit,
    });
    setShowEditDialog(true);
  };

  const handleDeletePayment = (paymentId: number) => {
    setPayments(payments.filter((p) => p.id !== paymentId));
  };

  const handleSaveVehicle = () => {
    // Logic to save vehicle assignment
    setShowVehicleDialog(false);
  };

  const handleSaveEdit = async () => {
    if (selectedDriver) {
      try {
        await updateDoc(doc(db, "drivers", selectedDriver.id), editForm);
        setDrivers(
          drivers.map((d) =>
            d.id === selectedDriver.id ? { ...d, ...editForm } : d,
          ),
        );
        setShowEditDialog(false);
        setSelectedDriver(null);
      } catch (error) {
        console.error("Error updating driver: ", error);
      }
    }
  };

  const handleCreateDriver = async () => {
    console.log("handleCreateDriver called with newDriverForm:", newDriverForm);
    console.log(
      "Validation check - name:",
      newDriverForm.name,
      "phone:",
      newDriverForm.phone,
    );

    if (newDriverForm.name && newDriverForm.phone) {
      console.log("Validation passed, proceeding with save...");
      try {
        console.log("Adding driver to Firestore...");
        const driverData = {
          name: newDriverForm.name,
          phone: newDriverForm.phone,
          email: newDriverForm.email,
          status: "Actif",
          group: "A",
          currentVehicle: null,
          dailyLimit: 500,
        };
        console.log("Data to save:", driverData);

        const docRef = await addDoc(collection(db, "drivers"), driverData);
        console.log("Driver added to Firestore with ID:", docRef.id);

        // Add to local state immediately
        const newDriver: Driver = {
          id: docRef.id,
          name: newDriverForm.name,
          phone: newDriverForm.phone,
          email: newDriverForm.email,
          status: "Actif" as const,
          group: "A" as const,
          currentVehicle: null,
          dailyLimit: 500,
        };
        setDrivers((prev) => [...prev, newDriver]);
        console.log("Driver added to local state");

        // Reset form and close dialog
        setShowNewDriverDialog(false);
        setNewDriverForm({
          name: "",
          phone: "",
          email: "",
          photo: null,
          cni: null,
          permis: null,
          certificat: null,
        });
        console.log("Dialog closed and form reset");
      } catch (error) {
        console.error("Error adding driver:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Erreur inconnue";
        alert("Erreur lors de la création du chauffeur: " + errorMessage);
      }
    } else {
      console.log("Validation failed - name or phone missing");
      alert("Veuillez saisir au moins le nom et le numéro de téléphone");
    }
  };

  const closeAllDialogs = () => {
    setShowPaymentsDialog(false);
    setShowDocumentsDialog(false);
    setShowVehicleDialog(false);
    setShowEditDialog(false);
    setSelectedDriver(null);
  };

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) => {
    const query = searchQuery.toLowerCase();
    return (
      driver.name.toLowerCase().includes(query) ||
      driver.phone.toLowerCase().includes(query) ||
      driver.email.toLowerCase().includes(query) ||
      (driver.currentVehicle &&
        driver.currentVehicle.toLowerCase().includes(query))
    );
  });

  // Sort functions
  const handleRecettesSort = (criteria: "date" | "amount" | "status") => {
    if (recettesSortBy === criteria) {
      setRecettesSortOrder(recettesSortOrder === "asc" ? "desc" : "asc");
    } else {
      setRecettesSortBy(criteria);
      setRecettesSortOrder("desc");
    }
  };

  const handleEpargneSort = (criteria: "date" | "amount") => {
    if (epargneSortBy === criteria) {
      setEpargneSortOrder(epargneSortOrder === "asc" ? "desc" : "asc");
    } else {
      setEpargneSortBy(criteria);
      setEpargneSortOrder("desc");
    }
  };

  const handleAssuranceSort = (criteria: "date" | "amount" | "type") => {
    if (assuranceSortBy === criteria) {
      setAssuranceSortOrder(assuranceSortOrder === "asc" ? "desc" : "asc");
    } else {
      setAssuranceSortBy(criteria);
      setAssuranceSortOrder("desc");
    }
  };

  const handleFinesSort = (criteria: "date" | "amount" | "status" | "type") => {
    if (finesSortBy === criteria) {
      setFinesSortOrder(finesSortOrder === "asc" ? "desc" : "asc");
    } else {
      setFinesSortBy(criteria);
      setFinesSortOrder("desc");
    }
  };

  // Sorted data
  const sortedPayments = [...payments].sort((a, b) => {
    let comparison = 0;
    if (recettesSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (recettesSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (recettesSortBy === "status") {
      comparison = a.status.localeCompare(b.status);
    }
    return recettesSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedSavings = [...savingsData].sort((a, b) => {
    let comparison = 0;
    if (epargneSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (epargneSortBy === "amount") {
      comparison = a.amount - b.amount;
    }
    return epargneSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedInsurance = [...insuranceData].sort((a, b) => {
    let comparison = 0;
    if (assuranceSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (assuranceSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (assuranceSortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    }
    return assuranceSortOrder === "asc" ? comparison : -comparison;
  });

  const sortedFines = [...finesData].sort((a, b) => {
    let comparison = 0;
    if (finesSortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (finesSortBy === "amount") {
      comparison = a.amount - b.amount;
    } else if (finesSortBy === "status") {
      comparison = a.status.localeCompare(b.status);
    } else if (finesSortBy === "type") {
      comparison = a.type.localeCompare(b.type);
    }
    return finesSortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            CHAUFFEURS
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Gérez vos chauffeurs VTC
          </p>
        </div>
        <button
          onClick={() => setShowNewDriverDialog(true)}
          className="bg-white text-black px-4 md:px-6 py-3 font-bold hover:bg-white/90 transition-all text-sm md:text-base"
        >
          NOUVEAU CHAUFFEUR
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL CHAUFFEURS</p>
          <p className="text-3xl md:text-4xl font-bold text-white">68</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">ACTIFS AUJOURD'HUI</p>
          <p className="text-3xl md:text-4xl font-bold text-white">52</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">EN PAUSE</p>
          <p className="text-3xl md:text-4xl font-bold text-white">12</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">HORS SERVICE</p>
          <p className="text-3xl md:text-4xl font-bold text-white">4</p>
        </div>
      </div>

      {/* Drivers List */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
          LISTE DES CHAUFFEURS
        </h2>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6">
          <input
            type="text"
            placeholder="Rechercher un chauffeur (nom, email, téléphone, véhicule)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all placeholder:text-white/40"
          />
        </div>

        <div className="space-y-3">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-black/50 border border-white/10 p-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white flex items-center justify-center">
                    <span className="text-black font-bold">
                      {driver.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      {driver.name}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        {driver.phone}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        {driver.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white/60 text-sm">VÉHICULE ACTUEL</p>
                    {driver.currentVehicle ? (
                      <p className="text-white font-medium">
                        {driver.currentVehicle}
                      </p>
                    ) : (
                      <p className="text-white/40 text-sm mt-1">Non affecté</p>
                    )}
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenPayments(driver)}
                      className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                      title="Recettes"
                    >
                      <DollarSign size={18} className="text-white" />
                    </button>

                    <button
                      onClick={() => handleOpenDocuments(driver)}
                      className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                      title="Documents"
                    >
                      <FileText size={18} className="text-white" />
                    </button>

                    <button
                      onClick={() => handleOpenVehicle(driver)}
                      className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                      title="Véhicule"
                    >
                      <Car size={18} className="text-white" />
                    </button>

                    <button
                      onClick={() => handleOpenEdit(driver)}
                      className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                      title="Modifier"
                    >
                      <Settings size={18} className="text-white" />
                    </button>
                  </div>

                  <Badge
                    className={
                      driver.status === "Actif"
                        ? "bg-white/10 text-white border-white/20"
                        : driver.status === "Licencié"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-white/5 text-white/40 border-white/10"
                    }
                  >
                    {driver.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payments Dialog */}
      {showPaymentsDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {selectedDriver.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedDriver.name}
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    Liste des paiements et statuts
                  </p>
                </div>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-white/10">
                <button
                  onClick={() => setPaymentsTab("recettes")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "recettes"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  RECETTES
                  {paymentsTab === "recettes" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("epargne")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "epargne"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  ÉPARGNE
                  {paymentsTab === "epargne" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("assurance")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "assurance"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  ASSURANCE
                  {paymentsTab === "assurance" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentsTab("contraventions")}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    paymentsTab === "contraventions"
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  CONTRAVENTIONS
                  {paymentsTab === "contraventions" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              </div>

              {/* Recettes Tab Content */}
              {paymentsTab === "recettes" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleRecettesSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {recettesSortBy === "date" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleRecettesSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {recettesSortBy === "amount" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleRecettesSort("status")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        recettesSortBy === "status"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      STATUT{" "}
                      {recettesSortBy === "status" &&
                        (recettesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            Paiement du {payment.date}
                          </p>
                          <p
                            className={`text-lg font-bold mt-1 ${payment.status === "En attente" ? "text-red-500" : "text-white"}`}
                          >
                            {payment.amount.toLocaleString()} F CFA
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            className={
                              payment.status === "Payé"
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {payment.status}
                          </Badge>
                          <button
                            onClick={() => handleDeletePayment(payment.id)}
                            className="w-8 h-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL</p>
                      <p className="text-2xl font-bold text-white">
                        {payments
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/60">EN ATTENTE</p>
                      <p className="text-xl font-bold text-red-500">
                        {payments
                          .filter((p) => p.status === "En attente")
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Épargne Tab Content */}
              {paymentsTab === "epargne" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleEpargneSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        epargneSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {epargneSortBy === "date" &&
                        (epargneSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleEpargneSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        epargneSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {epargneSortBy === "amount" &&
                        (epargneSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedSavings.map((saving) => (
                      <div
                        key={saving.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            Versement du {saving.date}
                          </p>
                          <p className="text-lg font-bold text-white mt-1">
                            {saving.amount} F
                          </p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">
                          {saving.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL ÉPARGNÉ</p>
                      <p className="text-2xl font-bold text-white">
                        {savingsData
                          .reduce((sum, s) => sum + s.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Assurance Tab Content */}
              {paymentsTab === "assurance" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleAssuranceSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {assuranceSortBy === "date" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleAssuranceSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {assuranceSortBy === "amount" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleAssuranceSort("type")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        assuranceSortBy === "type"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      TYPE{" "}
                      {assuranceSortBy === "type" &&
                        (assuranceSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedInsurance.map((insurance) => (
                      <div
                        key={insurance.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {insurance.type}
                          </p>
                          <p className="text-white/60 text-sm">
                            {insurance.date}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {insurance.amount.toLocaleString()} F CFA
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL COTISÉ</p>
                      <p className="text-2xl font-bold text-white">
                        {insuranceData
                          .reduce((sum, i) => sum + i.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Contraventions Tab Content */}
              {paymentsTab === "contraventions" && (
                <>
                  {/* Sort buttons */}
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => handleFinesSort("date")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "date"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      DATE{" "}
                      {finesSortBy === "date" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("amount")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "amount"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      MONTANT{" "}
                      {finesSortBy === "amount" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("status")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "status"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      STATUT{" "}
                      {finesSortBy === "status" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                      onClick={() => handleFinesSort("type")}
                      className={`px-3 py-1.5 text-sm border transition-all ${
                        finesSortBy === "type"
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      TYPE{" "}
                      {finesSortBy === "type" &&
                        (finesSortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sortedFines.map((fine) => (
                      <div
                        key={fine.id}
                        className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <p className="text-white font-medium">{fine.type}</p>
                          <p className="text-white/60 text-sm">{fine.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p
                            className={`text-lg font-bold ${fine.status === "En attente" ? "text-red-500" : "text-white"}`}
                          >
                            {fine.amount.toLocaleString()} F CFA
                          </p>
                          <Badge
                            className={
                              fine.status === "Payé"
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                          >
                            {fine.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-white/60">TOTAL</p>
                      <p className="text-2xl font-bold text-white">
                        {finesData
                          .reduce((sum, f) => sum + f.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/60">EN ATTENTE</p>
                      <p className="text-xl font-bold text-red-500">
                        {finesData
                          .filter((f) => f.status === "En attente")
                          .reduce((sum, f) => sum + f.amount, 0)
                          .toLocaleString()}{" "}
                        F CFA
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Documents Dialog */}
      {showDocumentsDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  DOCUMENTS - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Documents fournis par le chauffeur
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all flex-shrink-0"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white/5 border border-white/10 p-4 md:p-5 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                          <FileText size={18} className="text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-bold text-sm md:text-base">
                            {doc.type}
                          </p>
                          <p className="text-white/60 text-sm truncate">
                            {doc.fileName}
                          </p>
                          <p className="text-white/40 text-xs mt-1">
                            Uploadé le {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm md:text-base whitespace-nowrap"
                        onClick={() => handleViewDocument(doc)}
                      >
                        VISUALISER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Dialog */}
      {showVehicleDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  GESTION VÉHICULE - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Réassigner un véhicule et définir le plafond
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Current Vehicle */}
              <div className="mb-6">
                <p className="text-white/60 text-sm mb-2">VÉHICULE ACTUEL</p>
                <div className="bg-white/5 border border-white/10 p-4">
                  <p className="text-white font-medium text-lg">
                    {selectedDriver.currentVehicle || "Aucun véhicule affecté"}
                  </p>
                </div>
              </div>

              {/* Select New Vehicle */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NOUVEAU VÉHICULE
                </label>
                <select
                  value={vehicleForm.vehicle}
                  onChange={(e) =>
                    setVehicleForm({ ...vehicleForm, vehicle: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="">Sélectionner un véhicule</option>
                  {availableVehicles.map((vehicle) => (
                    <option
                      key={vehicle}
                      value={vehicle}
                      className="bg-[#0a0a0a]"
                    >
                      {vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Daily Limit */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PLAFOND RECETTE JOURNALIÈRE (F CFA)
                </label>
                <input
                  type="number"
                  value={vehicleForm.dailyLimit}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      dailyLimit: Number(e.target.value),
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveVehicle}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  ENREGISTRER
                </button>
                <button
                  onClick={closeAllDialogs}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Dialog */}
      {showEditDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  MODIFIER - {selectedDriver.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Modifier le statut, téléphone et plafond
                </p>
              </div>
              <button
                onClick={closeAllDialogs}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  STATUT
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status: e.target.value as
                        | "Actif"
                        | "Inactif"
                        | "Licencié",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="Actif" className="bg-[#0a0a0a]">
                    Actif
                  </option>
                  <option value="Inactif" className="bg-[#0a0a0a]">
                    Inactif
                  </option>
                  <option value="Licencié" className="bg-[#0a0a0a]">
                    Licencié
                  </option>
                </select>
              </div>

              {/* Group */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  GROUPE
                </label>
                <select
                  value={editForm.group}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      group: e.target.value as
                        | "A"
                        | "B"
                        | "C"
                        | "D"
                        | "E"
                        | "F",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="A" className="bg-[#0a0a0a]">
                    A
                  </option>
                  <option value="B" className="bg-[#0a0a0a]">
                    B
                  </option>
                  <option value="C" className="bg-[#0a0a0a]">
                    C
                  </option>
                  <option value="D" className="bg-[#0a0a0a]">
                    D
                  </option>
                  <option value="E" className="bg-[#0a0a0a]">
                    E
                  </option>
                  <option value="F" className="bg-[#0a0a0a]">
                    F
                  </option>
                </select>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NUMÉRO DE TÉLÉPHONE
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Daily Limit */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PLAFOND RECETTE JOURNALIÈRE (F CFA)
                </label>
                <input
                  type="number"
                  value={editForm.dailyLimit}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      dailyLimit: Number(e.target.value),
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  ENREGISTRER
                </button>
                <button
                  onClick={closeAllDialogs}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Driver Dialog */}
      {showNewDriverDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  NOUVEAU CHAUFFEUR
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Créer un nouveau profil chauffeur
                </p>
              </div>
              <button
                onClick={() => setShowNewDriverDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Name */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NOM ET PRÉNOMS
                </label>
                <input
                  type="text"
                  value={newDriverForm.name}
                  onChange={(e) =>
                    setNewDriverForm({ ...newDriverForm, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  NUMÉRO DE TÉLÉPHONE
                </label>
                <input
                  type="tel"
                  value={newDriverForm.phone}
                  onChange={(e) =>
                    setNewDriverForm({
                      ...newDriverForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  ADRESSE EMAIL
                </label>
                <input
                  type="email"
                  value={newDriverForm.email}
                  onChange={(e) =>
                    setNewDriverForm({
                      ...newDriverForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              {/* Photo */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PHOTO
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        photo: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.photo && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.photo.name}
                  </p>
                )}
              </div>

              {/* CNI */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CARTE NATIONALE D'IDENTITÉ (CNI)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        cni: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.cni && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.cni.name}
                  </p>
                )}
              </div>

              {/* Permis */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  PERMIS DE CONDUIRE
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        permis: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.permis && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.permis.name}
                  </p>
                )}
              </div>

              {/* Certificat */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CERTIFICAT DE RÉSIDENCE
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setNewDriverForm({
                        ...newDriverForm,
                        certificat: e.target.files?.[0] || null,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  />
                </div>
                {newDriverForm.certificat && (
                  <p className="text-white/60 text-sm mt-2">
                    Fichier sélectionné : {newDriverForm.certificat.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      console.log("CRÉER CHAUFFEUR button clicked");
                      await handleCreateDriver();
                    } catch (error) {
                      console.error("Error in CRÉER CHAUFFEUR button:", error);
                      const errorMessage =
                        error instanceof Error
                          ? error.message
                          : "Erreur inconnue";
                      alert(
                        "Erreur lors de la création du chauffeur: " +
                          errorMessage,
                      );
                    }
                  }}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  CRÉER CHAUFFEUR
                </button>
                <button
                  onClick={() => {
                    setShowNewDriverDialog(false);
                    setNewDriverForm({
                      name: "",
                      phone: "",
                      email: "",
                      photo: null,
                      cni: null,
                      permis: null,
                      certificat: null,
                    });
                  }}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
