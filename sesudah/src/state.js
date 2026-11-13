// state.js — data catatan dan aturannya, tanpa menyentuh tampilan
import { muat, simpan } from './storage.js';

let daftar = muat();

export function semua() {
  return daftar;
}

export function tambah(judul, mk) {
  daftar.push({
    id: Date.now(),
    judul: judul,
    mk: mk,
    dibuat: new Date().toISOString(),
    disematkan: false,
  });
  simpan(daftar);
}

export function alihSemat(id) {
  for (const c of daftar) {
    if (c.id === id) c.disematkan = !c.disematkan;
  }
  simpan(daftar);
}

export function hapus(id) {
  daftar = daftar.filter((c) => c.id !== id);
  simpan(daftar);
}

export function cari(kata) {
  const k = kata.toLowerCase();
  return daftar.filter((c) => c.judul.toLowerCase().includes(k));
}