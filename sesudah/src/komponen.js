// komponen.js — komponen tampilan yang ditulis sekali, dipakai di mana-mana.
// Aturan: teks dari pengguna SELALU lewat textContent, tidak pernah innerHTML.

function buat(tag, kelas, teks) {
  const el = document.createElement(tag);
  if (kelas) el.className = kelas;
  if (teks !== undefined) el.textContent = teks;
  return el;
}

// Kontrak: KartuCatatan(catatan) → HTMLElement
// catatan: { id, judul, mk, dibuat, disematkan }
export function KartuCatatan(catatan) {
  const kartu = buat('div', 'kartu');

  const semat = buat('button', '', catatan.disematkan ? 'Lepas' : 'Sematkan');
  semat.type = 'button';
  semat.dataset.aksi = 'semat';
  semat.dataset.id = catatan.id;

  const hapus = buat('button', '', 'Hapus');
  hapus.type = 'button';
  hapus.dataset.aksi = 'hapus';
  hapus.dataset.id = catatan.id;

  const aksi = buat('div', 'aksi');
  aksi.append(semat, hapus);

  kartu.append(
    buat('small', '', catatan.mk),
    buat('h3', '', catatan.judul),
    buat('small', '', new Date(catatan.dibuat).toLocaleDateString('id-ID')),
    aksi
  );
  return kartu;
}

// Kontrak: PesanKosong(teks) → HTMLElement
export function PesanKosong(teks) {
  return buat('p', 'kosong', teks);
}
