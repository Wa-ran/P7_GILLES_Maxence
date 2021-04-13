CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_infos`(p_nom VARCHAR(100), p_prenom VARCHAR(100), p_departement VARCHAR(50), p_id INT)
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
		WHERE id = p_id;
		
		SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'departement', departement_nom)
		FROM utilisateur
		WHERE id = p_id;
    
    COMMIT;
END