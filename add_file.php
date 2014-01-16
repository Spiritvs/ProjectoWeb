<?php
class response {
	public $status;
	public $data;
	public function __construct() {
		$this -> status = false;
		$this -> data = "Classe não Instanciada";
	}

}
header('Content-type: application/json');
$resp = new response();

// Check if a file has been uploaded
if (isset($_FILES['myfile'])) {
	// Make sure the file was sent without errors
	if ($_FILES['myfile']['error'] == 0) {
		// Connect to the database
		$dbLink = new mysqli('127.0.0.1', 'root', 'root', 'mash');
		if (mysqli_connect_errno()) {
			die("MySQL connection failed: " . mysqli_connect_error());
		}
		$destination = "uploads/";
		// Gather all required data
		$name = $dbLink -> real_escape_string($_FILES['myfile']['name']);
		$mime = $dbLink -> real_escape_string($_FILES['myfile']['type']);
		//$data = $dbLink->real_escape_string(file_get_contents($_FILES  ['myfile']['tmp_name']));
		$size = intval($_FILES['myfile']['size']);

		// Create the SQL query
		$query = "
                INSERT INTO `file` (
                    `name`, `mime`, `size`, `created`
                )
                VALUES (
                    '{$name}', '{$mime}', {$size}, NOW()
                )";

		// Execute the query
		$result = $dbLink -> query($query);
		
		// Check if it was successfull
		if ($result) {
			move_uploaded_file($_FILES["myfile"]["tmp_name"], $destination . $name);
			$id = $dbLink -> insert_id;
			$resp -> status = true;
			$resp -> data = $id;
		} 
		else {
			$resp -> status = false;
			$resp -> data = 'Error! Failed to insert the file' . '<pre>{$dbLink->error}</pre>';
		}
	} else {
		$resp -> status = false;
		$resp -> data = 'An error accured while the file was being uploaded. ' . 'Error code: ' . intval($_FILES['myfile']['error']);
	}

	// Close the mysql connection
	$dbLink -> close();
} else {
	$resp -> status = false;
	$resp -> data = 'Error! A file was not sent!';
}
echo json_encode($resp);
?>
