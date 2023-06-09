$(document).ready(function() {
  // Getting references to the login HTML
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/users/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/");
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    if (err) {
      const errTxt = "Email/Password not valid!";
      $("#alert .msg").text(errTxt);
    }
    $("#alert").fadeIn(500);
    console.log(err.responseJSON);
  }
});