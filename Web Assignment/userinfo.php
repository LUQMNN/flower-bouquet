<?php
require_once('connection.php'); 

$fname = $_POST['firstName'];
$lname = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];
$address = $_POST['address'];
echo $name;


$sql = "INSERT INTO students (FirstName, LastName, Email, Password, Address) VALUES ('$fname', '$lname','$email','$password', '$address')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
