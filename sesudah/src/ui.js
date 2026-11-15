// ui.js — menggambar daftar dan teks info ke halaman, memakai komponen dari komponen.js
import { KartuCatatan, PesanKosong } from './komponen.js';

function isi(wadah, daftar, teksKosong) {
  if (daftar.length === 0) {
    wadah.replaceChildren(PesanKosong(teksKosong));
    return;
  }
  wadah.replaceChildren(...daftar.map((c) => KartuCatatan(c)));
}

// peringatan: pesan dari penyimpanan (kosong bila tidak ada masalah)
export function render(hasil, peringatan = '') {
  const info = document.getElementById('info');
  const disemat = hasil.filter((c) => c.disematkan);

  isi(document.getElementById('sematan'), disemat, 'Belum ada catatan yang disematkan.');
  isi(document.getElementById('semua'), hasil, 'Tidak ada catatan.');

  const ringkas = hasil.length + ' catatan, ' + disemat.length + ' disematkan';
  info.textContent = peringatan ? ringkas + ' — ' + peringatan : ringkas;
}
