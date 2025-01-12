# Backend ShoesShop

Ce projet est le backend de la boutique ShoesShop développé avec ExpressJS. Ce guide vous montrera les étapes pour démarrer et vous donnera des informations sur les commandes courantes à utiliser dans un projet ExpressJS.

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version recommandée : 16.x ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)


### Accédez au projet & installez les dépendances

```bash
cd backend
npm install
```


### Commandes courantes

**Démarre le serveur:**
```bash
npm run dev
```

**Lance les tests unitaires:**
```bash
npm run test
```

### Technologies utilisées
* Mongoose : ODM pour MongoDB 
* JWT : Authentification basée sur les JSON Web Tokens

### Structure de l'application

```bash 

├── 📂 ShoesShopAngular
|   ├──📂 shoes-shop
|   │   ├── 📂 backend/             
|   |   │   ├── src/
|   |   │   │   ├── controllers/    
|   |   │   │   ├── middleware/    
|   |   │   │   ├── models/         
|   |   │   │   ├── routes/         
|   |   │   │   ├── utils/         
|   |   │   │   ├── connectToDB.ts          
|   |   │   │   └── index.ts        
|   │   |   ├── .env.example                
|   │   |   ├── .gitignore                
|   │   |   ├── Dockerfile          
|   │   |   ├── package.json        
|   │   |   ├── README.md       
|   │   |   └── tsconfig.json       
|   ├── docker-compose.yml      
|   └── README.md  

```