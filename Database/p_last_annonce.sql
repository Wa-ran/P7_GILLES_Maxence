CREATE DEFINER=`root`@`localhost` PROCEDURE `last_annonce`()
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
        WHERE groupe_nom = '3b265bff7bd75e95dc0d84a9d8d6274b565ab1'
        AND importance = (SELECT MAX(importance) FROM participation
							WHERE date_creation = (SELECT MAX(date_creation) FROM participation));

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'importance', importance, 'createur', createur)
		FROM participation
		WHERE id = last_annonce;
    
    COMMIT;
END