CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_member`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur_id, 'admin', admin)
		FROM utilisateur_participation
        WHERE participation_id = p_participation_id;
    
    COMMIT;
END