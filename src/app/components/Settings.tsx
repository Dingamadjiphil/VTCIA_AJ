import { useState } from "react";
import { useTheme } from "./ThemeContext";

export function Settings() {
  const [vehicleAlerts, setVehicleAlerts] = useState(true);
  const [driverAlerts, setDriverAlerts] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleChangePassword = () => {
    alert("Fonction de changement de mot de passe à implémenter");
  };

  const handleTwoFactorAuth = () => {
    alert("Fonction d'authentification à deux facteurs à implémenter");
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "sombre" | "clair");
  };

  const handleExportData = () => {
    alert("Fonction d'exportation des données à implémenter");
  };
  return (
    <div
      className={`p-4 md:p-8 max-w-[1920px] mx-auto ${theme === "sombre" ? "text-white" : "text-black"}`}
    >
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold mb-2 ${theme === "sombre" ? "text-white" : "text-black"}`}
        >
          PARAMÈTRES
        </h1>
        <p
          className={`${theme === "sombre" ? "text-white/60" : "text-black/60"} text-sm md:text-base`}
        >
          Configurez votre plateforme JET
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Notifications */}
        <div
          className={`${theme === "sombre" ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-300"} border p-4 md:p-6`}
        >
          <div className="mb-4 md:mb-6">
            <h2
              className={`text-lg md:text-xl font-bold ${theme === "sombre" ? "text-white" : "text-black"}`}
            >
              NOTIFICATIONS
            </h2>
            <p
              className={`${theme === "sombre" ? "text-white/60" : "text-black/60"} text-sm`}
            >
              Gérez vos alertes
            </p>
          </div>
          <div className="space-y-4">
            <div
              className={`flex items-center justify-between p-3 md:p-4 ${theme === "sombre" ? "bg-black/50 border-white/10" : "bg-white border-gray-300"} border`}
            >
              <p
                className={`${theme === "sombre" ? "text-white" : "text-black"}`}
              >
                Alertes véhicules
              </p>
              <div
                className={`w-12 h-6 bg-white relative cursor-pointer transition-all ${vehicleAlerts ? "bg-white" : "bg-gray-400"}`}
                onClick={() => setVehicleAlerts(!vehicleAlerts)}
              >
                <div
                  className={`w-5 h-5 bg-black absolute top-0.5 transition-all ${vehicleAlerts ? "right-0.5" : "left-0.5"}`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10">
              <p className="text-white">Alertes chauffeurs</p>
              <div
                className={`w-12 h-6 bg-white relative cursor-pointer transition-all ${driverAlerts ? "bg-white" : "bg-gray-400"}`}
                onClick={() => setDriverAlerts(!driverAlerts)}
              >
                <div
                  className={`w-5 h-5 bg-black absolute top-0.5 transition-all ${driverAlerts ? "right-0.5" : "left-0.5"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/5 border border-white/10 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">SÉCURITÉ</h2>
            <p className="text-white/60 text-sm">Paramètres de sécurité</p>
          </div>
          <div className="space-y-4">
            <button
              className="w-full p-4 bg-black/50 border border-white/10 text-white text-left hover:border-white/20 transition-all"
              onClick={handleChangePassword}
            >
              Modifier le mot de passe
            </button>
            <button
              className="w-full p-4 bg-black/50 border border-white/10 text-white text-left hover:border-white/20 transition-all"
              onClick={handleTwoFactorAuth}
            >
              Authentification à deux facteurs
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div
          className={`${theme === "sombre" ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-300"} border p-6`}
        >
          <div className="mb-6">
            <h2
              className={`text-xl font-bold ${theme === "sombre" ? "text-white" : "text-black"}`}
            >
              APPARENCE
            </h2>
            <p
              className={`${theme === "sombre" ? "text-white/60" : "text-black/60"} text-sm`}
            >
              Personnalisez l'interface
            </p>
          </div>
          <div className="space-y-4">
            <div
              className={`p-4 ${theme === "sombre" ? "bg-black/50 border-white/10" : "bg-white border-gray-300"} border`}
            >
              <p
                className={`mb-3 ${theme === "sombre" ? "text-white" : "text-black"}`}
              >
                THÈME
              </p>
              <div className="flex gap-3">
                <button
                  className={`flex-1 p-3 border-2 transition-all ${
                    theme === "sombre"
                      ? "bg-black border-white text-white"
                      : theme === "clair"
                        ? "bg-gray-200 border-gray-400 text-black"
                        : "bg-white/5 border-white/10 text-white/40"
                  }`}
                  onClick={() => handleThemeChange("sombre")}
                >
                  SOMBRE
                </button>
                <button
                  className={`flex-1 p-3 border-2 transition-all ${
                    theme === "clair"
                      ? "bg-white border-black text-black"
                      : theme === "sombre"
                        ? "bg-gray-800 border-gray-600 text-white"
                        : "bg-white/5 border-white/10 text-white/40"
                  }`}
                  onClick={() => handleThemeChange("clair")}
                >
                  CLAIR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="bg-white/5 border border-white/10 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">DONNÉES</h2>
            <p className="text-white/60 text-sm">Gestion des données</p>
          </div>
          <div className="space-y-4">
            <button
              className="w-full p-4 bg-black/50 border border-white/10 text-white text-left hover:border-white/20 transition-all"
              onClick={handleExportData}
            >
              Exporter les données
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
