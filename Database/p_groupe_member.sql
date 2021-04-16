CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_member`(p_groupe_nom VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur_id, 'admin', admin)
		FROM utilisateur_groupe
        WHERE groupe_nom = p_groupe_nom;
    
    COMMIT;
END