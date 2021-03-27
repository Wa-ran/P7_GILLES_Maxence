CREATE DEFINER=`root`@`localhost` PROCEDURE `create_participation`(p_groupe_nom VARCHAR(100), p_user_email VARCHAR(256), p_participation_titre VARCHAR(200), p_participation_preview TEXT, p_importance TINYINT)
BEGIN
	DECLARE as_right BOOLEAN;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Vous n\'avez pas les droits pour participer dans ce groupe.';
	END;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Une erreur est survenue, la création à échouée.';
	END;
    
    START TRANSACTION;
        
		SELECT (membre + COUNT(*))
        INTO as_right
		FROM utilisateur_groupe
		WHERE groupe_nom = p_groupe_nom AND utilisateur_email = p_user_email;

        IF as_right != 2
		THEN BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		INSERT INTO participation (titre, preview, groupe_nom, createur, date_creation, importance)
		VALUES (p_participation_titre, p_participation_preview, p_groupe_nom, p_user_email, CURRENT_TIMESTAMP(), p_importance);
    
    COMMIT;
END