CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_content`(p_participation_id INT, p_user_id INT)
BEGIN
	DECLARE is_private INT;
	DECLARE as_right BOOLEAN;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cette participation est privée.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT prive
        INTO is_private
		FROM participation
		WHERE id = p_participation_id;
        
		IF is_private = 1
        THEN
			BEGIN 
				SELECT COUNT(*)
				INTO as_right
				FROM utilisateur_participation
				WHERE participation_id = p_participation_id AND utilisateur_id = p_user_id;

				IF as_right != 1
				THEN
					BEGIN 
						SIGNAL SQLSTATE VALUE '03000';
					END;
				END IF;
        
			END;
		END IF;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'importance', importance, 'publique', publique, 'createur', createur, 'date_creation', date_creation, 'groupe_nom', groupe_nom)
        FROM participation
        WHERE id = p_participation_id;
    
    COMMIT;
END