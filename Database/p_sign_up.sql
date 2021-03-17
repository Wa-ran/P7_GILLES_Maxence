CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(p_nom varchar(256), p_prenom varchar(256), p_mail varchar(256), p_password binary(60), p_departement varchar(100))
sp: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
        BEGIN
			SIGNAL SQLSTATE VALUE '03000'
            SET	MYSQL_ERRNO = 9999,
                MESSAGE_TEXT = 'Une erreur est survenue, l\'enregistrement à échoué.';
        END;

	IF (SELECT COUNT(*) FROM utilisateur WHERE mail = p_mail) > 0
    THEN SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Ce mail est déjà utilisé.';
		LEAVE sp;
	END IF;

	INSERT INTO Utilisateur (id, nom, prenom, mail, password, departement_nom)
	VALUES
		(NULL, p_nom, p_prenom, p_mail, p_password, p_departement);
END