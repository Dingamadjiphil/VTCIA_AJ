import { useState } from "react";
import { Search, Filter, Plus, Check, Edit, Trash2, X } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { formatNumberWithAbbreviation } from "@/utils/formatNumber";

interface Contravention {
  id: number;
  driver: string;
  description: string;
  location: string;
  date: string;
  amount: number;
  status: "En cours" | "Payé";
}

export function Contraventions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "En cours" | "Payé">(
    "all",
  );
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedContravention, setSelectedContravention] =
    useState<Contravention | null>(null);

  const [contraventions, setContraventions] = useState<Contravention[]>([
    {
      id: 1,
      driver: "Jean Dupont",
      description: "Excès de vitesse",
      location: "Avenue des Champs-Élysées, Paris",
      date: "2026-01-15",
      amount: 135,
      status: "En cours",
    },
    {
      id: 2,
      driver: "Marie Laurent",
      description: "Stationnement interdit",
      location: "Rue de Rivoli, Paris",
      date: "2026-01-14",
      amount: 35,
      status: "Payé",
    },
    {
      id: 3,
      driver: "Ahmed Ben",
      description: "Feu rouge grillé",
      location: "Boulevard Haussmann, Paris",
      date: "2026-01-13",
      amount: 90,
      status: "En cours",
    },
    {
      id: 4,
      driver: "Sophie Martin",
      description: "Stationnement gênant",
      location: "Place de la Bastille, Paris",
      date: "2026-01-12",
      amount: 35,
      status: "Payé",
    },
    {
      id: 5,
      driver: "Pierre Dubois",
      description: "Excès de vitesse",
      location: "Autoroute A1",
      date: "2026-01-11",
      amount: 135,
      status: "En cours",
    },
    {
      id: 6,
      driver: "Fatima Zahra",
      description: "Non respect de priorité",
      location: "Avenue de la République, Paris",
      date: "2026-01-10",
      amount: 135,
      status: "Payé",
    },
  ]);

  const [editForm, setEditForm] = useState({
    driver: "",
    description: "",
    location: "",
    amount: 0,
    status: "En cours" as "En cours" | "Payé",
  });

  const driversWithVehicles = [
    { name: "Jean Dupont", vehicle: "AB-123-CD" },
    { name: "Marie Laurent", vehicle: "EF-456-GH" },
    { name: "Ahmed Ben", vehicle: "IJ-789-KL" },
    { name: "Sophie Martin", vehicle: "MN-012-OP" },
    { name: "Pierre Dubois", vehicle: "QR-345-ST" },
    { name: "Fatima Zahra", vehicle: "UV-678-WX" },
    { name: "Lucas Bernard", vehicle: "YZ-901-AB" },
    { name: "Emma Leroy", vehicle: "CD-234-EF" },
  ];

  const stats = {
    totalPaid: contraventions
      .filter((c) => c.status === "Payé")
      .reduce((sum, c) => sum + c.amount, 0),
    inProgress: contraventions
      .filter((c) => c.status === "En cours")
      .reduce((sum, c) => sum + c.amount, 0),
    total: contraventions.reduce((sum, c) => sum + c.amount, 0),
  };

  const filteredContraventions = contraventions.filter((c) => {
    const matchesSearch =
      c.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const handleValidate = (id: number) => {
    setContraventions(
      contraventions.map((c) =>
        c.id === id ? { ...c, status: "Payé" as "Payé" } : c,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setContraventions(contraventions.filter((c) => c.id !== id));
  };

  const handleEdit = (contravention: Contravention) => {
    setSelectedContravention(contravention);
    setEditForm({
      driver: contravention.driver,
      description: contravention.description,
      location: contravention.location,
      amount: contravention.amount,
      status: contravention.status,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (selectedContravention) {
      setContraventions(
        contraventions.map((c) =>
          c.id === selectedContravention.id ? { ...c, ...editForm } : c,
        ),
      );
      setShowEditDialog(false);
      setSelectedContravention(null);
    }
  };

  const handleAdd = () => {
    const newContravention: Contravention = {
      id: Math.max(...contraventions.map((c) => c.id)) + 1,
      ...editForm,
      date: new Date().toISOString().split("T")[0],
    };
    setContraventions([...contraventions, newContravention]);
    setShowAddDialog(false);
    setEditForm({
      driver: "",
      description: "",
      location: "",
      amount: 0,
      status: "En cours",
    });
  };

  const openAddDialog = () => {
    setEditForm({
      driver: "",
      description: "",
      location: "",
      amount: 0,
      status: "En cours",
    });
    setShowAddDialog(true);
  };

  return (
    <div className="p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">CONTRAVENTIONS</h1>
        <p className="text-white/60">Gestion des contraventions de la flotte</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL PAYÉ</p>
          <p className="text-4xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.totalPaid)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">EN COURS</p>
          <p className="text-4xl font-bold text-red-500">
            {formatNumberWithAbbreviation(stats.inProgress)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL</p>
          <p className="text-4xl font-bold text-white">
            {formatNumberWithAbbreviation(stats.total)}
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/5 border border-white/10 p-6 mb-6">
        <div className="flex gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par chauffeur, description ou lieu..."
              className="w-full bg-black/50 border border-white/10 text-white pl-11 pr-4 py-3 outline-none hover:border-white/20 focus:border-white/30 transition-all"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-3 bg-black/50 border border-white/10 text-white hover:border-white/20 transition-all whitespace-nowrap"
            >
              <Filter size={20} />
              {statusFilter === "all"
                ? "TOUS LES STATUTS"
                : statusFilter.toUpperCase()}
            </button>

            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 bg-[#0a0a0a] border border-white/10 z-10 min-w-[200px]">
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-all border-b border-white/10"
                >
                  TOUS LES STATUTS
                </button>
                <button
                  onClick={() => {
                    setStatusFilter("En cours");
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-all border-b border-white/10"
                >
                  EN COURS
                </button>
                <button
                  onClick={() => {
                    setStatusFilter("Payé");
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-all"
                >
                  PAYÉ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contraventions Table */}
      <div className="bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          LISTE DES CONTRAVENTIONS
        </h2>

        {/* Table Header */}
        <div className="grid grid-cols-[200px_1fr_250px_120px_120px_120px_140px] gap-4 pb-3 mb-3 border-b border-white/10">
          <p className="text-white/60 text-sm font-medium">CHAUFFEUR</p>
          <p className="text-white/60 text-sm font-medium">DESCRIPTION</p>
          <p className="text-white/60 text-sm font-medium">LIEU</p>
          <p className="text-white/60 text-sm font-medium">DATE</p>
          <p className="text-white/60 text-sm font-medium">MONTANT</p>
          <p className="text-white/60 text-sm font-medium">STATUT</p>
          <p className="text-white/60 text-sm font-medium">ACTIONS</p>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {filteredContraventions.map((contravention) => (
            <div
              key={contravention.id}
              className="grid grid-cols-[200px_1fr_250px_120px_120px_120px_140px] gap-4 items-center bg-black/50 border border-white/10 p-4 hover:border-white/20 transition-all"
            >
              <p className="text-white font-medium">{contravention.driver}</p>
              <p className="text-white/80">{contravention.description}</p>
              <p className="text-white/60 text-sm">{contravention.location}</p>
              <p className="text-white/60 text-sm">{contravention.date}</p>
              <p
                className={`font-bold ${contravention.status === "En cours" ? "text-red-500" : "text-white"}`}
              >
                {contravention.amount} F
              </p>
              <Badge
                className={
                  contravention.status === "Payé"
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }
              >
                {contravention.status}
              </Badge>
              <div className="flex items-center gap-2">
                {contravention.status === "En cours" && (
                  <button
                    onClick={() => handleValidate(contravention.id)}
                    className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    title="Valider"
                  >
                    <Check size={16} className="text-white" />
                  </button>
                )}
                <button
                  onClick={() => handleEdit(contravention)}
                  className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                  title="Modifier"
                >
                  <Edit size={16} className="text-white" />
                </button>
                <button
                  onClick={() => handleDelete(contravention.id)}
                  className="w-8 h-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all"
                  title="Supprimer"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContraventions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">Aucune contravention trouvée</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={openAddDialog}
        className="absolute top-8 right-8 bg-white text-black px-6 py-4 font-bold flex items-center gap-3 hover:bg-white/90 transition-all shadow-lg"
      >
        <Plus size={20} />
        AJOUTER UNE CONTRAVENTION
      </button>

      {/* Edit Dialog */}
      {showEditDialog && selectedContravention && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  MODIFIER LA CONTRAVENTION
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  ID #{selectedContravention.id}
                </p>
              </div>
              <button
                onClick={() => setShowEditDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Driver */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CHAUFFEUR
                </label>
                <select
                  value={editForm.driver}
                  onChange={(e) =>
                    setEditForm({ ...editForm, driver: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="" className="bg-[#0a0a0a]">
                    Sélectionner un chauffeur
                  </option>
                  {driversWithVehicles.map((driver) => (
                    <option
                      key={driver.name}
                      value={driver.name}
                      className="bg-[#0a0a0a]"
                    >
                      {driver.name} - {driver.vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Excès de vitesse"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">LIEU</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Avenue des Champs-Élysées, Paris"
                />
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  MONTANT (F CFA)
                </label>
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: Number(e.target.value) })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="135"
                />
              </div>

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
                      status: e.target.value as "En cours" | "Payé",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="En cours" className="bg-[#0a0a0a]">
                    En cours
                  </option>
                  <option value="Payé" className="bg-[#0a0a0a]">
                    Payé
                  </option>
                </select>
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
                  onClick={() => setShowEditDialog(false)}
                  className="flex-1 bg-white/5 border border-white/10 text-white p-3 font-bold hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  AJOUTER UNE CONTRAVENTION
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Nouvelle contravention
                </p>
              </div>
              <button
                onClick={() => setShowAddDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Driver */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  CHAUFFEUR
                </label>
                <select
                  value={editForm.driver}
                  onChange={(e) =>
                    setEditForm({ ...editForm, driver: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="" className="bg-[#0a0a0a]">
                    Sélectionner un chauffeur
                  </option>
                  {driversWithVehicles.map((driver) => (
                    <option
                      key={driver.name}
                      value={driver.name}
                      className="bg-[#0a0a0a]"
                    >
                      {driver.name} - {driver.vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Excès de vitesse"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">LIEU</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="Avenue des Champs-Élysées, Paris"
                />
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  MONTANT (F CFA)
                </label>
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: Number(e.target.value) })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  placeholder="135"
                />
              </div>

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
                      status: e.target.value as "En cours" | "Payé",
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                >
                  <option value="En cours" className="bg-[#0a0a0a]">
                    En cours
                  </option>
                  <option value="Payé" className="bg-[#0a0a0a]">
                    Payé
                  </option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-white text-black p-3 font-bold hover:bg-white/90 transition-all"
                >
                  AJOUTER
                </button>
                <button
                  onClick={() => setShowAddDialog(false)}
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
