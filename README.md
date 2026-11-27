# ☕ Java Code Lyric Animation — VS Code Dark Edition

Animasi lirik lagu bergaya editor kode **Visual Studio Code (Near-Black / OLED Dark Theme)** menggunakan sintaks resmi bahasa **Java**, animasi ketik **per-huruf**, pembesaran sesaat pada karakter yang sedang aktif, dan kamera zoom makro yang meluncur halus mengikuti jalannya ketikan.

---

## 📁 Struktur File Proyek

```text
lirik apa lagi ya/
├── index.html     # Halaman utama (UI VS Code bersih: 1 Tab File, Breadcrumbs, & Editor)
├── style.css      # Tema warna VS Code gelap (#0a0b0e), font monospace, gutter, & kursor
├── script.js      # Konfigurasi lagu, daftar lirik Java, syntax highlighter, & mesin kamera
└── README.md      # Panduan penggunaan proyek
```

---

## 🚀 Cara Menjalankan

1. Klik ganda file **`index.html`** atau buka menggunakan browser pilihan Anda (**Chrome**, **Edge**, **Firefox**).
2. Animasi akan otomatis berjalan setelah jeda awal (`startDelay`).
3. Untuk merekam video lirik (TikTok, IG Reels, YouTube Shorts), gunakan perekam layar seperti **OBS Studio**, **CapCut PC**, atau **Windows Game Bar (`Win + Alt + R`)**.

---

## ⌨️ Kontrol Keyboard (*Shortcuts*)

| Tombol | Fungsi |
| :---: | :--- |
| **`Spasi`** | Menjeda (*Pause*) atau melanjutkan (*Resume*) animasi. |
| **`R`** | Mengulang animasi dari baris pertama (*Restart*). |

---

## 🎨 Tampilan & Fitur Kamera

1. **Antarmuka VS Code Bersih (Near-Black `#0a0b0e`)**:
   - Hanya menampilkan **1 tab file aktif** (`MyLove.java ●`), jalur navigasi **Breadcrumbs** (`java-lyrics › src › MyLove.java › f sing()`), serta **Gutter** nomor baris 2 digit (`01`, `02`, `03`...) lengkap dengan panah lipat (`˅`) dan indikator garis hijau *git diff*.
   - Bebas dari panel Explorer, Title Bar, Activity Bar, maupun Status Bar agar rekaman tetap bersih.
2. **Zoom Makro & Kamera Meluncur Kiri $\rightarrow$ Kanan**:
   - Kamera men-zoom ke baris aktif (`cameraZoom: 1.65`, `activeLineScale: 1.15`) dan meluncur mulus dari kiri ke kanan mengikuti posisi kursor.
   - Saat satu baris selesai diketik, kamera **tetap diam di posisi teks terakhir** selama jeda `endPause`, lalu meluncur kembali ke kiri secara halus tepat saat baris berikutnya mulai muncul.
3. **Animasi Huruf Aktif & Fading Jarak**:
   - Hanya huruf yang sedang aktif diketik yang membesar sesaat (`scale(1.25)`), lalu langsung kembali ke ukuran normal saat huruf berikutnya masuk.
   - Baris yang sudah lewat akan memudar bertahap disertai *soft blur* sesuai jaraknya dari baris aktif.
4. **Pewarnaan Sintaks Java**:
   - **Control Flow** (`if`, `else`, `for`, `while`) $\rightarrow$ Ungu (`#c586c0`).
   - **Method** (`println`, `knows`, `whisper`, `search`) $\rightarrow$ Kuning Keemasan (`#dcdcaa`).
   - **String Lirik** (`"..."`) $\rightarrow$ Oranye (`#ce9178`).
   - **Class / Tipe Data** (`System`, `Place`, `String`) $\rightarrow$ Teal (`#4ec9b0`).
   - **Kurung & Kurawal** (`()`, `{}`) $\rightarrow$ Gold Bracket (`#ffd700`).

---

## ✍️ Cara Mengubah Lirik & Pengaturan di [script.js](file:///d:/Lirik/lirik%20apa%20lagi%20ya/script.js)

### 1. Konfigurasi Utama (`songConfig`)
```javascript
const songConfig = {
    title: "Beautiful In White x My Love",
    userCredit: "@_jvst.k",
    startDelay: 1000,          // Jeda awal sebelum baris pertama dimulai (ms)
    clearWhenFinished: false,  // Ubah ke true jika ingin mengulang otomatis setelah selesai

    cameraZoom: 1.65,          // Tingkat zoom makro kamera
    activeLineScale: 1.15,     // Perbesaran khusus baris aktif
    fadeStrength: 0.35,        // Kepekatan memudar baris yang sudah lewat (0.1 - 0.5)
};
```

### 2. Daftar Lirik (`lyrics`)
Edit array `lyrics` di `script.js` untuk menyesuaikan lirik, kecepatan ketik (`speed`), dan jeda antar baris (`endPause`):

```javascript
const lyrics = [
    {
        code: 'if (heart.knows( "you\'re my every reason" )) {',
        speed: 45,       // Kecepatan ketik per-huruf (ms)
        endPause: 1000   // Jeda diam setelah baris selesai diketik (ms)
    },
    {
        code: '    System.out.println( "you\'re all that I believe in" );',
        speed: 42,
        endPause: 1000
    },
    ...
];
```

---

## 💡 Tips Kustomisasi Cepat
- **Mengubah Nama File di Tab / Breadcrumbs**: Edit teks `MyLove.java` di dalam [index.html](file:///d:/Lirik/lirik%20apa%20lagi%20ya/index.html).
- **Menyesuaikan Ketukan Lagu**: Atur nilai `speed` (misal `35` untuk lirik cepat, `55` untuk lirik lambat) dan `endPause` agar pas dengan vokal atau *beat* musik Anda.
- **Indentasi Otomatis**: Gunakan 4 spasi di awal string untuk baris di dalam blok `{ }` (contoh: `'    System.out.println(...)'`); spasi awal akan otomatis dilewati sebelum pengetikan dimulai.
