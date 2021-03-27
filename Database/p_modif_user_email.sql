CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_email`(p_email VARCHAR(256), p_email_origin VARCHAR(256))
BEGIN
    
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email est déjà utilisé.';
	END;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, la modification à échouée.';
	END;
    
    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET email = p_email
		WHERE email = p_email_origin;
		
		SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'email', email, 'departement', departement_nom)
		FROM utilisateur
		WHERE email = p_email;
    
    COMMIT;
END