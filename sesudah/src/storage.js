// storage.js — satu-satunya modul yang menyentuh localStorage.
// Kontrak: muat() dan simpan() TIDAK PERNAH melempar galat.
export const KUNCI = 'catatan-kuliah:v1';

let cadangan = []; // salinan di memori, dipakai bila localStorage tidak bisa dibaca
let pesan = '';    // peringatan terakhir untuk pengguna ('' = tidak ada masalah)

export function pesanPenyimpanan() {
  return pesan;
}

// Catatan sah: objek dengan id angka, judul/mk teks, dan tanggal dibuat yang valid
function sah(c) {
  return c !== null && typeof c === 'object' &&
    Number.isFinite(c.id) &&
    typeof c.judul === 'string' &&
    typeof c.mk === 'string' &&
    typeof c.dibuat === 'string' && !Number.isNaN(Date.parse(c.dibuat));
}

function bersihkan(c) {
  return { id: c.id, judul: c.judul, mk: c.mk, dibuat: c.dibuat, disematkan: c.disematkan === true };
}

export function muat() {
  let mentah;
  try {
    mentah = localStorage.getItem(KUNCI);
  } catch (err) {
    console.warn('localStorage tidak tersedia, memakai cadangan di memori:', err);
    pesan = 'Penyimpanan peramban tidak tersedia. Catatan hanya disimpan sementara di memori.';
    return cadangan.slice();
  }

  pesan = '';
  if (mentah === null) {
    cadangan = [];
    return [];
  }

  let data = null;
  try {
    data = JSON.parse(mentah);
  } catch (err) {
    console.warn('Data catatan rusak (bukan JSON valid):', err);
  }

  if (!Array.isArray(data)) {
    console.warn('Data catatan bukan array, dimulai dari daftar kosong.');
    pesan = 'Data tersimpan rusak, aplikasi dimulai dari daftar kosong.';
    cadangan = [];
    return [];
  }

  const hasil = data.filter(sah).map(bersihkan);
  if (hasil.length < data.length) {
    const buang = data.length - hasil.length;
    console.warn(buang + ' item rusak diabaikan.');
    pesan = buang + ' catatan rusak diabaikan.';
  }
  cadangan = hasil.slice();
  return hasil;
}

export function simpan(data) {
  cadangan = Array.isArray(data) ? data.slice() : [];
  try {
    localStorage.setItem(KUNCI, JSON.stringify(data));
    pesan = '';
    return true;
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage:', err);
    pesan = 'Catatan tidak tersimpan permanen: penyimpanan penuh atau diblokir. Data hilang bila halaman ditutup.';
    return false;
  }
}
