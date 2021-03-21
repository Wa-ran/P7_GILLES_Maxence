CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_pass`(p_password VARCHAR(60), p_email VARCHAR(256))
BEGIN
#Le mail et le mot de passe doivent être vérifiés avant.

    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
			MESSAGE_TEXT = 'Une erreur est survenue, l\' enregistrement à échoué.';
	END;

	UPDATE utilisateur
	SET password = p_password
	WHERE email = p_email;

END