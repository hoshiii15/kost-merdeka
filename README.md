# Kost Merdeka - Landing Page dengan Scrollytelling

Landing page statis untuk "Kost Merdeka" dengan animasi scroll penuh (scrollytelling) menggunakan GSAP ScrollTrigger dan Lenis smooth scrolling.

## 🎯 Fitur

- **Scrollytelling penuh** dengan animasi yang mulus dan interaktif
- **Smooth scrolling** menggunakan Lenis
- **Animasi GSAP** yang powerful dengan ScrollTrigger
- **Responsive design** untuk semua ukuran layar
- **Performance optimized** dengan will-change dan hardware acceleration

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur semantik
- **SCSS/CSS3** - Styling dengan variabel dan nesting
- **JavaScript ES6** - Logika animasi
- **GSAP 3.12.5** - Animasi library
- **ScrollTrigger** - Plugin GSAP untuk scroll-based animations
- **Lenis 1.0.29** - Smooth scrolling library

## 📂 Struktur File

```
kost-merdeka/
├── index.html          # File HTML utama
├── css/
│   ├── style.scss      # SCSS source file
│   └── style.css       # CSS compiled (siap pakai)
├── js/
│   └── main.js         # JavaScript dengan GSAP animations
└── README.md           # Dokumentasi ini
```

## 🎬 Animasi yang Diimplementasikan

### 1. Hero Section

- Teks judul muncul dengan stagger animation saat page load
- Parallax effect pada background dan content saat scroll
- Fade-out effect yang smooth

### 2. Intro Section

- Teks slide dari bawah dengan fade-in
- Gambar slide dari samping kanan
- Trigger animation saat masuk viewport

### 3. Fasilitas Section (Horizontal Scroll)

- **Section pinning** - Section dipaku saat scroll
- **Horizontal scroll** - Galeri scroll horizontal di dalam section yang di-pin
- Scale dan fade animation untuk setiap item fasilitas
- Total 6 fasilitas dengan gambar dan deskripsi

### 4. Tipe Kamar Section

- **Reveal/Masking effect** pada gambar kamar
- Clip-path animation untuk efek reveal yang dramatis
- Scale animation pada gambar dari 1.2 ke 1.0
- Info slide dari samping (bergantian kiri-kanan)
- 3 tipe kamar: Standard, Deluxe, dan Premium

### 5. Lokasi Section

- **Pin animation** yang muncul satu per satu
- Scale dan opacity animation dengan stagger
- Pulse animation pada pin utama (Kost Merdeka)
- List item slide dari kiri dengan stagger

### 6. CTA Section

- **Pulse animation** pada tombol utama (infinite loop)
- Scale animation saat masuk viewport
- Hover effects yang smooth
- Stagger animation untuk info contact

## 🚀 Cara Menggunakan

### Langkah 1: Persiapan File

Pastikan struktur folder sudah benar seperti di atas.

### Langkah 2: Compile SCSS (Opsional)

Jika Anda ingin mengedit SCSS:

```bash
# Install SASS compiler (jika belum)
npm install -g sass

# Compile SCSS ke CSS
sass css/style.scss css/style.css

# Atau watch mode untuk auto-compile
sass --watch css/style.scss:css/style.css
```

**CATATAN:** File `style.css` sudah disediakan, jadi langkah ini opsional.

### Langkah 3: Buka di Browser

Cukup buka file `index.html` di browser Anda:

```bash
# Dengan live server (recommended)
# Install extension "Live Server" di VS Code
# Kemudian klik kanan pada index.html > "Open with Live Server"

# Atau langsung buka file
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

### Langkah 4: Testing

Scroll halaman untuk melihat semua animasi beraksi!

## 🎨 Kustomisasi

### Mengubah Warna

Edit variabel di `css/style.scss`:

```scss
$primary-color: #2c3e50; // Warna utama
$accent-color: #e74c3c; // Warna aksen
$text-color: #333; // Warna teks
$light-bg: #f8f9fa; // Background terang
```

### Mengubah Gambar

Ganti URL gambar di `index.html` dengan gambar Anda sendiri:

```html
<!-- Contoh -->
<img src="path/to/your/image.jpg" alt="Description" />
```

### Mengubah Timing Animasi

Edit di `js/main.js`:

```javascript
// Contoh: Ubah durasi animasi
gsap.from(".hero__title-line", {
  duration: 1, // Ubah nilai ini (dalam detik)
  // ...
});
```

### Mengubah Konten

Edit teks, harga, dan informasi di `index.html` sesuai kebutuhan.

## 📱 Responsiveness

Website ini fully responsive dengan breakpoint:

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## ⚡ Performance Tips

1. **Lazy Loading Images**: Tambahkan `loading="lazy"` pada tag img
2. **Optimize Images**: Compress gambar sebelum digunakan
3. **CDN**: Library sudah menggunakan CDN untuk loading yang cepat
4. **Will-change**: Sudah diimplementasikan untuk performance GPU

## 🔧 Dependencies (CDN)

Semua dependencies dimuat via CDN:

- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
- Lenis: `https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js`

## 📝 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🐛 Troubleshooting

### Animasi tidak jalan

1. Pastikan semua script CDN berhasil dimuat
2. Buka Console (F12) untuk cek error
3. Pastikan JavaScript enabled di browser

### Scroll tidak smooth

1. Pastikan Lenis library berhasil dimuat
2. Clear cache browser
3. Coba di browser lain

### Horizontal scroll tidak bekerja

1. Pastikan viewport cukup lebar
2. Cek console untuk error
3. Refresh ScrollTrigger dengan `ScrollTrigger.refresh()`

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Credits

- GSAP by GreenSock
- Lenis by Studio Freight
- Images from Unsplash

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository atau hubungi developer.

---

**Happy Coding! 🚀**
