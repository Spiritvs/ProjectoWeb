<?php
    class response {
    	public $status;
		public $data;
		
		public function __construct() {
			$this->status = false;
			$this->data = "classe nao instanciada";
		}
    }
	
	header('Content-type: application/json');
	$resp = new response();
	
    // Check if a file has been uploaded
    if(isset($_FILES['myfile'])) {
        // Make sure the file was sent without errors
        if($_FILES['myfile']['error'] == 0) {
            // Connect to the database
            $dbLink = new mysqli('127.0.0.1', 'root', 'root', 'mash');
            if(mysqli_connect_errno()) {
                die("MySQL connection failed: ". mysqli_connect_error());
            }
			$destination = "uploads/";
            // Gather all required data
            $name = $dbLink->real_escape_string($_FILES['myfile']['name']);
            $mime = $dbLink->real_escape_string($_FILES['myfile']['type']);
            $data = $dbLink->real_escape_string(file_get_contents($_FILES  ['myfile']['tmp_name']));
            $size = intval($_FILES['myfile']['size']);
     
            // Create the SQL query
            $query = "
                INSERT INTO `file` (
                    `name`, `mime`, `size`, `data`, `created`
                )
                VALUES (
                    '{$name}', '{$mime}', {$size}, '{$data}', NOW()
                )";
     
            // Execute the query
            $result = $dbLink->query($query);
			
			move_uploaded_file($_FILES["myfile"]["tmp_name"],$destination.$name);
            // Check if it was successfull
            if($result) {
				$id = $dbLink->insert_id;
				//echo('last id = '.$id);
                //echo 'Success! Your file was successfully added!';
                $resp->status=true;
				$resp->data = $id;
            }
            else {
            	$resp->status=false;
				$resp->data = 'yyy Error! Failed to insert the file'
                   . "<pre>{$dbLink->error}</pre>";
            }
        }
        else {
            //echo 'xxx An error accured while the file was being uploaded. '
            //   . 'Error code: '. intval($_FILES['myfile']['error']);
        }
     
        // Close the mysql connection
        $dbLink->close();
    }
    else {
        //echo 'Error! A file was not sent!';
    }
     
    // Echo a link back to the main page
    //echo '<p>Click <a href="index.html">here</a> to go back</p>';
    
    echo json_encode($resp);
    ?>
    