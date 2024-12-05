<?php
	// Set error reporting to display all errors
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	// Set CSP here
	header("Content-Security-Policy: default-src 'self';");
	
	$itemLimit = 10;
	
	// https://stackoverflow.com/questions/768431/how-do-i-make-a-redirect-in-php
	function redirect($url, $permanent = false) {
		header('Location: ' . $url, true, $permanent ? 301 : 302);
		exit();
	}
	// Create a new MySQLi object to connect to the database
	$db = new mysqli('localhost', 'root', '', 'limbs');
	// Check for connection errors
	if ($db->connect_errno) {
		// If there's an error, display the error message and exit
		echo "Failed to connect to MySQL: " . $db->connect_error;
		exit();
	}
?>