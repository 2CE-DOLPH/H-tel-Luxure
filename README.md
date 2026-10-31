# Site Web Hôtel Luxure

Un site web moderne et responsive pour un hôtel avec système de réservation en ligne.

## 🏨 Fonctionnalités

### ✨ Interface utilisateur
- **Design moderne et responsive** - S'adapte à tous les écrans (mobile, tablette, desktop)
- **Navigation fluide** - Menu hamburger pour mobile, navigation par ancres
- **Animations CSS** - Transitions et effets visuels élégants
- **Images haute qualité** - Photos d'hôtel provenant d'Unsplash

### 🛏️ Gestion des chambres
- **3 types de chambres** :
  - Chambre Standard (1200000FNG/nuit)
  - Chambre Deluxe (1800000FNG/nuit) 
  - Suite Présidentielle (3500000FNG/nuit)
- **Descriptions détaillées** avec équipements et services
- **Prix transparents** affichés clairement

### 📅 Système de réservation
- **Formulaire interactif** avec validation en temps réel
- **Calcul automatique** du prix total selon les dates et le type de chambre
- **Validation des dates** - Impossible de réserver dans le passé
- **Résumé de réservation** affiché avant confirmation
- **Stockage local** des réservations (localStorage)
- **Modal de confirmation** avec numéro de réservation

### 🎯 Services proposés
- Restaurant gastronomique
- Piscine extérieure chauffée
- Spa & Bien-être
- Salle de sport
- Parking privé sécurisé
- Navette aéroport gratuite

### 📞 Contact
- **Formulaire de contact** fonctionnel
- **Informations de contact** complètes
- **Design cohérent** avec le reste du site

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Flexbox et Grid
- **JavaScript ES6+** - Logique interactive
- **Font Awesome** - Icônes vectorielles
- **LocalStorage** - Persistance des données

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :
- **Mobile** (< 768px) - Menu hamburger, colonnes uniques
- **Tablette** (768px - 1024px) - Layout adaptatif
- **Desktop** (> 1024px) - Layout complet avec grilles

## 🚀 Installation et utilisation

1. **Téléchargez** tous les fichiers dans un dossier
2. **Ouvrez** `index.html` dans votre navigateur
3. **C'est tout !** Le site fonctionne sans serveur

### Structure des fichiers
```
site_hôtel/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## 🎨 Personnalisation

### Couleurs principales
- **Primaire** : #e74c3c (Rouge)
- **Secondaire** : #2c3e50 (Bleu foncé)
- **Accent** : #c0392b (Rouge foncé)
- **Neutre** : #ecf0f1 (Gris clair)

### Modifier les prix
Éditez l'objet `roomPrices` dans `script.js` :
```javascript
const roomPrices = {
    standard: 120,  // Prix en euros
    deluxe: 180,
    suite: 350
};
```

### Ajouter des chambres
1. Ajoutez la carte dans la section `.rooms-grid` du HTML
2. Ajoutez l'option dans le formulaire de réservation
3. Mettez à jour l'objet `roomPrices` dans le JavaScript

## 📋 Fonctionnalités avancées

### Système de réservation
- **Validation en temps réel** des formulaires
- **Calcul automatique** des prix
- **Gestion des conflits** de dates (simulation)
- **Notifications** de succès/erreur
- **Persistance** des données

### Animations
- **Scroll animations** - Éléments qui apparaissent au scroll
- **Hover effects** - Effets au survol des cartes
- **Loading states** - Indicateurs de chargement
- **Modal animations** - Transitions fluides

### Accessibilité
- **Navigation au clavier** supportée
- **Contraste** respecté
- **Labels** appropriés sur les formulaires
- **Structure sémantique** HTML

## 🔧 Améliorations possibles

### Backend
- Intégration avec une base de données
- API REST pour les réservations
- Système de paiement en ligne
- Gestion des disponibilités en temps réel

### Frontend
- Mode sombre/clair
- Galerie d'images des chambres
- Carte interactive de localisation
- Chat en direct
- Système de commentaires/avis

### Fonctionnalités
- Gestion des utilisateurs
- Historique des réservations
- Notifications email
- Système de fidélité
- Multi-langues

## 📞 Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à me contacter !

---

**Développé avec ❤️ pour Hôtel Luxure**
