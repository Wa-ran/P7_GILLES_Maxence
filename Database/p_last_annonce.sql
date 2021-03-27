CREATE DEFINER=`root`@`localhost` PROCEDURE `last_annonce`()
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, les données n\'ont pas été récupérées.';
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'createur', createur)
		FROM participation
		WHERE importance = (SELECT MAX(importance) FROM participation)
        AND date_creation = (SELECT MAX(date_creation) FROM participation);
    
    COMMIT;
END