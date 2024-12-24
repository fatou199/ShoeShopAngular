# Gestion d'une Boutique de Chaussures en Ligne avec un CRUD Complet

## Description du projet
Ce projet est une application web que je développe seule dans le but d'apprendre et de mettre en pratique différentes technologies modernes. L'objectif principal est de créer une boutique de chaussures en ligne, où les utilisateurs peuvent consulter, ajouter des produits à leur panier, passer commande et gérer leurs achats.

## Pourquoi ce projet ?
J'ai décidé d'apprendre à intégrer plusieurs technologies web populaires à travers ce projet. Travailler sur une boutique en ligne me permet de me confronter à des problématiques réelles telles que la gestion d'une base de données, la création d'une API REST, la gestion d'état dans une application Angular, et la conteneurisation d'une application complète avec Docker. Ce projet combine plusieurs aspects du développement web moderne et me permet de créer une application complète en partant de zéro.

## Prérequis
* Node.js installé (version 16 ou supérieure)
* Docker et Docker Compose installés pour la conteneurisation

## Installation
**Clonez ce repository sur votre machine locale :**
```bash 
git clone  <url-du-repo>
cd shoe-shop
``` 

**Installez les dépendances pour le backend et le frontend :**

* Pour le backend :

```bash
cd backend
npm install
```

* Pour le frontend :

```bash
cd frontend
npm install
```
**Démarrer l'application avec Docker :**

À la racine du projet (où se trouve docker-compose.yml), exécutez :

```bash
docker compose up --build
```

Cela va démarrer les services frontend, backend et MongoDB dans des containers Docker.


## Gestion de la base de données MongoDB dans Docker

### Accédez au conteneur Docker

Méthode 1 : Accédez au conteneur avec mongosh

- Vous pouvez vous connecter en utilisant les identifiants spécifiés dans ces variables d'environnement :
```bash
docker exec -it mongodb mongosh -u <MONGO_INITDB_ROOT_USERNAME> -p <MONGO_INITDB_ROOT_PASSWORD> --authenticationDatabase admin
```

- Par exemple, si votre docker-compose.yml définit l'utilisateur admin et le mot de passe root, la commande deviendra :
```bash
docker exec -it mongodb mongosh -u admin -p root --authenticationDatabase admin
```

Méthode 2 : Accédez au conteneur en mode bash

* Connectez-vous au conteneur en mode bash :

```bash
docker exec -it mongodb bash
```

* Démarrez le shell MongoDB (mongosh ou mongo) :
```bash
mongosh
```

* Se connecter avec l'utilisateur admin et son mot de passe :

```bash
use admin
db.auth("admin", "root")
```

## Utilisation
* Frontend :

Accédez à l'interface utilisateur via http://localhost:4200 (port par défaut d'Angular)

* Backend :

L'API est accessible à http://localhost:3000  (port par défaut d'Express)

* MongoDB :

La base de données MongoDB est accessible sur mongodb://localhost:27017 dans les containers Docker.


## Contribution
Ce projet est un projet personnel que je réalise dans le but d'apprendre et d'améliorer mes compétences en développement web. Si vous souhaitez contribuer ou suggérer des améliorations, n'hésitez pas à ouvrir une pull request !