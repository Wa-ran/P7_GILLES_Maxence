CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_comment`(p_participation_id INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'user', utilisateur_id, 'contenu', contenu, 'date', date_creation)
		FROM commentaire
        WHERE participation_id = p_participation_id;
    
    COMMIT;
END