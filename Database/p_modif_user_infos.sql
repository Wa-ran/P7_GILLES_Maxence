CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_infos`(p_nom VARCHAR(100), p_prenom VARCHAR(100), p_email VARCHAR(100), p_departement VARCHAR(50))
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
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