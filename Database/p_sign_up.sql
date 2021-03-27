CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(p_nom VARCHAR(256), p_prenom VARCHAR(256), p_email VARCHAR(256), p_password VARCHAR(60), p_departement VARCHAR(100))
BEGIN
	DECLARE check_email INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
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
			MESSAGE_TEXT = 'Une erreur est survenue, l\'inscription à échouée.';
	END;
    
    START TRANSACTION READ WRITE;

		SELECT COUNT(*)
		INTO check_email 
		FROM Utilisateur
		WHERE email = p_email;
		
		IF check_email > 0
		THEN BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		INSERT INTO Utilisateur (nom, prenom, email, password, departement_nom)
		VALUES
			(p_nom, p_prenom, p_email, p_password, p_departement);
        
	COMMIT;
END