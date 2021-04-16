CREATE DEFINER=`root`@`localhost` PROCEDURE `grant_participation_right`(p_participation_id INT, p_new_member_id INT, p_new_admin BOOLEAN)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO utilisateur_participation (participation_id, utilisateur_id, admin)
		VALUES (p_participation_id, p_new_member_id, p_new_admin);
    
    COMMIT;
END