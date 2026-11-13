// ui.js — menggambar kartu dan teks info ke halaman
function htmlKartu(c) {
  return '<div class="kartu"><small>' + c.mk + '</small><h3>' + c.judul + '</h3>' +
    '<small>' + new Date(c.dibuat).toLocaleDateString('id-ID') + '</small>' +
    '<div class="aksi"><button data-aksi="semat" data-id="' + c.id + '">' +
    (c.disematkan ? 'Lepas' : 'Sematkan') + '</button>' +
    '<button data-aksi="hapus" data-id="' + c.id + '">Hapus</button></div></div>';
}

export function render(hasil) {
  const sematan = document.getElementById('sematan');
  const semua = document.getElementById('semua');
  const info = document.getElementById('info');
  const disemat = hasil.filter((c) => c.disematkan);

  sematan.innerHTML = disemat.length === 0
    ? '<p class="kosong">Belum ada catatan yang disematkan.</p>'
    : disemat.map(htmlKartu).join('');
  semua.innerHTML = hasil.length === 0
    ? '<p class="kosong">Tidak ada catatan.</p>'
    : hasil.map(htmlKartu).join('');
  info.textContent = hasil.length + ' catatan, ' + disemat.length + ' disematkan';
}