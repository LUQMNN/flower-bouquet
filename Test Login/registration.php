<?php
require 'config.php';
if(isset($_POST["submit"])){
  $fname = $_POST["firstname"];
  $lname = $_POST["lastname"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $confirm_password = $_POST["confirm_password"];
  $address = $_POST["address"];
  $duplicate = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
  if (mysqli_num_rows($duplicate) > 0){
    echo "<script> alert('Email Has already exist'); </script>";
  
}else{
    if($password == $confirm_password){
      $query = "INSERT INTO users ('','$fname','$lname','$email', '$password', '$address')";
      mysqli_query($conn,$query);
      echo "<script> alert('Account successfully created'); </script>";

}else{
  echo "<script> alert('Password does not match'); </script>";
}
}
}
?>

<!DOCTYPE html>
<html>
  <head><title>Sign Up</title></head>
  <body>
    <h2>Registration</h2>
    <section class="about">
    <div class="signup-container">
      <h2 class="signup-title">Sign Up</h2>
      <form class="signup-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" name="address" rows="3" required></textarea>
        </div>

        <div class="button-group">
          <button type="button" class="back-button" onclick="window.location.href='login.html'">Back</button>
          <button type="submit" class="confirm-button">Confirm</button>
        </div>
      </form>
    </div>
  </section>
  </body>
</html>