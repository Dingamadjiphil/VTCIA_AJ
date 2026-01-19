import { useState } from 'react';
import { AlertTriangle, Calendar, Filter, X, MapPin, Clock, Phone } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type AlertCategory = 'Accident' | 'Panne technique' | 'Sécurité / Agression' | 'Autre urgence';
type AlertStatus = 'En attente' | 'En cours' | 'Résolu';

interface Alert {
  id: number;
  driver: string;
  vehicle: string;
  category: AlertCategory;
  status: AlertStatus;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  phone: string;
  photo: string;
  severity: 'high' | 'medium' | 'low';
}

export function Alertes() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filterCategory, setFilterCategory] = useState<AlertCategory | 'Tous'>('Tous');
  const [filterStatus, setFilterStatus] = useState<AlertStatus | 'Tous'>('Tous');
  const [filterDate, setFilterDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const alerts: Alert[] = [
    {
      id: 1,
      driver: 'Jean Dupont',
      vehicle: 'AB-123-CD',
      category: 'Accident',
      status: 'En cours',
      title: 'Collision arrière',
      description: 'Collision à faible vitesse avec un autre véhicule au feu rouge. Pas de blessés. Dégâts mineurs sur le pare-choc arrière. Police informée, constat en cours.',
      location: 'Boulevard Haussmann, Paris 8e',
      date: '2026-01-19',
      time: '14:30',
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1647292882945-d5c839432d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2NpZGVudCUyMGRhbWFnZXxlbnwxfHx8fDE3Njg3NDQyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'high',
    },
    {
      id: 2,
      driver: 'Marie Laurent',
      vehicle: 'EF-456-GH',
      category: 'Panne technique',
      status: 'En attente',
      title: 'Surchauffe moteur',
      description: 'Le voyant de température moteur est passé au rouge. Véhicule immobilisé sur le bas-côté. Fumée blanche sortant du capot. Température extérieure élevée.',
      location: 'Autoroute A1, Sortie 7',
      date: '2026-01-19',
      time: '12:15',
      phone: '+33 6 23 45 67 89',
      photo: 'https://images.unsplash.com/photo-1760555960753-df6dca823f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmVha2Rvd24lMjBlbmdpbmV8ZW58MXx8fHwxNzY4ODE4Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'high',
    },
    {
      id: 3,
      driver: 'Ahmed Ben',
      vehicle: 'IJ-789-KL',
      category: 'Sécurité / Agression',
      status: 'Résolu',
      title: 'Tentative d\'agression',
      description: 'Client agressif refusant de payer la course et menaçant le chauffeur. Situation désamorcée grâce à l\'intervention d\'un agent de sécurité. Course annulée.',
      location: 'Gare du Nord, Paris 10e',
      date: '2026-01-18',
      time: '23:45',
      phone: '+33 6 34 56 78 90',
      photo: 'https://images.unsplash.com/photo-1604487046854-fd4640be0c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjB3YXJuaW5nfGVufDF8fHx8MTc2ODgxODY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'high',
    },
    {
      id: 4,
      driver: 'Sophie Martin',
      vehicle: 'MN-012-OP',
      category: 'Panne technique',
      status: 'Résolu',
      title: 'Crevaison',
      description: 'Pneu avant gauche crevé suite au passage sur un débris métallique. Roue de secours installée. Dépannage effectué. Véhicule en route vers le garage.',
      location: 'Avenue des Champs-Élysées, Paris 8e',
      date: '2026-01-18',
      time: '16:20',
      phone: '+33 6 45 67 89 01',
      photo: 'https://images.unsplash.com/photo-1768401658109-a4dc907f2734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmVha2Rvd24lMjB0aXJlfGVufDF8fHx8MTc2ODgxODY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'medium',
    },
    {
      id: 5,
      driver: 'Pierre Dubois',
      vehicle: 'QR-345-ST',
      category: 'Autre urgence',
      status: 'En attente',
      title: 'Client malade',
      description: 'Client pris de malaise dans le véhicule. Premiers secours prodigués. Ambulance appelée et arrivée sur place. Client transporté à l\'hôpital.',
      location: 'Rue de Rivoli, Paris 1er',
      date: '2026-01-18',
      time: '10:30',
      phone: '+33 6 56 78 90 12',
      photo: 'https://images.unsplash.com/photo-1604487046854-fd4640be0c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjB3YXJuaW5nfGVufDF8fHx8MTc2ODgxODY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'high',
    },
    {
      id: 6,
      driver: 'Fatima Zahra',
      vehicle: 'UV-678-WX',
      category: 'Accident',
      status: 'En cours',
      title: 'Accrochage latéral',
      description: 'Véhicule rayé sur le côté droit lors d\'un dépassement serré. Rétroviseur endommagé. L\'autre conducteur a refusé de s\'arrêter. Plaque d\'immatriculation notée.',
      location: 'Périphérique Sud, Porte d\'Orléans',
      date: '2026-01-17',
      time: '18:45',
      phone: '+33 6 67 89 01 23',
      photo: 'https://images.unsplash.com/photo-1647292882945-d5c839432d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2NpZGVudCUyMGRhbWFnZXxlbnwxfHx8fDE3Njg3NDQyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'medium',
    },
    {
      id: 7,
      driver: 'Lucas Bernard',
      vehicle: 'AB-123-CD',
      category: 'Panne technique',
      status: 'En cours',
      title: 'Batterie déchargée',
      description: 'Impossible de démarrer le véhicule. Batterie complètement déchargée. Demande de dépannage effectuée. En attente d\'intervention.',
      location: 'Place de la Bastille, Paris 11e',
      date: '2026-01-17',
      time: '08:15',
      phone: '+33 6 78 90 12 34',
      photo: 'https://images.unsplash.com/photo-1760555960753-df6dca823f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBicmVha2Rvd24lMjBlbmdpbmV8ZW58MXx8fHwxNzY4ODE4Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'medium',
    },
    {
      id: 8,
      driver: 'Emma Leroy',
      vehicle: 'EF-456-GH',
      category: 'Sécurité / Agression',
      status: 'Résolu',
      title: 'Agression verbale',
      description: 'Client extrêmement agressif verbalement durant toute la course. Insultes et menaces. Client signalé sur la plateforme et bloqué.',
      location: 'Montmartre, Paris 18e',
      date: '2026-01-16',
      time: '21:30',
      phone: '+33 6 89 01 23 45',
      photo: 'https://images.unsplash.com/photo-1604487046854-fd4640be0c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjB3YXJuaW5nfGVufDF8fHx8MTc2ODgxODY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'medium',
    },
    {
      id: 9,
      driver: 'Thomas Martin',
      vehicle: 'IJ-789-KL',
      category: 'Autre urgence',
      status: 'Résolu',
      title: 'Objet oublié de valeur',
      description: 'Client a oublié un sac contenant un ordinateur portable et des documents importants. Client contacté immédiatement. Rendez-vous organisé pour restitution.',
      location: 'La Défense, Puteaux',
      date: '2026-01-16',
      time: '14:20',
      phone: '+33 6 90 12 34 56',
      photo: 'https://images.unsplash.com/photo-1604487046854-fd4640be0c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjB3YXJuaW5nfGVufDF8fHx8MTc2ODgxODY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'low',
    },
    {
      id: 10,
      driver: 'Jean Dupont',
      vehicle: 'MN-012-OP',
      category: 'Accident',
      status: 'Résolu',
      title: 'Choc avec piéton',
      description: 'Piéton ayant traversé brusquement hors passage piéton. Freinage d\'urgence. Contact mineur. Pas de blessure grave. Constat établi avec témoins.',
      location: 'Boulevard Saint-Germain, Paris 6e',
      date: '2026-01-15',
      time: '17:10',
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1647292882945-d5c839432d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2NpZGVudCUyMGRhbWFnZXxlbnwxfHx8fDE3Njg3NDQyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      severity: 'high',
    },
  ];

  const categories: (AlertCategory | 'Tous')[] = [
    'Tous',
    'Accident',
    'Panne technique',
    'Sécurité / Agression',
    'Autre urgence',
  ];

  const statuses: (AlertStatus | 'Tous')[] = [
    'Tous',
    'En attente',
    'En cours',
    'Résolu',
  ];

  const filteredAlerts = alerts.filter((alert) => {
    const matchCategory = filterCategory === 'Tous' || alert.category === filterCategory;
    const matchStatus = filterStatus === 'Tous' || alert.status === filterStatus;
    const matchDate = !filterDate || alert.date === filterDate;
    return matchCategory && matchStatus && matchDate;
  });

  const stats = {
    total: alerts.length,
    enAttente: alerts.filter(a => a.status === 'En attente').length,
    enCours: alerts.filter(a => a.status === 'En cours').length,
    resolues: alerts.filter(a => a.status === 'Résolu').length,
  };

  const getCategoryColor = (category: AlertCategory) => {
    switch (category) {
      case 'Accident':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Panne technique':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Sécurité / Agression':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Autre urgence':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case 'En attente':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'En cours':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Résolu':
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'high') {
      return <AlertTriangle className="text-red-500" size={20} />;
    }
    return <AlertTriangle className="text-orange-500" size={20} />;
  };

  return (
    <div className="p-8 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">ALERTES</h1>
        <p className="text-white/60">Gestion des alertes et urgences signalées par les chauffeurs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">TOTAL ALERTES</p>
          <p className="text-4xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">EN ATTENTE</p>
          <p className="text-4xl font-bold text-red-500">{stats.enAttente}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">EN COURS</p>
          <p className="text-4xl font-bold text-orange-500">{stats.enCours}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6">
          <p className="text-white/60 text-sm mb-2">RÉSOLUES</p>
          <p className="text-4xl font-bold text-white">{stats.resolues}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">FILTRES</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-white/90 transition-all"
          >
            <Filter size={16} />
            {showFilters ? 'MASQUER' : 'AFFICHER'}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">CATÉGORIE</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as AlertCategory | 'Tous')}
                className="w-full bg-black/50 border border-white/10 text-white p-3 focus:outline-none focus:border-white/30"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">STATUT</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as AlertStatus | 'Tous')}
                className="w-full bg-black/50 border border-white/10 text-white p-3 focus:outline-none focus:border-white/30"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">DATE</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white p-3 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
        )}
      </div>

      {/* Alerts List */}
      <div className="bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          LISTE DES ALERTES ({filteredAlerts.length})
        </h2>
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="bg-black/50 border border-white/10 p-4 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Severity Icon */}
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                    {getSeverityIcon(alert.severity)}
                  </div>

                  {/* Alert Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-lg">{alert.title}</h3>
                      <Badge className={getCategoryColor(alert.category)}>
                        {alert.category}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-6 text-white/40 text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin size={14} />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {alert.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle */}
                <div className="text-right">
                  <p className="text-white font-medium">{alert.driver}</p>
                  <p className="text-white/60 text-sm">{alert.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Detail Dialog */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Dialog Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedAlert.title}</h2>
                <div className="flex items-center gap-3">
                  <Badge className={getCategoryColor(selectedAlert.category)}>
                    {selectedAlert.category}
                  </Badge>
                  <Badge className={getStatusColor(selectedAlert.status)}>
                    {selectedAlert.status}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Left Column - Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">CHAUFFEUR</p>
                    <p className="text-white font-medium text-lg">{selectedAlert.driver}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">VÉHICULE</p>
                    <p className="text-white font-medium text-lg">{selectedAlert.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">TÉLÉPHONE</p>
                    <p className="text-white font-medium text-lg flex items-center gap-2">
                      <Phone size={16} />
                      {selectedAlert.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">LOCALISATION</p>
                    <p className="text-white font-medium flex items-center gap-2">
                      <MapPin size={16} />
                      {selectedAlert.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">DATE ET HEURE</p>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      {selectedAlert.date} à {selectedAlert.time}
                    </p>
                  </div>
                </div>

                {/* Right Column - Photo */}
                <div>
                  <p className="text-white/60 text-sm mb-2">PHOTO DE L'INCIDENT</p>
                  <div className="bg-black/50 border border-white/10 overflow-hidden">
                    <ImageWithFallback
                      src={selectedAlert.photo}
                      alt={selectedAlert.title}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-white/60 text-sm mb-2">DESCRIPTION DÉTAILLÉE</p>
                <div className="bg-black/50 border border-white/10 p-4">
                  <p className="text-white leading-relaxed">{selectedAlert.description}</p>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="p-6 border-t border-white/10 flex gap-4">
              <button
                onClick={() => setSelectedAlert(null)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                FERMER
              </button>
              <button className="flex-1 px-6 py-3 bg-white text-black hover:bg-white/90 transition-all">
                MARQUER COMME RÉSOLU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}