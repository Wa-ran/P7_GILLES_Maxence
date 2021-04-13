CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_content`(p_participation_id INT)
BEGIN
	DECLARE check_participation INT;
    DECLARE comm_title VARCHAR(100);
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cette participation n\'existe pas';
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
        
        SELECT CONCAT('commentaires_', p_participation_id)
		INTO comm_title;

		SELECT JSON_OBJECT('user', utilisateur_id, 'contenu', contenu, 'date', date_creation)
		FROM comm_title;
    
    COMMIT;
END