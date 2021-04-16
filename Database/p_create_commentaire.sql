CREATE DEFINER=`root`@`localhost` PROCEDURE `create_commentaire`(p_user_id INT, p_participation_id INT, p_contenu TEXT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO commentaire (participation_id, utilisateur_id, contenu, date_creation)
		VALUES (p_participation_id, p_user_id, p_contenu, CURRENT_TIMESTAMP());

    COMMIT;
END