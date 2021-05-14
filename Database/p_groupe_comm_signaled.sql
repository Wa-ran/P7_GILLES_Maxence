CREATE DEFINER=`root`@`localhost` PROCEDURE `comm_signaled_in_groupe`(p_groupe_nom VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', commentaire.id, 'userId', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'contenu', commentaire.contenu, 'date', commentaire.date_creation, 'image', commentaire.is_img)
		FROM commentaire
        INNER JOIN utilisateur
        ON commentaire.utilisateur_id = utilisateur.id
        INNER JOIN participation
        ON participation.id = commentaire.participation_id
        WHERE participation.groupe_nom = p_groupe_nom;
    
    COMMIT;
END