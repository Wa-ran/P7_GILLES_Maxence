CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_pass`(p_password VARCHAR(60), p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET password = p_password
		WHERE id = p_id;
		
    COMMIT;
END