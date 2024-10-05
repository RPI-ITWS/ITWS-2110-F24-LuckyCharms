<?php
	// Set error reporting to display all errors
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	// Create a new MySQLi object to connect to the database
	$db = new mysqli('localhost', 'root', '', 'limbs');
	// Check for connection errors
	if ($db->connect_errno) {
		// If there's an error, display the error message and exit
		echo "Failed to connect to MySQL: " . $db->connect_error;
		exit();
	}
?>