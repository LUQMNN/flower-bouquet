<?php
require 'config.php';
if(isset($_POST["submit"])){
  $email = $_POST["email"];
  $password = $_POST["password"];
  $result = $_POST($conn, "SELECT * FROM users WHERE email = '$email'");
  $row = mysqli_fetch_assoc($result);
  if(mysqli_num_rows(($result)) >0){
    if($password == $row["password"]){
    $_SESSION["login"] = true;
    $_SESSION["id"] = $row["id"];
    header("Location: index.php");
  }else{
  echo "<script> alert('Wrong password'); </script>";
  }

}else{
  echo "<script> alert('User not registered'); </script>";
}
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
 

</head>

<body>
  
  <section class="about">
    <div class="login-container">
      <h2 class="login-title">Log In</h2>
      <form class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit" class="login-button">Login</button>
        <p class="signup-link">
          Don't have an account? <a href="Signup.html">Sign up</a>
        </p>
      </form>
    </div>
  </section>

</body>

</html>