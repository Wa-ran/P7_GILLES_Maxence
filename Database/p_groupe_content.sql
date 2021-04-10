CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_content`(p_groupe VARCHAR(200))
BEGIN
	DECLARE check_groupe INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Ce groupe n\'existe pas';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT COUNT(*)
		INTO check_groupe
		FROM groupe
		WHERE nom = p_groupe;
		
		IF check_groupe = 0
		THEN
			BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'date_creation', date_creation, 'importance', importance, 'createur', createur)
		FROM participation
		WHERE groupe_nom = p_groupe;
    
    COMMIT;
END