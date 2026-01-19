import { useState, useEffect } from "react";
import { db } from "@/app/components/db/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "Actif" | "Inactif" | "Licencié";
  group: "A" | "B" | "C" | "D" | "E" | "F";
  currentVehicle: string | null;
  dailyLimit: number;
}

export function Groups() {
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C" | "D" | "E" | "F">(
    "A",
  );
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "drivers"));
        const driversData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Driver,
        );
        setDrivers(driversData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching drivers: ", error);
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Mock data - same drivers from Drivers.tsx (fallback if Firestore fails)
  const fallbackDrivers: Driver[] = [
    {
      id: "1",
      name: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@example.com",
      status: "Actif",
      group: "A",
      currentVehicle: "AB-123-CD",
      dailyLimit: 500,
    },
    {
      id: "2",
      name: "Marie Laurent",
      phone: "+33 6 23 45 67 89",
      email: "marie.laurent@example.com",
      status: "Actif",
      group: "B",
      currentVehicle: "EF-456-GH",
      dailyLimit: 500,
    },
    {
      id: "3",
      name: "Ahmed Ben",
      phone: "+33 6 34 56 78 90",
      email: "ahmed.ben@example.com",
      status: "Actif",
      group: "C",
      currentVehicle: "IJ-789-KL",
      dailyLimit: 500,
    },
    {
      id: "4",
      name: "Sophie Martin",
      phone: "+33 6 45 67 89 01",
      email: "sophie.martin@example.com",
      status: "Inactif",
      group: "D",
      currentVehicle: null,
      dailyLimit: 500,
    },
    {
      id: "5",
      name: "Pierre Dubois",
      phone: "+33 6 56 78 90 12",
      email: "pierre.dubois@example.com",
      status: "Actif",
      group: "A",
      currentVehicle: "MN-012-OP",
      dailyLimit: 500,
    },
    {
      id: "6",
      name: "Fatima El",
      phone: "+33 6 67 89 01 23",
      email: "fatima.el@example.com",
      status: "Actif",
      group: "B",
      currentVehicle: "QR-345-ST",
      dailyLimit: 500,
    },
    {
      id: "7",
      name: "Lucas Petit",
      phone: "+33 6 78 90 12 34",
      email: "lucas.petit@example.com",
      status: "Actif",
      group: "E",
      currentVehicle: "UV-678-WX",
      dailyLimit: 500,
    },
    {
      id: "8",
      name: "Nadia Benali",
      phone: "+33 6 89 01 23 45",
      email: "nadia.benali@example.com",
      status: "Licencié",
      group: "F",
      currentVehicle: null,
      dailyLimit: 500,
    },
    {
      id: "9",
      name: "Thomas Leroy",
      phone: "+33 6 90 12 34 56",
      email: "thomas.leroy@example.com",
      status: "Actif",
      group: "A",
      currentVehicle: "YZ-901-AB",
      dailyLimit: 500,
    },
    {
      id: "10",
      name: "Sarah Cohen",
      phone: "+33 6 01 23 45 67",
      email: "sarah.cohen@example.com",
      status: "Actif",
      group: "C",
      currentVehicle: "CD-234-EF",
      dailyLimit: 500,
    },
  ];

  // Use Firestore data if available, otherwise fallback to mock data
  const currentDrivers = drivers.length > 0 ? drivers : fallbackDrivers;

  // Count drivers by group
  const groupCounts = {
    A: currentDrivers.filter((d) => d.group === "A").length,
    B: currentDrivers.filter((d) => d.group === "B").length,
    C: currentDrivers.filter((d) => d.group === "C").length,
    D: currentDrivers.filter((d) => d.group === "D").length,
    E: currentDrivers.filter((d) => d.group === "E").length,
    F: currentDrivers.filter((d) => d.group === "F").length,
  };

  // Get drivers for active tab
  const filteredDrivers = currentDrivers.filter((d) => d.group === activeTab);

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          GROUPES
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Gérez les groupes de chauffeurs
        </p>
      </div>

      {/* Group Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 md:mb-8">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE A</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.A}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE B</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.B}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE C</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.C}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE D</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.D}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE E</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.E}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6">
          <p className="text-white/60 text-sm mb-2">GROUPE F</p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {groupCounts.F}
          </p>
          <p className="text-white/40 text-xs mt-2">Membres</p>
        </div>
      </div>

      {/* Group Tabs Container */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
          MEMBRES PAR GROUPE
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 md:mb-6 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("A")}
            className={`px-4 md:px-6 py-3 font-bold transition-all relative text-sm md:text-base whitespace-nowrap ${
              activeTab === "A"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE A
            {activeTab === "A" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("B")}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === "B"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE B
            {activeTab === "B" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("C")}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === "C"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE C
            {activeTab === "C" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("D")}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === "D"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE D
            {activeTab === "D" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("E")}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === "E"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE E
            {activeTab === "E" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("F")}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === "F"
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            GROUPE F
            {activeTab === "F" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>

        {/* Driver List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/40 text-lg">
                Chargement des chauffeurs...
              </p>
            </div>
          ) : filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-black/50 border border-white/10 p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white flex items-center justify-center">
                      <span className="text-black font-bold text-xl">
                        {driver.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">
                        {driver.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="text-white/60 text-sm">
                          {driver.phone}
                        </div>
                        <div className="text-white/60 text-sm">
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

                    <div
                      className={`px-4 py-2 border ${
                        driver.status === "Actif"
                          ? "bg-white/10 text-white border-white/20"
                          : driver.status === "Licencié"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-white/5 text-white/40 border-white/10"
                      }`}
                    >
                      {driver.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white/40 text-lg">
                Aucun chauffeur dans le groupe {activeTab}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
