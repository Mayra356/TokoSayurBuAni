// ======================================
// LOADING SCREEN
// ======================================

const loading = document.createElement("div");

loading.innerHTML = `
<div class="loading-screen">
  <h1>🥬 Toko Sayur Bu Ani</h1>
  <p>Menyiapkan sayur segar...</p>
</div>
`;

document.body.appendChild(loading);

const loadingStyle = document.createElement("style");

loadingStyle.innerHTML = `
.loading-screen{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:#2e7d32;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:white;
z-index:9999;
font-family:sans-serif;
transition:1s;
}
`;

document.head.appendChild(loadingStyle);

window.addEventListener("load", () => {
  setTimeout(() => {
    loading.style.opacity = "0";

    setTimeout(() => {
      loading.remove();
    }, 1000);
  }, 1500);
});

// ======================================
// DATA PRODUK
// ======================================

const tombolTambah =
  document.querySelectorAll(".btn-tambah");

const produkRows =
  document.querySelectorAll("tbody tr");

let keranjang = [];
let totalHarga = 0;

// ======================================
// CART FLOATING
// ======================================

const cart = document.createElement("div");

cart.classList.add("floating-cart");

cart.innerHTML = `
🛒 <span id="jumlah-cart">0</span>
`;

document.body.appendChild(cart);

// ======================================
// STYLE INTERAKTIF
// ======================================

const style = document.createElement("style");

style.innerHTML = `
.floating-cart{
position:fixed;
bottom:20px;
right:20px;
background:#2e7d32;
color:white;
padding:15px 20px;
border-radius:50px;
font-size:20px;
font-weight:bold;
box-shadow:0 10px 25px rgba(0,0,0,0.2);
z-index:999;
cursor:pointer;
transition:0.3s;
}

.floating-cart:hover{
transform:scale(1.1);
}

.search-box{
padding:12px;
width:300px;
max-width:90%;
border-radius:10px;
border:none;
margin:20px 0;
font-size:16px;
box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

.toast{
position:fixed;
top:20px;
right:20px;
background:#1b5e20;
color:white;
padding:15px 20px;
border-radius:12px;
z-index:9999;
animation:slideIn 0.5s;
}

@keyframes slideIn{
from{
transform:translateX(100px);
opacity:0;
}
to{
transform:translateX(0);
opacity:1;
}
}

.dark-mode{
background:#121212;
color:white;
}

.dark-mode table{
background:#1f1f1f;
color:white;
}

.dark-toggle{
position:fixed;
top:20px;
right:20px;
padding:10px 15px;
border:none;
border-radius:50px;
background:#000;
color:white;
cursor:pointer;
z-index:999;
}
`;

document.head.appendChild(style);

// ======================================
// SEARCH PRODUK
// ======================================

const search = document.createElement("input");

search.placeholder = "Cari sayur...";
search.classList.add("search-box");

const produkSection =
  document.querySelector(".section-produk");

produkSection.insertBefore(
  search,
  produkSection.querySelector("table")
);

search.addEventListener("keyup", () => {
  const value =
    search.value.toLowerCase();

  produkRows.forEach((row) => {
    const nama =
      row.children[0].innerText.toLowerCase();

    row.style.display =
      nama.includes(value)
        ? ""
        : "none";
  });
});

// ======================================
// TAMBAH PRODUK
// ======================================

tombolTambah.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const row = produkRows[index];

    const nama =
      row.children[0].innerText;

    const hargaText =
      row.children[2].innerText;

    const harga =
      parseInt(
        hargaText.replace(/[^0-9]/g, "")
      );

    keranjang.push(nama);

    totalHarga += harga;

    document.getElementById(
      "jumlah-cart"
    ).innerText = keranjang.length;

    toast(`${nama} ditambahkan 🥬`);

    btn.innerText = "✓";

    setTimeout(() => {
      btn.innerText = "+ Tambah";
    }, 1000);
  });
});

// ======================================
// TOAST NOTIFIKASI
// ======================================

function toast(teks) {
  const notif =
    document.createElement("div");

  notif.classList.add("toast");

  notif.innerText = teks;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);
}

// ======================================
// CART CLICK
// ======================================

cart.addEventListener("click", () => {
  alert(`
Produk dipilih:
${keranjang.join("\n")}

Total:
Rp ${totalHarga.toLocaleString("id-ID")}
`);
});

// ======================================
// SMOOTH SCROLL
// ======================================

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        const target =
          document.querySelector(
            link.getAttribute("href")
          );

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    );
  });

// ======================================
// ANIMASI SECTION
// ======================================

const sections =
  document.querySelectorAll("section");

const observer =
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity =
          "1";

        entry.target.style.transform =
          "translateY(0)";
      }
    });
  });

sections.forEach((section) => {
  section.style.opacity = "0";

  section.style.transform =
    "translateY(50px)";

  section.style.transition =
    "1s";

  observer.observe(section);
});

// ======================================
// DARK MODE
// ======================================

const darkBtn =
  document.createElement("button");

darkBtn.innerText = "🌙";

darkBtn.classList.add("dark-toggle");

document.body.appendChild(darkBtn);

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle(
    "dark-mode"
  );
});

// ======================================
// HERO FLOATING
// ======================================

const heroImg =
  document.querySelector(".hero-img");

let naik = true;

setInterval(() => {
  heroImg.style.transform = naik
    ? "translateY(-10px)"
    : "translateY(0px)";

  heroImg.style.transition =
    "2s ease-in-out";

  naik = !naik;
}, 2000);

// ======================================
// BACK TO TOP
// ======================================

const topBtn =
  document.createElement("button");

topBtn.innerText = "⬆";

topBtn.style.position = "fixed";
topBtn.style.bottom = "90px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.cursor = "pointer";

document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});