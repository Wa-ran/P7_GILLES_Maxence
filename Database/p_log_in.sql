CREATE DEFINER=`root`@`localhost` PROCEDURE `log_in`(p_email VARCHAR(100))
BEGIN
	DECLARE check_email INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email n\'est pas enregistré. Veuillez utiliser le mail avec lequel vous vous êtes inscrit.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT COUNT(*)
		INTO check_email 
		FROM Utilisateur
		WHERE email = p_email;
		
		IF check_email = 0
		THEN BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'email', email, 'password', password, 'departement', departement_nom)
		FROM utilisateur
		WHERE email = p_email;
    
    COMMIT;
END