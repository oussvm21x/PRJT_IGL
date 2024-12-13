CREATE DATABASE `healthcare_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `administratif` (
  `id_administratif` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_administratif`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `antecedent` (
  `id_antecedent` varchar(50) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` text,
  `date_declaration` date DEFAULT NULL,
  `dossier_patient_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_antecedent`),
  KEY `dossier_patient_id` (`dossier_patient_id`),
  CONSTRAINT `antecedent_ibfk_1` FOREIGN KEY (`dossier_patient_id`) REFERENCES `dossierpatient` (`id_dossier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `certificatmedical` (
  `id_certificat` varchar(50) NOT NULL,
  `date_emission` date DEFAULT NULL,
  `motif` varchar(255) DEFAULT NULL,
  `duree_arret` varchar(50) DEFAULT NULL,
  `dossier_patient_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_certificat`),
  KEY `dossier_patient_id` (`dossier_patient_id`),
  CONSTRAINT `certificatmedical_ibfk_1` FOREIGN KEY (`dossier_patient_id`) REFERENCES `dossierpatient` (`id_dossier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `compterendu` (
  `id_compte_rendu` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  `contenu` text,
  `auteur_id` varchar(50) DEFAULT NULL,
  `examen_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_compte_rendu`),
  KEY `examen_id` (`examen_id`),
  CONSTRAINT `compterendu_ibfk_1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id_examen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `consultation` (
  `id_consultation` varchar(50) NOT NULL,
  `motif` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `resume` text,
  `dossier_patient_id` varchar(50) DEFAULT NULL,
  `medecin_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_consultation`),
  KEY `dossier_patient_id` (`dossier_patient_id`),
  KEY `medecin_id` (`medecin_id`),
  CONSTRAINT `consultation_ibfk_1` FOREIGN KEY (`dossier_patient_id`) REFERENCES `dossierpatient` (`id_dossier`),
  CONSTRAINT `consultation_ibfk_2` FOREIGN KEY (`medecin_id`) REFERENCES `medecin` (`id_medecin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `dossierpatient` (
  `id_dossier` varchar(50) NOT NULL,
  `date_creation` date DEFAULT NULL,
  `patient_num_securite_sociale` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_dossier`),
  KEY `patient_num_securite_sociale` (`patient_num_securite_sociale`),
  CONSTRAINT `dossierpatient_ibfk_1` FOREIGN KEY (`patient_num_securite_sociale`) REFERENCES `patient` (`num_securite_sociale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `examen` (
  `id_examen` varchar(50) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `resultats` text,
  `consultation_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_examen`),
  KEY `consultation_id` (`consultation_id`),
  CONSTRAINT `examen_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultation` (`id_consultation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `examenbiologique` (
  `id_examen_biologique` varchar(50) NOT NULL,
  `parametres` text,
  `valeurs` text,
  `graphique_tendance` text,
  `examen_id` varchar(50) DEFAULT NULL,
  `laborantin_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_examen_biologique`),
  KEY `examen_id` (`examen_id`),
  KEY `laborantin_id` (`laborantin_id`),
  CONSTRAINT `examenbiologique_ibfk_1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id_examen`),
  CONSTRAINT `examenbiologique_ibfk_2` FOREIGN KEY (`laborantin_id`) REFERENCES `laborantin` (`id_laborantin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `examenradiologique` (
  `id_examen_radiologique` varchar(50) NOT NULL,
  `type_image` varchar(50) DEFAULT NULL,
  `fichier_image` text,
  `compte_rendu` text,
  `examen_id` varchar(50) DEFAULT NULL,
  `radiologue_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_examen_radiologique`),
  KEY `examen_id` (`examen_id`),
  KEY `radiologue_id` (`radiologue_id`),
  CONSTRAINT `examenradiologique_ibfk_1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id_examen`),
  CONSTRAINT `examenradiologique_ibfk_2` FOREIGN KEY (`radiologue_id`) REFERENCES `radiologue` (`id_radiologue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `infirmier` (
  `id_infirmier` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_infirmier`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `laborantin` (
  `id_laborantin` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_laborantin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `medecin` (
  `id_medecin` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_medecin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `medicament` (
  `id_medicament` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `dosage` varchar(50) DEFAULT NULL,
  `voie_administration` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_medicament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `ordonnance` (
  `id_ordonnance` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  `duree_traitement` varchar(50) DEFAULT NULL,
  `consultation_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_ordonnance`),
  KEY `consultation_id` (`consultation_id`),
  CONSTRAINT `ordonnance_ibfk_1` FOREIGN KEY (`consultation_id`) REFERENCES `consultation` (`id_consultation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `ordonnancemedicament` (
  `ordonnance_id` varchar(50) NOT NULL,
  `medicament_id` varchar(50) NOT NULL,
  PRIMARY KEY (`ordonnance_id`,`medicament_id`),
  KEY `medicament_id` (`medicament_id`),
  CONSTRAINT `ordonnancemedicament_ibfk_1` FOREIGN KEY (`ordonnance_id`) REFERENCES `ordonnance` (`id_ordonnance`),
  CONSTRAINT `ordonnancemedicament_ibfk_2` FOREIGN KEY (`medicament_id`) REFERENCES `medicament` (`id_medicament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `patient` (
  `num_securite_sociale` varchar(50) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `date_naissance` date NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `medecin_traitant` varchar(100) DEFAULT NULL,
  `personne_contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`num_securite_sociale`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `pharmacien` (
  `id_pharmacien` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pharmacien`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `radiologue` (
  `id_radiologue` varchar(50) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_radiologue`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `soin` (
  `id_soin` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  `description` text,
  `infirmier_id` varchar(50) DEFAULT NULL,
  `ordonnance_id` varchar(50) DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`id_soin`),
  KEY `infirmier_id` (`infirmier_id`),
  KEY `ordonnance_id` (`ordonnance_id`),
  CONSTRAINT `soin_ibfk_1` FOREIGN KEY (`infirmier_id`) REFERENCES `infirmier` (`id_infirmier`),
  CONSTRAINT `soin_ibfk_2` FOREIGN KEY (`ordonnance_id`) REFERENCES `ordonnance` (`id_ordonnance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
