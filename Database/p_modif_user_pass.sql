CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_pass`(p_password VARCHAR(60), p_email VARCHAR(256))
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, la modification à échouée.';
	END;
    
    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET password = p_password
		WHERE email = p_email;
		
    COMMIT;
END