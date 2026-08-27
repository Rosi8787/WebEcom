# PRD — Feature: Task List Page
# Untuk: AI Coding Agent | Branch: `feature/task-list` | Owner: Member C

**Proyek:** Team Task Board
**Versi:** 1.0
**Tanggal:** 20 Agustus 2026

---

## 1. Konteks

Proyek **Team Task Board** dikerjakan 3 anggota secara paralel di branch terpisah agar tidak saling tabrakan (merge conflict):

| Branch | Owner | Fitur |
|---|---|---|
| `feature/header` | Member A | Header aplikasi & nama tim |
| `feature/login` | Member B | Halaman login |
| **`feature/task-list`** | **Member C (kamu)** | **Halaman daftar tugas** |

Dokumen ini khusus untuk AI Agent yang akan membuat/mengedit file **hanya di scope `feature/task-list`**.

---

## 2. Tujuan

Agent membuat halaman **Task List** yang menampilkan, menambah, menandai selesai, dan menghapus tugas — menggunakan **Next.js App Router**, tanpa menyentuh area kerja anggota lain, agar PR bisa di-merge tanpa konflik.

---

## 3. Aturan Batas Scope (WAJIB — Anti-Conflict)

Agar tidak tabrakan dengan branch `feature/header` dan `feature/login`, Agent **HANYA BOLEH**:

### ✅ Boleh dibuat/diedit (milik Member C)
```
app/tasks/page.tsx
app/tasks/layout.tsx          (jika perlu)
app/tasks/loading.tsx         (opsional)
components/tasks/TaskItem.tsx
components/tasks/TaskForm.tsx
components/tasks/TaskFilter.tsx
lib/tasks.ts                  (data/helper khusus task)
types/task.ts
app/api/tasks/route.ts
app/api/tasks/[id]/route.ts
```

### ❌ DILARANG diedit (milik anggota lain)
```
app/layout.tsx                → jika perlu import, TAMBAHKAN link/nav minimal,
                                  jangan ubah struktur header (milik Member A)
components/Header.tsx          → milik Member A, JANGAN disentuh
app/login/**                   → milik Member B, JANGAN disentuh
components/LoginForm.tsx       → milik Member B, JANGAN disentuh
```

### ⚠️ File Bersama (Shared) — Hati-hati
Jika Agent perlu menambah entri ke file yang dipakai bersama seperti:
- `app/layout.tsx` (root layout)
- `package.json`
- `tailwind.config.ts`

**Aturan:** hanya **menambah** baris baru (append), **jangan menghapus/mengubah** baris milik fitur lain. Tandai bagian tambahan dengan komentar `{/* task-list feature */}` agar mudah di-review dan di-merge.

---

## 4. Requirement Fungsional

| ID | Requirement | Detail |
|---|---|---|
| F1 | Lihat daftar tugas | Tampilkan list tugas: judul, status (selesai/belum), tanggal dibuat |
| F2 | Tambah tugas | Form input judul tugas baru → tambah ke list |
| F3 | Tandai selesai | Checkbox untuk toggle status selesai/belum |
| F4 | Hapus tugas | Tombol hapus per item |
| F5 | Filter | Filter: All / Active / Completed |
| F6 | Empty state | Tampilkan pesan jika belum ada tugas |

## 5. Requirement Non-Fungsional

- **Framework:** Next.js App Router (Server Component untuk fetch awal, Client Component untuk interaksi form/checkbox)
- **Styling:** Tailwind CSS (ikuti konvensi warna/style yang sudah ada di proyek, jangan buat file CSS global baru)
- **State:** Local state (`useState`) untuk interaksi UI; jika ada backend, gunakan API Route (`app/api/tasks`)
- **Responsive:** Mobile-first
- **TypeScript:** Wajib, gunakan tipe dari `types/task.ts`

---

## 6. Data Model

```ts
// types/task.ts
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO date
}
```

---

## 7. Struktur File yang Harus Dibuat Agent

```
app/
└── tasks/
    ├── page.tsx              # Halaman utama task list (Server Component)
    └── loading.tsx           # Skeleton loading (opsional)
components/
└── tasks/
    ├── TaskItem.tsx           # Satu baris task (checkbox + delete)
    ├── TaskForm.tsx           # Form tambah task (Client Component)
    └── TaskFilter.tsx         # Tombol filter All/Active/Completed
lib/
└── tasks.ts                   # Fungsi helper (getTasks, addTask, dll — mock/local dulu)
types/
└── task.ts                    # Interface Task
app/api/tasks/
├── route.ts                   # GET (list), POST (create)
└── [id]/route.ts              # PATCH (toggle), DELETE
```

---

## 8. Acceptance Criteria

- [ ] Halaman `/tasks` bisa diakses dan menampilkan list tugas
- [ ] Bisa menambah tugas baru lewat form
- [ ] Bisa menandai tugas selesai (checkbox)
- [ ] Bisa menghapus tugas
- [ ] Filter All/Active/Completed berfungsi
- [ ] Tidak ada file di luar daftar Section 3 & 7 yang diubah
- [ ] Tidak ada perubahan pada `components/Header.tsx` atau folder `app/login/**`
- [ ] Build sukses tanpa error (`npm run build`)

---

## 9. Instruksi Commit & PR untuk Agent

```bash
git switch main
git pull origin main
git switch -c feature/task-list

# ... agent membuat/edit file sesuai Section 7 ...

git add app/tasks/ components/tasks/ lib/tasks.ts types/task.ts app/api/tasks/
git commit -m "feat: add task list page"
git push -u origin feature/task-list
```

Buka PR ke `main` dengan judul: **"feat: task list page"**, assign **Member B** sebagai reviewer, dan cantumkan checklist Section 8 di deskripsi PR.

---

## 10. Catatan Penting untuk Agent

> Jika saat mengerjakan ternyata ada file di luar Section 3 yang **wajib** disentuh (misal `app/layout.tsx` untuk nav link ke `/tasks`), lakukan perubahan **minimal**, jangan refactor struktur yang sudah ada, dan sebutkan secara eksplisit di deskripsi PR bagian mana yang disentuh dan kenapa — supaya reviewer (Member B) bisa cek cepat dan tidak terjadi konflik saat merge.
