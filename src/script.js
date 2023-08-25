const button = document.getElementById("send");

function bmiCalculator(weight, height) {
  const result = weight / Math.pow(height, 2);
  const img_result = document.getElementById("result-img");
  let desc = document.getElementById("description");

  if (result < 18.5) {
    img_result.setAttribute("src", "public/img-1.png");
    desc.textContent = `Skor kamu adalah ${result.toFixed(
      2
    )} perbanyak nutrisi lagi ya!`;
  } else if (result >= 18.5 && result <= 24.9) {
    img_result.setAttribute("src", "public/img-2.png");
    desc.textContent = `Skor kamu adalah ${result.toFixed(
      2
    )}, berat badan kamu sudah ideal, pertahankan!`;
  } else {
    img_result.setAttribute("src", "public/img-3.png");
    desc.textContent = `Waduh, Skor kamu ${result.toFixed(
      2
    )}, ayo dijaga pola makannya!`;
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();

  const container_result = document.getElementById("result");
  const tinggi_badan_cm = parseFloat(document.getElementById("tbadan").value);
  const tinggi_badan = tinggi_badan_cm / 100;
  const berat_badan = parseFloat(document.getElementById("bbadan").value);

  const username = document.getElementById("username").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector("input[name=gender]:checked");

  if (tinggi_badan_cm > 200) {
    Swal.fire({
      title: "Error!",
      text: "Badan apa tiang?",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  }

  if (berat_badan > 200) {
    Swal.fire({
      title: "Error!",
      text: "Ga nampung ini keberatan",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  }

  if (age > 100) {
    Swal.fire({
      title: "Error!",
      text: "Harusnya udah almarhum",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  }

  if (!username) {
    Swal.fire({
      title: "Error!",
      text: "Nama belum diisi",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  } else if (!age) {
    Swal.fire({
      title: "Error!",
      text: "Umur belum diisi",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  } else if (!gender) {
    Swal.fire({
      title: "Error!",
      text: "Gender belum dipilih",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  } else if (!berat_badan) {
    Swal.fire({
      title: "Error!",
      text: "Berat badan belum diisi",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  } else if (!tinggi_badan_cm) {
    Swal.fire({
      title: "Error!",
      text: "Tinggi badan belum diisi",
      icon: "error",
      confirmButtonText: "Kembali",
    });
    return false;
  }
  container_result.classList.remove("hidden");

  document.getElementById("image-desc").classList.add("bg-slate-800");

  document.getElementById("result-title").textContent = `Result: `;
  document.getElementById("nama-desc").textContent = `Nama: ${username}`;
  document.getElementById("umur-desc").textContent = `Umur: ${age} tahun`;
  document.getElementById(
    "gender-desc"
  ).textContent = `Gender: ${gender.value}`;
  document.getElementById(
    "berat-desc"
  ).textContent = `Berat: ${berat_badan} kg`;

  document.getElementById(
    "tinggi-desc"
  ).textContent = `Tinggi: ${tinggi_badan_cm} cm`;

  bmiCalculator(berat_badan, tinggi_badan);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyaqGFtA0d_brt1jdfW7OPYVzrOD-pXMjmJRheZEmcQ8OWWM850J8YiijJLAiP9Xb0qdQ/exec";

  const form = document.forms["formportfolio"];
  console.log(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message));
  }); 
});
