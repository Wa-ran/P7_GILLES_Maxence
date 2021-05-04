CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_infos`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', participation.id, 'titre', participation.titre, 'preview', participation.preview, 'article', participation.article, 'importance', participation.importance, 'publique', participation.publique, 'createurId', participation.createur, 'createurNom', utilisateur.nom, 'createurPrenom', utilisateur.prenom, 'date_creation', participation.date_creation, 'groupe_nom', participation.groupe_nom)
        FROM participation
        JOIN utilisateur
        ON participation.createur = utilisateur.id
        WHERE participation.id = p_participation_id;
    
    COMMIT;
END