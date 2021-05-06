CREATE DEFINER=`root`@`localhost` PROCEDURE `create_commentaire`(p_user_id INT, p_participation_id INT, p_contenu TEXT, p_is_img BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO commentaire (participation_id, utilisateur_id, contenu, is_img, date_creation)
		VALUES (p_participation_id, p_user_id, p_contenu, p_is_img, CURRENT_TIMESTAMP());
        
        SELECT LAST_INSERT_ID();

    COMMIT;
END