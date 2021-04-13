CREATE DEFINER=`root`@`localhost` PROCEDURE `grant_participation_right`(p_participation_id INT, p_admin_id INT, p_new_member_id INT, p_new_admin BOOLEAN)
BEGIN
	DECLARE as_right BOOLEAN;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Vous n\'êtes pas administrateur.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;
        
		SELECT admin
        INTO as_right
		FROM utilisateur_participation
		WHERE participation_id = p_participation_id AND utilisateur_id = p_admin_id;

        IF as_right != 1
		THEN
			BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		INSERT INTO utilisateur_participation (participation_id, utilisateur_id, admin)
		VALUES (p_participation_id, p_new_member_id, p_new_admin);
    
    COMMIT;
END