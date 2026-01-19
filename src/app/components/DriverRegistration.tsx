import { useState } from "react";
import { User, Upload, Check } from "lucide-react";
import { db } from "@/app/components/db/firebase";
import { collection, addDoc } from "firebase/firestore";

interface RegistrationForm {
  name: string;
  phone: string;
  email: string;
  group: "A" | "B" | "C" | "D" | "E" | "F";
  photo: File | null;
  cni: File | null;
  permis: File | null;
  certificat: File | null;
}

export function DriverRegistration() {
  const [form, setForm] = useState<RegistrationForm>({
    name: "",
    phone: "",
    email: "",
    group: "A",
    photo: null,
    cni: null,
    permis: null,
    certificat: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll store file names/URLs. In a real app, you'd upload files to storage
      const registrationData = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        group: form.group,
        status: "En attente",
        photo: form.photo?.name || null,
        cni: form.cni?.name || null,
        permis: form.permis?.name || null,
        certificat: form.certificat?.name || null,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "pendingDrivers"), registrationData);

      setIsSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        group: "A",
        photo: null,
        cni: null,
        permis: null,
        certificat: null,
      });
    } catch (error) {
      console.error("Error submitting registration: ", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (
    field: keyof Pick<
      RegistrationForm,
      "photo" | "cni" | "permis" | "certificat"
    >,
    file: File | null,
  ) => {
    setForm({ ...form, [field]: file });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Inscription envoyée !
          </h2>
          <p className="text-white/60 mb-6">
            Votre demande d'inscription a été soumise avec succès. Un
            administrateur examinera votre dossier dans les plus brefs délais.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-white text-black py-3 font-medium hover:bg-white/90 transition-all"
          >
            Nouvelle inscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            INSCRIPTION CHAUFFEUR
          </h1>
          <p className="text-white/60">
            Remplissez ce formulaire pour devenir chauffeur JET
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-white/60 text-sm mb-2 block">
                NOM ET PRÉNOMS *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                placeholder="Jean Dupont"
                required
              />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-2 block">
                NUMÉRO DE TÉLÉPHONE *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
                placeholder="+33 6 12 34 56 78"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">
              ADRESSE EMAIL *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
              placeholder="jean.dupont@email.com"
              required
            />
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">
              GROUPE SOUHAITÉ
            </label>
            <select
              value={form.group}
              onChange={(e) =>
                setForm({
                  ...form,
                  group: e.target.value as "A" | "B" | "C" | "D" | "E" | "F",
                })
              }
              className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all"
            >
              <option value="A">Groupe A</option>
              <option value="B">Groupe B</option>
              <option value="C">Groupe C</option>
              <option value="D">Groupe D</option>
              <option value="E">Groupe E</option>
              <option value="F">Groupe F</option>
            </select>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">DOCUMENTS REQUIS</h3>

            <div>
              <label className="text-white/60 text-sm mb-2 block">
                PHOTO D'IDENTITÉ
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange("photo", e.target.files?.[0] || null)
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                />
              </div>
              {form.photo && (
                <p className="text-white/60 text-sm mt-2">
                  Fichier sélectionné : {form.photo.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-2 block">
                CARTE NATIONALE D'IDENTITÉ (CNI) *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileChange("cni", e.target.files?.[0] || null)
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  required
                />
              </div>
              {form.cni && (
                <p className="text-white/60 text-sm mt-2">
                  Fichier sélectionné : {form.cni.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-2 block">
                PERMIS DE CONDUIRE *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileChange("permis", e.target.files?.[0] || null)
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  required
                />
              </div>
              {form.permis && (
                <p className="text-white/60 text-sm mt-2">
                  Fichier sélectionné : {form.permis.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-2 block">
                CERTIFICAT DE RÉSIDENCE *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileChange("certificat", e.target.files?.[0] || null)
                  }
                  className="w-full bg-white/5 border border-white/10 text-white p-3 hover:border-white/20 focus:border-white/30 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                  required
                />
              </div>
              {form.certificat && (
                <p className="text-white/60 text-sm mt-2">
                  Fichier sélectionné : {form.certificat.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-4 font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black animate-spin rounded-full"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Upload size={20} />
                SOUMETTRE L'INSCRIPTION
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
