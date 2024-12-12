# Localisation des restaurants :

Ce projet a pour but de mettre en place une application web et mobile  permettant de localiser les restaurants selon la ville , la zone , la serie et la specialite  . Il utilise Spring boot    cote back end , reactjs cote front end  (web) et android pour la partie mobile  et  la gestion de la base de données avec le  SGBD Mysql.

# Fonctionnalités partie web : (administrateur)
<br>
1- Gestion des villes <br>
2- Gestion des zones <br>
3- Gestion des spécialités <br>
4- Gestion des séries <br>
5- Affichage de la liste des restaurants <br>
6- Validation des restaurants (Ajouter champ etat dans pharmacie : etat = 0 : en attente de validation ; etat = 1 : validée ; etat = 2 : refusé) <br>
7- Statistiques ( Affichage du nombre des restaurants par ville et zone) <br>

# Fonctionnalités partie mobile :  (proprietaire)
<br>
1- Inscription <br>
2- Création de restaurant <br>
3- Visualisation de  l’état du restaurant <br>
4- L’Ajout des photos de restaurant
<br>

# Fonctionnalités partie mobile : (internaute)
<br>
1- La recherche d’ un restaurant par ville, zone, spécialité ou série <br>
2- Affichage des restaurants avec possibilité de parcourir les photos <br>
3- Visualisation des restaurants dans une Map <br>
4- Visualisation la position de l’utilisateur dans la map et mentionner les restaurants les plus proche <br>
5- Affichage de l’itinéraire vers un restaurant<br>

# Mise en place du projet

Pour mettre en place ce projet, vous aurez besoin des éléments suivants :<br>
1.	Un serveur d'application Java (comme Tomcat)<br>
2.	Un SGBD (comme MySQL)<br>
3.	Un éditeur de code (comme Eclipse)<br>
4.	Le driver JDBC de votre SGBD (à télécharger sur le site officiel de votre SGBD)<br>
5.	Le framework Hibernate (à télécharger sur le site officiel ou via Maven)<br>

# Déploiement

Pour déployer ce projet sur votre serveur d'application, suivez les étapes suivantes :<br>
1.	Téléchargez le projet (vous trouvez au dessous les liens de la partie web et mobile) sur votre ordinateur<br>
2.	Ouvrez-le dans votre éditeur de code<br>
3.	Configurez la connexion à votre SGBD dans le fichier application.properties pour le back end<br>
4.	Configurer votre adresse ip sur les fichiers pour assurer l’échange des données<br>
5.	Exécuter le projet<br>

# Architecture du projet<br>
<img src="https://user-images.githubusercontent.com/101591557/211172347-79f714be-e619-4090-ac21-0b312c986e06.png" width="400" hieght="500"/>
<br>#Lien github vers les parties mobile et le backend

mobile : https://github.com/Nidabdellah-Abdelhafid/restaurant_mobil.git
<br>backend : https://github.com/Nidabdellah-Abdelhafid/restaurant_backend.git

# Official Documentation

La documentation relative au cadre se trouve sur le site Web du :
<br>https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-help
<br>https://developer.android.com/docs
<br>https://devdocs.io/react/

# Auteur
Ce projet a été réalisé par :

NidAbdellah Abdelhafid<br>
Mouket Fatima zahra <br>
Madili Sanaa
