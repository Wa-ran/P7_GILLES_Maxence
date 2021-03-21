CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_email`(p_email VARCHAR(256), p_email_origin VARCHAR(256))
BEGIN
#Le mail et le mot de passe doivent être vérifiés avant.
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, l\' enregistrement à échoué.';
	END;

	UPDATE utilisateur
	SET email = p_email
	WHERE email = p_email_origin;
    
    SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'email', email, 'departement', departement_nom)
    FROM utilisateur
	WHERE email = p_email;
END