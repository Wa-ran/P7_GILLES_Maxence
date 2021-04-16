CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_content`(p_groupe_nom VARCHAR(200))
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'date_creation', date_creation, 'importance', importance, 'publique', publique, 'prive', prive, 'createur', createur)
		FROM participation
		WHERE groupe_nom = p_groupe_nom;
    
    COMMIT;
END