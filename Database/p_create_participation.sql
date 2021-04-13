CREATE DEFINER=`root`@`localhost` PROCEDURE `create_participation`(p_groupe_nom VARCHAR(200), p_id INT, p_participation_titre VARCHAR(400), p_participation_preview TEXT, p_participation_article TEXT, p_importance TINYINT, p_public BOOLEAN)
BEGIN
	DECLARE is_public BOOLEAN;
	DECLARE as_right BOOLEAN;
    DECLARE comm_title VARCHAR(100);
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Vous n\'avez pas les droits pour créer une participation dans ce groupe.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;
    
		SELECT public
        INTO is_public
		FROM groupe
		WHERE nom = p_groupe_nom;
        
        IF is_public = 0
        THEN 
			BEGIN 
				SELECT COUNT(*)
				INTO as_right
				FROM utilisateur_groupe
				WHERE groupe_nom = p_groupe_nom AND utilisateur_id = p_id;

				IF as_right != 1
				THEN
					BEGIN 
						SIGNAL SQLSTATE VALUE '03000';
					END;
				END IF;
                
			END;
		END IF;

		INSERT INTO participation (groupe_nom, createur, titre, preview, article, date_creation, importance, public)
		VALUES (p_groupe_nom, p_id, p_participation_titre, p_participation_preview, p_participation_article, CURRENT_TIMESTAMP(), p_importance, p_public);
        		
		INSERT INTO utilisateur_participation (utilisateur_id, participation_id, admin)
		VALUES (p_id, LAST_INSERT_ID(), 1);
        
        SELECT CONCAT('commentaires_', LAST_INSERT_ID())
        INTO comm_title;
        
		SET @comm = CONCAT('
			CREATE TABLE ',comm_title,' (
				id INT UNSIGNED AUTO_INCREMENT NOT NULL,
				contenu TEXT,
				date_creation DATETIME NOT NULL,
				utilisateur_id INT UNSIGNED NOT NULL,
				PRIMARY KEY (id)
				);
			');

		PREPARE create_comm FROM @comm;
		EXECUTE create_comm;
		DEALLOCATE PREPARE create_comm;
        
        SET @comm = CONCAT('
			ALTER TABLE ',comm_title,' ADD CONSTRAINT t_',comm_title,'_t_utilisateur_fk
				FOREIGN KEY (utilisateur_id)
				REFERENCES utilisateur (id)
				ON DELETE NO ACTION
				ON UPDATE CASCADE;
			');

		PREPARE create_comm FROM @comm;
		EXECUTE create_comm;
		DEALLOCATE PREPARE create_comm;
    
    COMMIT;
END