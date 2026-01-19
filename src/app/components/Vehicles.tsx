import { useState, useEffect } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { formatNumberWithAbbreviation } from "@/utils/formatNumber";
import { db } from "@/app/components/db/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface Vehicle {
  id: string;
  plate: string;
  gpsTag: string;
  activationCode: string;
  deactivationCode: string;
  contractType: "Vente" | "Classique";
  status: "Actif" | "Inactif" | "Épave";
  totalEarnings: number;
  totalExpenses: number;
  description: string;
  drivers: string[];
}

export function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDriversDialog, setShowDriversDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        const vehiclesData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Vehicle,
        );
        setVehicles(vehiclesData);
        console.log(
          "✅ Vehicles loaded from Firestore:",
          vehiclesData.length,
          "vehicles",
        );
      } catch (error) {
        console.error("❌ Error loading vehicles from Firestore:", error);
        console.log("🔄 Using local storage mode - no vehicles loaded");
        // En mode local, on garde la liste vide
        setVehicles([]);
      }
    };
    fetchVehicles();
  }, []);

  const [newVehicle, setNewVehicle] = useState({
    plate: "",
    gpsTag: "",
    activationCode: "",
    deactivationCode: "",
    contractType: "Classique" as "Vente" | "Classique",
    description: "",
  });

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddVehicle = async () => {
    if (isLoading) {
      console.log("⚠️ Already processing, ignoring duplicate click");
      return;
    }

    console.log("=== HANDLE ADD VEHICLE START ===");
    console.log("newVehicle state:", JSON.stringify(newVehicle, null, 2));

    if (newVehicle.plate && newVehicle.gpsTag) {
      console.log("✅ Validation PASSED - proceeding with save");
      setIsLoading(true);

      try {
        console.log("🔄 Tentative de sauvegarde dans Firestore...");
        console.log("Collection reference:", collection(db, "vehicles"));

        const vehicleData = {
          ...newVehicle,
          status: "Actif" as const,
          totalEarnings: 0,
          totalExpenses: 0,
          drivers: [],
        };

        console.log(
          "Vehicle data to save:",
          JSON.stringify(vehicleData, null, 2),
        );
        console.log("🔄 Calling addDoc...");

        const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
        console.log("✅ addDoc succeeded!");
        console.log("✅ Vehicle added to Firestore with ID:", docRef.id);

        // Add to local state immediately
        const newVehicleWithId = {
          id: docRef.id,
          ...vehicleData,
        };
        setVehicles((prev) => [...prev, newVehicleWithId]);
        console.log("✅ Vehicle added to local state");

        // Reset form and close dialog
        setShowAddDialog(false);
        setNewVehicle({
          plate: "",
          gpsTag: "",
          activationCode: "",
          deactivationCode: "",
          contractType: "Classique",
          description: "",
        });
        alert("Véhicule ajouté avec succès dans Firebase !");
      } catch (error) {
        console.error("❌ Error adding vehicle to Firestore:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Erreur inconnue";
        const errorCode = (error as any)?.code || "UNKNOWN";
        console.error("Error details:", errorMessage);
        console.error("Error code:", errorCode);

        alert(
          `❌ Erreur Firebase: ${errorMessage}\n\nVérifiez :\n1. Connexion internet\n2. Règles Firestore\n3. Configuration Firebase`,
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("❌ Validation FAILED - plate or gpsTag missing");
      alert("Veuillez saisir l'immatriculation et le numéro de balise GPS");
    }
    console.log("=== HANDLE ADD VEHICLE END ===");
  };

  const handleStatusChange = async (status: "Actif" | "Inactif" | "Épave") => {
    if (selectedVehicle) {
      try {
        await updateDoc(doc(db, "vehicles", selectedVehicle.id), { status });
        setVehicles(
          vehicles.map((v) =>
            v.id === selectedVehicle.id ? { ...v, status } : v,
          ),
        );
        setSelectedVehicle({ ...selectedVehicle, status });
      } catch (error) {
        console.error("Error updating status: ", error);
      }
    }
  };

  const handleDeleteVehicle = async () => {
    if (selectedVehicle) {
      try {
        await deleteDoc(doc(db, "vehicles", selectedVehicle.id));
        setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id));
        setSelectedVehicle(null);
      } catch (error) {
        console.error("Error deleting vehicle: ", error);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          VÉHICULES
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Gérez votre flotte de véhicules VTC
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Rechercher par immatriculation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 text-white h-12"
          />
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-white text-black px-4 md:px-6 py-3 font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
        >
          AJOUTER UN VÉHICULE
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Vehicle List */}
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">
            LISTE DES IMMATRICULATIONS
          </h2>
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredVehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-3 md:p-4 border transition-all ${
                  selectedVehicle?.id === vehicle.id
                    ? "bg-white/10 border-white/40"
                    : "bg-black/50 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-white font-medium">{vehicle.plate}</p>
                    <p className="text-white/40 text-sm">
                      {vehicle.contractType}
                    </p>
                  </div>
                  <Badge
                    className={
                      vehicle.status === "Actif"
                        ? "bg-white/10 text-white border-white/20"
                        : vehicle.status === "Inactif"
                          ? "bg-white/5 text-white/40 border-white/10"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="bg-white/5 border border-white/10 p-6">
          {selectedVehicle ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  DÉTAILS DU VÉHICULE
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDriversDialog(true)}
                    className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
                  >
                    CHAUFFEURS
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
                  >
                    {isEditing ? "ENREGISTRER" : "ÉDITER"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 transition-all border border-gray-500/20"
                    >
                      ANNULER
                    </button>
                  )}
                  <button
                    onClick={handleDeleteVehicle}
                    className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
                  >
                    SUPPRIMER
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 border border-white/10 p-4">
                  <p className="text-white/60 text-sm mb-1">REVENUS TOTAUX</p>
                  <p className="text-white text-2xl font-bold">
                    {formatNumberWithAbbreviation(
                      selectedVehicle.totalEarnings,
                    )}
                  </p>
                </div>
                <div className="bg-black/50 border border-white/10 p-4">
                  <p className="text-white/60 text-sm mb-1">DÉPENSES TOTALES</p>
                  <p className="text-white text-2xl font-bold">
                    {formatNumberWithAbbreviation(
                      selectedVehicle.totalExpenses,
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/60 text-sm mb-2">
                    IMMATRICULATION
                  </Label>
                  <p className="text-white font-medium">
                    {selectedVehicle.plate}
                  </p>
                </div>

                <div>
                  <Label className="text-white/60 text-sm mb-2">
                    BALISE GPS
                  </Label>
                  <p className="text-white font-medium">
                    {selectedVehicle.gpsTag}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/60 text-sm mb-2">
                      CODE D'ACTIVATION
                    </Label>
                    <p className="text-white font-medium font-mono">
                      {selectedVehicle.activationCode}
                    </p>
                  </div>
                  <div>
                    <Label className="text-white/60 text-sm mb-2">
                      CODE DE DÉSACTIVATION
                    </Label>
                    <p className="text-white font-medium font-mono">
                      {selectedVehicle.deactivationCode}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-white/60 text-sm mb-2">
                    TYPE DE CONTRAT
                  </Label>
                  <p className="text-white font-medium">
                    {selectedVehicle.contractType}
                  </p>
                </div>

                <div>
                  <Label className="text-white/60 text-sm mb-2">STATUT</Label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange("Actif")}
                        className={`px-4 py-2 border transition-all ${
                          selectedVehicle.status === "Actif"
                            ? "bg-white/20 border-white text-white"
                            : "bg-white/5 border-white/10 text-white/40"
                        }`}
                      >
                        ACTIF
                      </button>
                      <button
                        onClick={() => handleStatusChange("Inactif")}
                        className={`px-4 py-2 border transition-all ${
                          selectedVehicle.status === "Inactif"
                            ? "bg-white/20 border-white text-white"
                            : "bg-white/5 border-white/10 text-white/40"
                        }`}
                      >
                        INACTIF
                      </button>
                      <button
                        onClick={() => handleStatusChange("Épave")}
                        className={`px-4 py-2 border transition-all ${
                          selectedVehicle.status === "Épave"
                            ? "bg-red-500/20 border-red-500 text-red-400"
                            : "bg-white/5 border-white/10 text-white/40"
                        }`}
                      >
                        ÉPAVE
                      </button>
                    </div>
                  ) : (
                    <Badge
                      className={
                        selectedVehicle.status === "Actif"
                          ? "bg-white/10 text-white border-white/20"
                          : selectedVehicle.status === "Inactif"
                            ? "bg-white/5 text-white/40 border-white/10"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {selectedVehicle.status}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label className="text-white/60 text-sm mb-2">
                    DESCRIPTION
                  </Label>
                  <p className="text-white">{selectedVehicle.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white/40">
                <p>Sélectionnez un véhicule pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Vehicle Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  AJOUTER UN VÉHICULE
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Remplissez les informations du véhicule
                </p>
              </div>
              <button
                onClick={() => setShowAddDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    IMMATRICULATION *
                  </label>
                  <input
                    type="text"
                    value={newVehicle.plate}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      console.log(
                        "Plate input changed from",
                        newVehicle.plate,
                        "to",
                        newValue,
                      );
                      setNewVehicle({ ...newVehicle, plate: newValue });
                      console.log("newVehicle state after plate update:", {
                        ...newVehicle,
                        plate: newValue,
                      });
                    }}
                    placeholder="AB-123-CD"
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    NUMÉRO DE BALISE GPS *
                  </label>
                  <input
                    type="text"
                    value={newVehicle.gpsTag}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      console.log(
                        "GPS input changed from",
                        newVehicle.gpsTag,
                        "to",
                        newValue,
                      );
                      setNewVehicle({ ...newVehicle, gpsTag: newValue });
                      console.log("newVehicle state after GPS update:", {
                        ...newVehicle,
                        gpsTag: newValue,
                      });
                    }}
                    placeholder="GPS001234"
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    CODE D'ACTIVATION
                  </label>
                  <input
                    type="text"
                    value={newVehicle.activationCode}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        activationCode: e.target.value,
                      })
                    }
                    placeholder="ACT-456"
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    CODE DE DÉSACTIVATION
                  </label>
                  <input
                    type="text"
                    value={newVehicle.deactivationCode}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        deactivationCode: e.target.value,
                      })
                    }
                    placeholder="DEACT-456"
                    className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  TYPE DE CONTRAT
                </label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => {
                      console.log("CLASSIQUE button clicked");
                      setNewVehicle({
                        ...newVehicle,
                        contractType: "Classique",
                      });
                      console.log("Contract type set to Classique");
                    }}
                    className={`flex-1 py-3 border transition-all ${
                      newVehicle.contractType === "Classique"
                        ? "bg-white/20 border-white text-white"
                        : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    CLASSIQUE
                  </button>
                  <button
                    onClick={() => {
                      console.log("CONTRAT VENTE button clicked");
                      setNewVehicle({ ...newVehicle, contractType: "Vente" });
                      console.log("Contract type set to Vente");
                    }}
                    className={`flex-1 py-3 border transition-all ${
                      newVehicle.contractType === "Vente"
                        ? "bg-white/20 border-white text-white"
                        : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    CONTRAT VENTE
                  </button>
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  DESCRIPTION
                </label>
                <textarea
                  value={newVehicle.description}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      description: e.target.value,
                    })
                  }
                  placeholder="Informations supplémentaires..."
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="flex-1 py-3 bg-white/5 text-white hover:bg-white/10 transition-all"
                >
                  ANNULER
                </button>
                <button
                  onClick={async () => {
                    try {
                      console.log("AJOUTER LE VÉHICULE button clicked");
                      console.log("Current newVehicle state:", newVehicle);
                      await handleAddVehicle();
                    } catch (error) {
                      console.error(
                        "Error in AJOUTER LE VÉHICULE button:",
                        error,
                      );
                      const errorMessage =
                        error instanceof Error
                          ? error.message
                          : "Erreur inconnue";
                      alert(
                        "Erreur lors de l'ajout du véhicule: " + errorMessage,
                      );
                    }
                  }}
                  disabled={isLoading}
                  className={`flex-1 py-3 font-medium transition-all ${
                    isLoading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {isLoading ? "AJOUT EN COURS..." : "AJOUTER LE VÉHICULE"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drivers Dialog */}
      {showDriversDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-white/10 w-full max-w-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  CHAUFFEURS AFFECTÉS
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Liste des chauffeurs assignés à ce véhicule
                </p>
              </div>
              <button
                onClick={() => setShowDriversDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-3">
                {selectedVehicle?.drivers.map((driver, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                      <span className="text-black font-bold">
                        {driver.charAt(0)}
                      </span>
                    </div>
                    <p className="text-white font-medium">{driver}</p>
                  </div>
                ))}
                {selectedVehicle?.drivers.length === 0 && (
                  <p className="text-white/40 text-center py-8">
                    Aucun chauffeur affecté
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
