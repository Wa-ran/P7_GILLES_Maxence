CREATE DEFINER=`root`@`localhost` PROCEDURE `create_groupe`(p_groupe_nom VARCHAR(100), p_groupe_description TEXT, p_user_email VARCHAR(256))
BEGIN

	DECLARE EXIT HANDLER FOR 1452
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Aucun utilisateur avec ce mail n\'est enregistré !';
	END;

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
		SIGNAL SQLSTATE VALUE '03999'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Une erreur est survenue, le groupe n\'a pas pu être créé.';
	END;
    
    START TRANSACTION;

		INSERT INTO groupe (nom, description)
		VALUES (p_groupe_nom, p_groupe_description);
		
		INSERT INTO utilisateur_groupe (utilisateur_email, groupe_nom, membre, admin)
		VALUES (p_user_email, p_groupe_nom, 1, 1);
		
    COMMIT;
END