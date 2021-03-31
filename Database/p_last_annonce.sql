CREATE DEFINER=`root`@`localhost` PROCEDURE `last_annonce`()
BEGIN
	DECLARE last_annonce INT;
	DECLARE com_number INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, les données n\'ont pas été récupérées.';
	END;
    
    START TRANSACTION READ ONLY;
    
		SELECT id
        INTO last_annonce
        FROM participation
        WHERE groupe_nom = 'Annonce Groupomania'
        AND importance = (SELECT MAX(importance) FROM participation
							WHERE date_creation = (SELECT MAX(date_creation) FROM participation));
		
        SELECT COUNT(*)
        INTO com_number
        FROM commentaire
        WHERE participation_id = last_annonce;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'importance', importance, 'createur', createur, 'com_number', com_number)
		FROM participation
		WHERE id = last_annonce;
    
    COMMIT;
END