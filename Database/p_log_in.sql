CREATE DEFINER=`root`@`localhost` PROCEDURE `log_in`(p_email VARCHAR(256))
sp: BEGIN
	DECLARE check_email INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email n\'est pas enregistré. Veuillez utiliser le mail avec lequel vous vous êtes inscrit.';
	END;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, la connection à échouée.';
	END;

	SELECT COUNT(*)
    INTO check_email 
    FROM Utilisateur
    WHERE email = p_email;
    
	IF check_email = 0
    THEN BEGIN 
			SIGNAL SQLSTATE VALUE '03000';
		END;
		LEAVE sp;
	END IF;

	SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'email', email, 'password', password, 'departement', departement_nom)
    FROM utilisateur
	WHERE email = p_email;
END