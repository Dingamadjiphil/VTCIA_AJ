import { useState, useEffect } from "react";
import { Check, X, Eye, User } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { db } from "@/app/components/db/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

interface PendingDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  group: "A" | "B" | "C" | "D" | "E" | "F";
  status: "En attente";
  photo?: string;
  cni?: string;
  permis?: string;
  certificat?: string;
  createdAt: string;
}

interface ApprovedDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "Actif" | "Inactif" | "Licencié";
  group: "A" | "B" | "C" | "D" | "E" | "F";
  currentVehicle: string | null;
  dailyLimit: number;
}

export function DriverApprovals() {
  const [pendingDrivers, setPendingDrivers] = useState<PendingDriver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<PendingDriver | null>(
    null,
  );
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingDrivers();
  }, []);

  const fetchPendingDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pendingDrivers"));
      const pendingDriversData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PendingDriver[];
      setPendingDrivers(pendingDriversData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching pending drivers: ", error);
      setIsLoading(false);
    }
  };

  const approveDriver = async (driver: PendingDriver) => {
    try {
      // Add to approved drivers collection
      const approvedDriverData: Omit<ApprovedDriver, "id"> = {
        name: driver.name,
        phone: driver.phone,
        email: driver.email,
        status: "Actif",
        group: driver.group,
        currentVehicle: null,
        dailyLimit: 500,
      };

      await addDoc(collection(db, "drivers"), approvedDriverData);

      // Remove from pending drivers
      await updateDoc(doc(db, "pendingDrivers", driver.id), {
        status: "Approuvé",
      });

      // Update local state
      setPendingDrivers((prev) => prev.filter((d) => d.id !== driver.id));

      alert("Chauffeur approuvé avec succès!");
    } catch (error) {
      console.error("Error approving driver: ", error);
      alert("Erreur lors de l'approbation du chauffeur");
    }
  };

  const rejectDriver = async (driver: PendingDriver) => {
    try {
      // Update status to rejected
      await updateDoc(doc(db, "pendingDrivers", driver.id), {
        status: "Rejeté",
      });

      // Update local state
      setPendingDrivers((prev) => prev.filter((d) => d.id !== driver.id));

      alert("Demande rejetée");
    } catch (error) {
      console.error("Error rejecting driver: ", error);
      alert("Erreur lors du rejet de la demande");
    }
  };

  const viewDriverDetails = (driver: PendingDriver) => {
    setSelectedDriver(driver);
    setShowDetailsDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          APPROBATIONS CHAUFFEURS
        </h1>
        <p className="text-white/60">
          Gérez les demandes d'inscription des nouveaux chauffeurs
        </p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            Demandes en attente ({pendingDrivers.length})
          </h2>
        </div>

        <div className="divide-y divide-white/10">
          {pendingDrivers.length === 0 ? (
            <div className="p-8 text-center text-white/60">
              Aucune demande en attente
            </div>
          ) : (
            pendingDrivers.map((driver) => (
              <div
                key={driver.id}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{driver.name}</h3>
                      <p className="text-white/60 text-sm">{driver.email}</p>
                      <p className="text-white/60 text-sm">{driver.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500/20 text-yellow-400"
                    >
                      En attente
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/60"
                    >
                      Groupe {driver.group}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewDriverDetails(driver)}
                      className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                      title="Voir détails"
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => approveDriver(driver)}
                      className="w-8 h-8 bg-green-500/20 border border-green-500/30 flex items-center justify-center hover:bg-green-500/30 transition-all"
                      title="Approuver"
                    >
                      <Check size={16} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => rejectDriver(driver)}
                      className="w-8 h-8 bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-all"
                      title="Rejeter"
                    >
                      <X size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Details Dialog */}
      {showDetailsDialog && selectedDriver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                DÉTAILS DU CHAUFFEUR
              </h2>
              <button
                onClick={() => setShowDetailsDialog(false)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    NOM
                  </label>
                  <p className="text-white bg-white/5 p-3 rounded">
                    {selectedDriver.name}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    TÉLÉPHONE
                  </label>
                  <p className="text-white bg-white/5 p-3 rounded">
                    {selectedDriver.phone}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    EMAIL
                  </label>
                  <p className="text-white bg-white/5 p-3 rounded">
                    {selectedDriver.email}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    GROUPE
                  </label>
                  <p className="text-white bg-white/5 p-3 rounded">
                    {selectedDriver.group}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-white/60 text-sm mb-2 block">
                  DATE D'INSCRIPTION
                </label>
                <p className="text-white bg-white/5 p-3 rounded">
                  {new Date(selectedDriver.createdAt).toLocaleDateString(
                    "fr-FR",
                  )}
                </p>
              </div>

              {/* Documents */}
              <div className="mt-6">
                <h3 className="text-white font-medium mb-4">DOCUMENTS</h3>
                <div className="space-y-3">
                  {selectedDriver.photo && (
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span className="text-white">Photo</span>
                      <button className="text-blue-400 hover:text-blue-300">
                        Voir
                      </button>
                    </div>
                  )}
                  {selectedDriver.cni && (
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span className="text-white">CNI</span>
                      <button className="text-blue-400 hover:text-blue-300">
                        Voir
                      </button>
                    </div>
                  )}
                  {selectedDriver.permis && (
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span className="text-white">Permis de conduire</span>
                      <button className="text-blue-400 hover:text-blue-300">
                        Voir
                      </button>
                    </div>
                  )}
                  {selectedDriver.certificat && (
                    <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                      <span className="text-white">
                        Certificat de résidence
                      </span>
                      <button className="text-blue-400 hover:text-blue-300">
                        Voir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsDialog(false)}
                className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  rejectDriver(selectedDriver);
                  setShowDetailsDialog(false);
                }}
                className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
              >
                Rejeter
              </button>
              <button
                onClick={() => {
                  approveDriver(selectedDriver);
                  setShowDetailsDialog(false);
                }}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all"
              >
                Approuver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
