CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_member`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'admin', utilisateur_participation.admin)
		FROM utilisateur_participation
        JOIN utilisateur
        ON utilisateur.id = utilisateur_participation.utilisateur_id
        WHERE utilisateur_participation.participation_id = p_participation_id;
    
    COMMIT;
END