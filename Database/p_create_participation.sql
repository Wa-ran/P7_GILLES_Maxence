CREATE DEFINER=`root`@`localhost` PROCEDURE `create_participation`(p_groupe_nom VARCHAR(200), p_id INT, p_participation_titre VARCHAR(400), p_participation_preview TEXT, p_participation_article TEXT, p_importance TINYINT, p_publique BOOLEAN, p_prive BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO participation (groupe_nom, createur, titre, preview, article, date_creation, importance, publique, prive)
		VALUES (p_groupe_nom, p_id, p_participation_titre, p_participation_preview, p_participation_article, CURRENT_TIMESTAMP(), p_importance, p_publique, p_prive);
        		
		INSERT INTO utilisateur_participation (utilisateur_id, participation_id, admin)
		VALUES (p_id, LAST_INSERT_ID(), 1);
    
    COMMIT;
END