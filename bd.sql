CREATE TABLE `sinistrevoldetails` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`numero_police` VARCHAR(255),
    `Localisation` VARCHAR(255),
    `type_vol` VARCHAR(255),
    `nom_temoin` VARCHAR(255),
    `adresse_temoin` VARCHAR(255),
    `telephone_temoin` VARCHAR(255),
    `photo_vol` VARCHAR(255),
    `nom` VARCHAR(255),
    `prenom` VARCHAR(255),
    `numero` VARCHAR(255),
    `email` VARCHAR(255),
    `domicile` VARCHAR(255),
    `marque_vehicule` VARCHAR(255),
    `genre_vehicule` VARCHAR(255),
    `categorie_permis` VARCHAR(255),
    `Model_vehicule` VARCHAR(255),
    `ville` VARCHAR(255),
    `energie` VARCHAR(255),
    `immatriculation` VARCHAR(255),
    `date_debut_cont` DATE,
    `date_fin_cont` DATE,
    `souscripteur` VARCHAR(255),
    `type_Garantie` VARCHAR(255),
    `Assurance` VARCHAR(255)
    `niveau`VARCHAR(255)

	 )ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `sinistrebdgdetails` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `numero_police` VARCHAR(255),
    `Localisation` VARCHAR(255),
    `type_vol` VARCHAR(255),
    `nom_temoin` VARCHAR(255),
    `adresse_temoin` VARCHAR(255),
    `telephone_temoin` VARCHAR(255),
    `photo_vol` VARCHAR(255),
    `nom` VARCHAR(255),
    `prenom` VARCHAR(255),
    `numero` VARCHAR(255),
    `email` VARCHAR(255),
    `domicile` VARCHAR(255),
    `marque_vehicule` VARCHAR(255),
    `genre_vehicule` VARCHAR(255),
    `categorie_permis` VARCHAR(255),
    `Model_vehicule` VARCHAR(255),
    `ville` VARCHAR(255),
    `energie` VARCHAR(255),
    `immatriculation` VARCHAR(255),
    `date_debut_cont` DATE,
    `date_fin_cont` DATE,
    `souscripteur` VARCHAR(255),
    `type_Garantie` VARCHAR(255),
    `Assurance` VARCHAR(255),
    `niveau`VARCHAR(255)

     )ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `sinistreIdetails` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `numero_police` VARCHAR(255),
    `Localisation` VARCHAR(255),
    `type_vol` VARCHAR(255),
    `nom_temoin` VARCHAR(255),
    `adresse_temoin` VARCHAR(255),
    `telephone_temoin` VARCHAR(255),
    `photo_vol` VARCHAR(255),
    `nom` VARCHAR(255),
    `prenom` VARCHAR(255),
    `numero` VARCHAR(255),
    `email` VARCHAR(255),
    `domicile` VARCHAR(255),
    `marque_vehicule` VARCHAR(255),
    `genre_vehicule` VARCHAR(255),
    `categorie_permis` VARCHAR(255),
    `Model_vehicule` VARCHAR(255),
    `ville` VARCHAR(255),
    `energie` VARCHAR(255),
    `immatriculation` VARCHAR(255),
    `date_debut_cont` DATE,
    `date_fin_cont` DATE,
    `souscripteur` VARCHAR(255),
    `type_Garantie` VARCHAR(255),
    `Assurance` VARCHAR(255),
    `niveau`VARCHAR(255)

     )ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `sinistre` (

       `id` INT AUTO_INCREMENT PRIMARY KEY,
		`nom`  VARCHAR(255),
        `prenom` VARCHAR(255),
        `num_police` VARCHAR(255),
        `type_sinistre` VARCHAR(255),
        `cat_sinistre` VARCHAR(255),
        `date_sinistre` VARCHAR(255),
        `permis` VARCHAR(255),
        `carte_grise` VARCHAR(255),
        `visite_tech` VARCHAR(255),
        `element_prod` VARCHAR(255),
        `attestation` VARCHAR(255),
        `sinistre` VARCHAR(255)	

	 )ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `declaration` (

       `id` INT AUTO_INCREMENT PRIMARY KEY,
		`nom`  VARCHAR(255),
        `prenom` VARCHAR(255),
        `num_police` VARCHAR(255),
        `type_sinistre` VARCHAR(255),
        `cat_sinistre` VARCHAR(255),
        `date_sinistre` VARCHAR(255),
        `permis` VARCHAR(255),
        `carte_grise` VARCHAR(255),
        `visite_tech` VARCHAR(255),
        `element_prod` VARCHAR(255),
        `attestation` VARCHAR(255),
        `sinistre` VARCHAR(255)	

	 )ENGINE=InnoDB DEFAULT CHARSET=latin1;