CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_member`(p_participation_id INT)
BEGIN
	DECLARE check_participation INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Ce groupe n\'existe pas';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT COUNT(*)
		INTO check_participation
		FROM participation
		WHERE id = p_participation_id;
		
		IF check_participation = 0
		THEN
			BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		SELECT JSON_OBJECT('user', utilisateur_id, 'admin', admin)
		FROM utilisateur_participation
        WHERE participation_id = p_participation_id;
    
    COMMIT;
END