CREATE TABLE groupe (
                id INT AUTO_INCREMENT NOT NULL,
                nom VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
);

CREATE TABLE participation (
                id INT NOT NULL,
                titre VARCHAR(200) NOT NULL,
                groupe_id INT NOT NULL,
                PRIMARY KEY (id)
);

CREATE TABLE departement (
                nom VARCHAR(100) NOT NULL,
                PRIMARY KEY (nom)
);

CREATE TABLE utilisateur (
                id INT AUTO_INCREMENT NOT NULL,
                nom VARCHAR(256) NOT NULL,
                mail VARCHAR(256) NOT NULL,
                password BINARY(60) NOT NULL,
                departement_nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(256) NOT NULL,
                PRIMARY KEY (id)
);

CREATE TABLE utilisateur_participant (
                utilisateur_id INT NOT NULL,
                participation_id INT NOT NULL,
                participant BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_id, participation_id)
);

CREATE TABLE commentaire (
                id INT NOT NULL,
                contenu TEXT NOT NULL,
                participation_id INT NOT NULL,
                utilisateur_id INT NOT NULL,
                PRIMARY KEY (id)
);

CREATE TABLE utilisateur_groupe (
                utilisateur_id INT NOT NULL,
                groupe_id INT NOT NULL,
                membre BOOLEAN NOT NULL,
                admin BOOLEAN NOT NULL,
                PRIMARY KEY (utilisateur_id, groupe_id)
);

ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_groupe_membre_fk
FOREIGN KEY (groupe_id)
REFERENCES groupe (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE participation ADD CONSTRAINT t_groupe_t_participation_fk
FOREIGN KEY (groupe_id)
REFERENCES groupe (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE commentaire ADD CONSTRAINT t_participation_t_commentaire_fk
FOREIGN KEY (participation_id)
REFERENCES participation (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_participant ADD CONSTRAINT t_participation_partcipant_fk
FOREIGN KEY (participation_id)
REFERENCES participation (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur ADD CONSTRAINT t_departement_t_utilisateur_fk
FOREIGN KEY (departement_nom)
REFERENCES departement (nom)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_groupe ADD CONSTRAINT t_utilisateur_membre_fk
FOREIGN KEY (utilisateur_id)
REFERENCES utilisateur (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE commentaire ADD CONSTRAINT t_utilisateur_t_commentaire_fk
FOREIGN KEY (utilisateur_id)
REFERENCES utilisateur (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE utilisateur_participant ADD CONSTRAINT t_utilisateur_partcipant_fk
FOREIGN KEY (utilisateur_id)
REFERENCES utilisateur (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;