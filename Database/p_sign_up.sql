CREATE PROCEDURE `sign_up` (p_nom varchar(256), p_prenom varchar(256), p_mail varchar(256), p_password binary(60), p_departement varchar(100))
BEGIN
	INSERT INTO Utilisateur (id, nom, prenom, mail, password, departement_nom)
	VALUES 
		(NULL, p_nom, p_prenom, p_mail, p_password, p_departement);
END