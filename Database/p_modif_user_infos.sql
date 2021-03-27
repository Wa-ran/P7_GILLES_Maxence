CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_infos`(p_nom VARCHAR(256), p_prenom VARCHAR(256), p_email VARCHAR(256), p_departement VARCHAR(100))
BEGIN
#Le mail et le mot de passe doivent être vérifiés avant.
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, l\' enregistrement à échoué.';
	END;
    
    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET nom = p_nom,
			prenom = p_prenom,
			departement_nom = p_departement
		WHERE email = p_email;
		
		SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'email', email, 'departement', departement_nom)
		FROM utilisateur
		WHERE email = p_email;
    
    COMMIT;
END