CREATE DEFINER=`root`@`localhost` PROCEDURE `last_articles`()
BEGIN
	DECLARE last_annonce INT;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;
    
		SELECT id
        INTO last_annonce
        FROM participation
        WHERE date_creation = (SELECT MAX(date_creation));

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'importance', importance, 'createur', createur)
		FROM participation
		WHERE id = last_annonce
        LIMIT 5;
    
    COMMIT;
END