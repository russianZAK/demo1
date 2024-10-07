document.addEventListener("DOMContentLoaded", function () {
    const eyeIcon = document.getElementById("toggle-password");
    const pwField = document.getElementById("password-field");

    eyeIcon.addEventListener("click", () => {
        if (pwField.type === "password") {
            pwField.type = "text";
            eyeIcon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            pwField.type = "password";
            eyeIcon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});
