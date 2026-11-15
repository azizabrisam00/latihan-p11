# Changelog

Semua perubahan penting pada Catatan Kuliah dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/).

## [1.2.0] - 2026-11-15
### Added
- `src/komponen.js`: komponen `KartuCatatan(catatan)` dan `PesanKosong(teks)`; teks pengguna selalu lewat `textContent`.
- `src/storage.js`: `KUNCI` berversi `catatan-kuliah:v1`; `muat()` dan `simpan()` yang tidak pernah melempar galat; cadangan di memori dan pesan peringatan bila penyimpanan tidak tersedia.
- `uji/uji-tangguh.html` dan `uji/uji-tangguh.js`: pemeriksa ketangguhan P12 (tidak diubah).
### Changed
- `src/ui.js` memakai `KartuCatatan` dan `PesanKosong`, sehingga markup kartu ditulis satu kali untuk daftar Disematkan dan Semua catatan.
- `#info` menampilkan peringatan saat penyimpanan rusak, penuh, atau diblokir.
### Fixed
- Aplikasi tidak lagi mati saat isi localStorage rusak; item yang tidak sah disaring.
- Judul berisi tag HTML (mis. `<b>tebal</b>`) tampil sebagai teks, bukan diperlakukan sebagai kode.

## [1.1.0] - 2026-11-03
### Changed
- Kode monolit dipecah menjadi modul ES: `main.js`, `state.js`, `ui.js`, `storage.js`.
### Added
- `uji/uji-modul.html` dan `uji/uji-modul.js`: pemeriksa modul P11.
- `README.md` dengan catatan penggunaan AI.

## [1.0.0] - 2026-11-03
### Added
- Versi monolit: tambah, sematkan, hapus, dan cari catatan kuliah, disimpan di localStorage.