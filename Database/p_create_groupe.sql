CREATE DEFINER=`root`@`localhost` PROCEDURE `create_groupe`(p_groupe_nom VARCHAR(200), p_groupe_description TEXT, p_id INT, p_public BOOLEAN)
BEGIN

	DECLARE EXIT HANDLER FOR 1062
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Un autre groupe possède ce nom.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION;

		INSERT INTO groupe (nom, description, public)
		VALUES (p_groupe_nom, p_groupe_description, p_public);
		
		INSERT INTO utilisateur_groupe (utilisateur_id, groupe_nom, admin)
		VALUES (p_id, p_groupe_nom, 1);
		
    COMMIT;
END