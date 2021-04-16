CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_infos`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'importance', importance, 'publique', publique, 'createur', createur, 'date_creation', date_creation, 'groupe_nom', groupe_nom)
        FROM participation
        WHERE id = p_participation_id;
    
    COMMIT;
END