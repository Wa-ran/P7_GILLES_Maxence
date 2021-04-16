CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(p_nom VARCHAR(100), p_prenom VARCHAR(100), p_email VARCHAR(100), p_password VARCHAR(60), p_departement VARCHAR(50))
BEGIN

	DECLARE EXIT HANDLER FOR 1062
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email est déjà utilisé.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO Utilisateur (nom, prenom, email, password, departement_nom)
		VALUES
			(p_nom, p_prenom, p_email, p_password, p_departement);
        
	COMMIT;
END