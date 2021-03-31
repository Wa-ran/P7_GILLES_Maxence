CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_content`(p_groupe VARCHAR(100))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, les données n\'ont pas été récupérées.';
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'date_creation', date_creation, 'importance', importance, 'createur', createur, 'com_number', com_number)
		FROM participation
		WHERE groupe_nom = p_groupe;
    
    COMMIT;
END