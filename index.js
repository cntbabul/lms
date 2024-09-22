function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  document.getElementById("clock").innerHTML = `
      <div>${hours}:${minutes}:${seconds}</div>
      <div class="date">${day}, ${month} ${date}, ${year}</div>
    `;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var role = document.getElementById("role").value;

  // Show spinner
  document.getElementById("loader").style.display = "block";

  google.script.run
    .withSuccessHandler(function (result) {
      // Hide spinner
      document.getElementById("loader").style.display = "none";

      if (result) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        document.getElementById("header").style.display = "flex"; // Show header
        document.getElementById("content").innerHTML = result;
      } else {
        alert("Login failed. Check your credentials.");
      }
    })
    .login(email, password, role);
}

function viewTermsAndConditions() {
  const termsText = `
    <h2>Terms & Conditions</h2>
    <p>Welcome to Jana Seva Chit Fund. By accessing or using our services, you agree to be bound by the following terms and conditions:</p>
    <ol>
      <li><strong>Acceptance of Terms:</strong> By registering and using our services, you agree to comply with these terms. If you do not agree, please refrain from using our services.</li>
      <li><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</li>
      <li><strong>Service Availability:</strong> We strive to ensure our services are available at all times. However, we do not guarantee uninterrupted access and are not liable for any downtime or delays.</li>
      <li><strong>Payment Terms:</strong> All payments made via our platform are subject to the terms and conditions outlined during the payment process. Please ensure you review these terms before making any transaction.</li>
      <li><strong>Changes to Terms:</strong> Jana Seva Chit Fund reserves the right to modify these terms at any time. Any changes will be communicated to you and continued use of our services implies acceptance of the updated terms.</li>
      <li><strong>Termination:</strong> We reserve the right to terminate or suspend your account if you violate any of these terms or engage in unlawful activity on our platform.</li>
    </ol>
    <p>For further information or clarification on any of the terms listed above, please contact our support team.</p>
    <p><strong>Last Updated:</strong> January 1, 2024</p>
  `;
  document.getElementById("content").innerHTML = termsText;
}

function logout() {
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("header").style.display = "none"; // Hide header
  google.script.run.logout();
}

// ===================
function viewMwenu() {
  document.getElementById("sidebar").style.display = "flex";
}

function viewProfile() {
  google.script.run
    .withSuccessHandler(function (result) {
      document.getElementById("content").innerHTML = result;
    })
    .viewProfile();
}

function viewTransactions() {
  google.script.run
    .withSuccessHandler(function (result) {
      document.getElementById("content").innerHTML = result;
    })
    .viewTransactions();
}

function viewLoanDetails() {
  google.script.run
    .withSuccessHandler(function (result) {
      document.getElementById("content").innerHTML = result;
    })
    .viewLoanDetails();
}

// Fetch notifications from User Sheets and display them
function viewNotifications() {
  google.script.run
    .withSuccessHandler(function (notifications) {
      let notificationList = `<h3>Notifications________________________________</h3><ul>`;
      notifications.forEach(function (notification) {
        notificationList += `<li>${notification}</li>`;
      });
      notificationList += `</ul>`;
      document.getElementById("content").innerHTML = notificationList;
    })
    .getNotifications();
}
function viewAboutUs() {
  var aboutUsContent = `
    <h2>About Us</h2>
    <p>Welcome to Jana Seva Chit Fund, where we are committed to serving the financial needs of the community.
    Our organization focuses on providing transparent and reliable financial solutions to help you achieve your goals.</p>
    
    <p>Founded in Hatsingimari in the year 2019, we have been offering chit fund services that empower individuals to save and invest with confidence.</p>
    
    <p><strong>Our Mission:</strong> To foster financial growth through trustworthy and people-centered financial services.</p>
    
    <p>Join us on this journey of financial stability and success. We are always here to serve you better.</p>
    <p><strong>Contact Us:</strong> Field executive number: 8404016430</p>
    <p><strong>CEO & MD Contact Number :</strong>7896584049  or email: prodhaniinfotech@gmail.com</p>
  `;

  // Update the content area with About Us information
  document.getElementById("content").innerHTML = aboutUsContent;
}

function rememberPassword() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    // Store email and password in local storage
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    alert("Your email and password have been remembered!");
  } else {
    alert("Please enter both email and password to remember them.");
  }
}
// Auto-fill remembered email and password if they exist in localStorage
window.onload = function () {
  const rememberedEmail = localStorage.getItem("email");
  const rememberedPassword = localStorage.getItem("password");
  if (rememberedEmail && rememberedPassword) {
    document.getElementById("email").value = rememberedEmail;
    document.getElementById("password").value = rememberedPassword;
  }
};
