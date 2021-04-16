CREATE DEFINER=`root`@`localhost` PROCEDURE `grant_groupe_right`(p_groupe_nom VARCHAR(200), p_new_member_id INT, p_new_admin BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO utilisateur_groupe (groupe_nom, utilisateur_id, admin)
		VALUES (p_groupe_nom, p_new_member_id, p_new_admin);
    
    COMMIT;
END