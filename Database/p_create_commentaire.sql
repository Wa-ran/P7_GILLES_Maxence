CREATE DEFINER=`root`@`localhost` PROCEDURE `create_commentaire`(p_user_id INT, p_participation_id INT, p_contenu TEXT)
BEGIN
	DECLARE is_public BOOLEAN;
	DECLARE as_right BOOLEAN;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Vous ne pouvez pas participer.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;
    
		SELECT publique
        INTO is_public
		FROM participation
		WHERE id = p_participation_id;
        
        IF is_public = 0
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

		INSERT INTO commentaire (participation_id, utilisateur_id, contenu, date_creation)
		VALUES (p_participation_id, p_user_id, p_contenu, CURRENT_TIMESTAMP());

    COMMIT;
END