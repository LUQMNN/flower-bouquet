<?php
require'config.php';
if(!empty($_SESSION["id"])){
  $id = $_SESSIONp["id"];
  $result = mysqli_query($conn, "SELECT * FROM users WHERE id = $id");
  $row = mysqli_fetch_assoc($result);

}
else{
  header("Location: login.php");
}
?>
<!DOCTYPE html>
<html>
  <head><title>Index</title></head>
  <body>
    <p>Welcome <?php echo $row["name"];?></p>
    <a href="logout.php">Logout</a>
  </body>
</html>