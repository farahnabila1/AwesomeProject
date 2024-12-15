# 📱 **CareLink - Aplikasi Kesehatan Digital**

---

## ✨ **Deskripsi Produk**

**CareLink** adalah aplikasi mobile berbasis **React Native** yang dirancang untuk membantu pengguna dalam mengelola dan mengakses informasi rumah sakit serta layanan kesehatan dengan cepat dan mudah. Aplikasi ini memiliki berbagai fitur untuk memudahkan navigasi layanan kesehatan, informasi rumah sakit, serta komunikasi melalui berbagai media sosial.

---

## 🛠️ **Komponen Pembangun Produk**

Aplikasi ini dibangun dengan menggunakan teknologi dan pustaka berikut:

- **React Native** - Framework untuk membangun aplikasi lintas platform yang cepat dan responsif.
- **React Navigation** - Untuk navigasi antar halaman dengan lancar.
- **FontAwesome** - Digunakan untuk menampilkan ikon media sosial dan ikon navigasi.
- **Axios** - Untuk komunikasi dengan server menggunakan HTTP request.
- **React Native Maps** - Untuk menampilkan peta lokasi rumah sakit dan tempat layanan kesehatan.
- **State Management dengan Hooks** - Menggunakan React hooks untuk mengatur state dan manajemen data.

---

## 🔗 **Sumber Data**

Aplikasi ini mengambil data dari berbagai sumber sebagai referensi:

1. **Data Rumah Sakit**  
   Endpoint API rumah sakit digunakan dari:  
   - `http://192.168.56.41:3000/rumahsakit`  
   Data ini mencakup informasi rumah sakit seperti alamat, rating, kontak, dan layanan yang ditawarkan.

2. **Scraper Data Google Maps**  
   Menggunakan metode scraper untuk mengumpulkan informasi rumah sakit dari Google Maps. Data ini tersimpan dalam format **CSV** untuk memudahkan analisis data lebih lanjut.

   - **Contoh sumber CSV:**  
     - Nama rumah sakit  
     - Lokasi GPS (lintang & bujur)  
     - Kontak dan rating  
     - Alamat dan layanan kesehatan terkait.

   **Contoh file:**  
   [data-scraper-googlemaps.csv](assets/data/data-scraper-googlemaps.csv)

---

## 📸 **Tangkapan Layar**

### 🏠 **Tampilan Landing Page**  
Halaman utama dengan tampilan informasi pembuat aplikasi dan gambaran umum aplikasi.

<p align="center">
  <img src="assets/LandingPage-small.jpg" alt="Tampilan Landing Page" width="500" />
</p>

---

### 🗺️ **Tampilan Peta Lokasi**  
Peta yang menampilkan sebaran lokasi rumah sakit di Kota Surabaya dengan fitur pencarian lokasi.

<p align="center">
  <img src="assets/map-small.jpg" alt="Tampilan Peta Lokasi" width="500" />
</p>

---

### 🏥 **Formulir Pesan Kamar**  
Formulir untuk memesan kamar di rumah sakit yang dipilih oleh pengguna.

<p align="center">
  <img src="assets/form-small.jpg" alt="Formulir Pesan Kamar" width="500" />
</p>

---

### ✏️ **Formulir Edit Data Rumah Sakit**  
Memungkinkan pengguna untuk mengedit informasi rumah sakit dengan cepat dan sederhana.

<p align="center">
  <img src="assets/edit-form-small.jpg" alt="Formulir Edit Data Rumah Sakit" width="500" />
</p>

---

### 🔗 **Navigasi Media Sosial**  
Menu navigasi untuk mengakses tautan komunikasi seperti WhatsApp, Instagram, LinkedIn, dan GitHub.

<p align="center">
  <img src="assets/social-links-small.jpg" alt="Navigasi Media Sosial" width="500" />
</p>

---

### 👤 **Profil Penyusun**  
Informasi dan profil penyusun aplikasi untuk menginspirasi kolaborasi dan komunikasi.

<p align="center">
  <img src="assets/profil-small.jpg" alt="Profil Penyusun" width="500" />
</p>

---
