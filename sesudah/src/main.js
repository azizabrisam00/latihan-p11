// main.js — titik masuk: menyambungkan state dan ui, memasang event
import { tambah, alihSemat, hapus, cari } from './state.js';
import { render } from './ui.js';

let kataCari = '';

function segarkan() {
  render(cari(kataCari));
}

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const judul = document.getElementById('judul').value.trim();
  if (judul === '') return;
  tambah(judul, document.getElementById('mk').value);
  document.getElementById('judul').value = '';
  segarkan();
});

document.getElementById('cari').addEventListener('input', function (e) {
  kataCari = e.target.value;
  segarkan();
});

function klikKartu(e) {
  const tombol = e.target.closest('button[data-aksi]');
  if (!tombol) return;
  const id = Number(tombol.dataset.id);
  if (tombol.dataset.aksi === 'semat') {
    alihSemat(id);
  } else if (tombol.dataset.aksi === 'hapus') {
    if (!confirm('Hapus catatan ini?')) return;
    hapus(id);
  }
  segarkan();
}

document.getElementById('sematan').addEventListener('click', klikKartu);
document.getElementById('semua').addEventListener('click', klikKartu);

segarkan();