CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_pass`(p_password VARCHAR(60), p_email VARCHAR(100))
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET password = p_password
		WHERE email = p_email;
		
    COMMIT;
END