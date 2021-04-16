CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_comment`(p_participation_id INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', commentaire.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'contenu', commentaire.contenu, 'date', commentaire.date_creation)
		FROM commentaire
        INNER JOIN utilisateur
        ON commentaire.utilisateur_id = utilisateur.id
        WHERE commentaire.participation_id = p_participation_id;
    
    COMMIT;
END