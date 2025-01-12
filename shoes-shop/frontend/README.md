# Frontend ShoesShop

Ce projet est le frontend de la boutique ShoesShop développé avec Angular. Ce guide vous montrera les étapes pour démarrer et vous donnera des informations sur les commandes courantes à utiliser dans un projet Angular.

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version recommandée : 16.x ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)


## Accédez au projet & installez les dépendances :

```bash
cd frontend
npm install
```

### Créer un composant

Pour créer un nouveau composant dans votre projet Angular, utilisez la commande suivante :


Par exemple, pour créer un composant `header` :
```bash 
ng generate component header
```

Cela créera un dossier `header` avec les fichiers suivants :

- `header.component.ts` (logique du composant)
- `header.component.html` (template HTML)
- `header.component.css` (style du composant)
- `header.component.spec.ts` (tests unitaires)

Vous pouvez également utiliser l'alias `ng g c <nom-du-composant>`.

### Créer un service
Les services Angular sont utilisés pour gérer la logique métier et les interactions avec l'API backend. 


Pour créer un nouveau service, utilisez la commande suivante :
```bash 
ng generate service <nom-du-service>
```

Par exemple, pour créer un service `data` :
```bash 
ng generate service data
```

Cela créera un fichier `data.service.ts` pour gérer la logique de votre service.


### Créer un guard
Les guards Angular sont utilisés pour protéger certaines routes de l'application, en permettant d'empêcher l'accès si l'utilisateur n'est pas authentifié.

Pour créer un nouveau guard, utilisez la commande suivante :
```bash 
ng generate guard <nom-du-guard>
```

Par exemple, pour créer un guard `auth` :
```bash 
ng generate service guard
```

Cela créera un fichier `auth.guard.ts` pour gérer la logique de votre service.

### Lancer le serveur de développement

Pour démarrer le serveur de développement et voir votre application dans le navigateur, utilisez la commande :

```bash 
ng serve
```


Cela lancera un serveur local accessible sur `http://localhost:4200/`. Si vous avez déjà un serveur en cours d'exécution, vous devrez peut-être ajouter l'option `--port` pour changer le port :

```bash 
ng serve --port 4300
```


### Structure de l'application


```bash 

├── 📂 ShoesShopAngular
|   ├──📂 shoes-shop 
|   │   ├── 📂 frontend/             
|   |   │   ├── .vscode
|   |   │   ├── public/
|   |   │   ├── src/
|   │   |   │   ├── app/
|   │   |   │   │   ├── services/   
|   │   |   │   │   ├── app.component.css
|   │   |   │   │   ├── app.component.html
|   │   |   │   │   ├── app.component.spec.ts
|   │   |   │   │   ├── app.component.ts
|   │   |   │   │   └── app.config.ts
|   │   |   │   │   └── app.routes.ts
|   │   |   │   └── index.html
|   │   |   │   └── main.ts
|   │   |   │   └── styles.css
|   │   |   ├── .editorconfig       
|   │   |   ├── .gitignore        
|   │   |   ├── angular.json        
|   │   |   ├── Dockerfile          
|   │   |   ├── package-lock.json        
|   │   |   ├── package.json        
|   │   |   ├── README.md        
|   |   │   ├── tsconfig.app.json   
|   |   │   ├── tsconfig.json   
|   |   │   └── tsconfig.spec.json   
|   ├── docker-compose.yml      
|   └── README.md  

```