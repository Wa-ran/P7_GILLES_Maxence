CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_member`(p_groupe_nom VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'admin', utilisateur_groupe.admin)
		FROM utilisateur_groupe
        JOIN utilisateur
        ON utilisateur.id = utilisateur_groupe.utilisateur_id
        WHERE utilisateur_groupe.groupe_nom = p_groupe_nom;
    
    COMMIT;
END