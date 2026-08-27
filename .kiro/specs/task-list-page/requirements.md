# Requirements Document

## Introduction

Fitur **Task List Page** adalah halaman `/tasks` pada aplikasi **Team Task Board** yang memungkinkan pengguna melihat, menambah, menyelesaikan, dan menghapus tugas. Halaman ini dibangun menggunakan Next.js 16 App Router dengan pola Server Component untuk pengambilan data awal dan Client Component untuk interaksi UI. Backend disediakan melalui API Route (`app/api/tasks`). Fitur ini dikerjakan oleh Member C pada branch `feature/task-list` dan tidak boleh menyentuh file milik Member A (header) maupun Member B (login).

## Glossary

- **Task_List_Page**: Server Component di `app/tasks/page.tsx` yang merupakan entry point halaman `/tasks`.
- **Task_Board_Client**: Client Component utama yang mengelola state lokal dan mengorkestrasi interaksi UI di halaman task list.
- **TaskItem**: Client Component di `components/tasks/TaskItem.tsx` yang merender satu baris tugas beserta checkbox dan tombol hapus.
- **TaskForm**: Client Component di `components/tasks/TaskForm.tsx` yang menyediakan form input untuk menambah tugas baru.
- **TaskFilter**: Client Component di `components/tasks/TaskFilter.tsx` yang menyediakan tombol filter All / Active / Completed.
- **Tasks_API**: Route Handler di `app/api/tasks/route.ts` yang menangani `GET` (ambil semua tugas) dan `POST` (buat tugas baru).
- **Task_Item_API**: Route Handler di `app/api/tasks/[id]/route.ts` yang menangani `PATCH` (toggle selesai) dan `DELETE` (hapus tugas).
- **Task_Store**: Modul helper di `lib/tasks.ts` yang menyimpan data tugas secara in-memory (mock) dan mengekspos fungsi CRUD.
- **Task**: Interface TypeScript di `types/task.ts` dengan struktur `{ id: string; title: string; completed: boolean; createdAt: string }`.
- **Active_Task**: Tugas dengan nilai `completed === false`.
- **Completed_Task**: Tugas dengan nilai `completed === true`.
- **Empty_State**: Tampilan yang muncul ketika tidak ada tugas pada filter yang sedang aktif.
- **Filter_Mode**: Salah satu dari tiga nilai: `"all"`, `"active"`, atau `"completed"`.
- **ISO_Date**: String tanggal dalam format ISO 8601, contoh `"2026-08-20T10:00:00.000Z"`.
- **Server_Action**: Fungsi async dengan direktif `'use server'` yang dieksekusi di sisi server.
- **useActionState**: React hook (`react`) untuk mengelola state dan pending status dari Server Action.
- **revalidatePath**: Fungsi dari `next/cache` untuk membatalkan cache rute setelah mutasi.

---

## Requirements

### Requirement 1: Tampilkan Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin melihat daftar semua tugas saya saat membuka halaman `/tasks`, sehingga saya dapat mengetahui tugas apa saja yang ada.

#### Acceptance Criteria

1. WHEN pengguna mengakses rute `/tasks`, THE Task_List_Page SHALL merender halaman dengan data tugas yang diambil dari Tasks_API pada sisi server sebelum halaman dikirim ke klien.
2. THE Task_List_Page SHALL menampilkan setiap Task dalam daftar dengan informasi: judul tugas (`title`), indikator status selesai/belum (`completed`), dan tanggal dibuat (`createdAt`) yang diformat secara human-readable.
3. WHEN data tugas sedang dimuat, THE Task_List_Page SHALL menampilkan UI skeleton/loading state melalui file `app/tasks/loading.tsx`.
4. THE Task_List_Page SHALL menggunakan tipe `Task` dari `types/task.ts` untuk semua data yang dirender.

---

### Requirement 2: Tambah Tugas Baru

**User Story:** Sebagai pengguna, saya ingin menambahkan tugas baru melalui sebuah form input, sehingga saya dapat mencatat pekerjaan yang perlu dilakukan.

#### Acceptance Criteria

1. THE TaskForm SHALL menyediakan sebuah field input teks untuk judul tugas dan sebuah tombol submit.
2. WHEN pengguna menekan tombol submit dengan field `title` yang tidak kosong (setelah di-trim), THE TaskForm SHALL memanggil Server Action yang mengirim `POST` request ke Tasks_API dengan `title` sebagai payload.
3. WHEN Tasks_API menerima `POST` request dengan `title` yang valid, THE Tasks_API SHALL membuat Task baru dengan `id` unik (UUID v4), `completed: false`, dan `createdAt` berisi ISO_Date saat ini, lalu mengembalikan respons `201 Created` beserta objek Task yang dibuat.
4. WHEN Tasks_API berhasil membuat Task baru, THE Task_Board_Client SHALL memperbarui tampilan daftar tugas tanpa full page reload.
5. WHEN pengguna menekan submit, THE TaskForm SHALL menonaktifkan tombol submit selama Server Action sedang berjalan (pending state) menggunakan `useActionState`.
6. WHEN Server Action selesai dengan sukses, THE TaskForm SHALL mengosongkan field input `title`.
7. IF pengguna menekan submit dengan field `title` yang kosong atau hanya spasi, THEN THE TaskForm SHALL menampilkan pesan validasi dan tidak mengirim request ke Tasks_API.
8. IF Tasks_API menerima `POST` request dengan `title` yang kosong atau tidak ada, THEN THE Tasks_API SHALL mengembalikan respons `400 Bad Request` dengan pesan error yang deskriptif.

---

### Requirement 3: Tandai Tugas Selesai / Belum Selesai

**User Story:** Sebagai pengguna, saya ingin mencentang atau menghapus centang pada sebuah tugas, sehingga saya dapat melacak progres pekerjaan saya.

#### Acceptance Criteria

1. THE TaskItem SHALL menampilkan sebuah elemen `<input type="checkbox">` yang statusnya (`checked`) mencerminkan nilai `completed` dari Task tersebut.
2. WHEN pengguna mengklik checkbox pada sebuah TaskItem, THE TaskItem SHALL memanggil Server Action yang mengirim `PATCH` request ke Task_Item_API dengan `id` tugas yang bersangkutan.
3. WHEN Task_Item_API menerima `PATCH` request untuk `id` yang valid, THE Task_Item_API SHALL membalik (toggle) nilai `completed` pada Task tersebut dan mengembalikan respons `200 OK` beserta objek Task yang telah diperbarui.
4. WHEN Task_Item_API berhasil memperbarui Task, THE Task_Board_Client SHALL memperbarui tampilan status checkbox tanpa full page reload.
5. IF Task_Item_API menerima `PATCH` request untuk `id` yang tidak ditemukan, THEN THE Task_Item_API SHALL mengembalikan respons `404 Not Found`.

---

### Requirement 4: Hapus Tugas

**User Story:** Sebagai pengguna, saya ingin menghapus sebuah tugas dari daftar, sehingga saya dapat membersihkan tugas yang sudah tidak relevan.

#### Acceptance Criteria

1. THE TaskItem SHALL menampilkan sebuah tombol hapus (ikon atau teks "Hapus") untuk setiap tugas.
2. WHEN pengguna mengklik tombol hapus pada sebuah TaskItem, THE TaskItem SHALL memanggil Server Action yang mengirim `DELETE` request ke Task_Item_API dengan `id` tugas yang bersangkutan.
3. WHEN Task_Item_API menerima `DELETE` request untuk `id` yang valid, THE Task_Item_API SHALL menghapus Task dari Task_Store dan mengembalikan respons `200 OK`.
4. WHEN Task_Item_API berhasil menghapus Task, THE Task_Board_Client SHALL menghilangkan TaskItem yang bersangkutan dari daftar tanpa full page reload.
5. IF Task_Item_API menerima `DELETE` request untuk `id` yang tidak ditemukan, THEN THE Task_Item_API SHALL mengembalikan respons `404 Not Found`.

---

### Requirement 5: Filter Tugas

**User Story:** Sebagai pengguna, saya ingin memfilter daftar tugas berdasarkan statusnya (All, Active, Completed), sehingga saya dapat fokus pada tugas yang relevan.

#### Acceptance Criteria

1. THE TaskFilter SHALL menampilkan tepat tiga tombol filter: "All", "Active", dan "Completed".
2. WHEN pengguna mengklik tombol "All", THE Task_Board_Client SHALL menampilkan semua Task tanpa terkecuali.
3. WHEN pengguna mengklik tombol "Active", THE Task_Board_Client SHALL menampilkan hanya Task dengan `completed === false`.
4. WHEN pengguna mengklik tombol "Completed", THE Task_Board_Client SHALL menampilkan hanya Task dengan `completed === true`.
5. THE TaskFilter SHALL menandai tombol filter yang sedang aktif secara visual (misalnya dengan style yang berbeda) sehingga pengguna mengetahui filter mana yang sedang diterapkan.
6. WHILE Filter_Mode adalah "all", THE Task_Board_Client SHALL memastikan bahwa jumlah Task yang ditampilkan sama dengan total seluruh Task yang ada.
7. WHILE Filter_Mode adalah "active" atau "completed", THE Task_Board_Client SHALL memastikan bahwa jumlah task pada filter "active" ditambah jumlah task pada filter "completed" sama dengan jumlah task pada filter "all".

---

### Requirement 6: Tampilan Empty State

**User Story:** Sebagai pengguna, saya ingin melihat pesan informatif ketika tidak ada tugas yang sesuai dengan filter aktif, sehingga saya tahu bahwa daftar memang kosong dan bukan error.

#### Acceptance Criteria

1. WHEN Filter_Mode adalah "all" dan tidak ada Task sama sekali, THE Task_Board_Client SHALL menampilkan pesan Empty_State seperti "Belum ada tugas. Tambahkan tugas pertama kamu\!" atau setara.
2. WHEN Filter_Mode adalah "active" dan tidak ada Active_Task, THE Task_Board_Client SHALL menampilkan pesan Empty_State yang spesifik, seperti "Tidak ada tugas aktif."
3. WHEN Filter_Mode adalah "completed" dan tidak ada Completed_Task, THE Task_Board_Client SHALL menampilkan pesan Empty_State yang spesifik, seperti "Belum ada tugas yang selesai."
4. WHEN terdapat setidaknya satu Task yang cocok dengan Filter_Mode yang aktif, THE Task_Board_Client SHALL tidak menampilkan Empty_State.

---

### Requirement 7: API Route — Ambil dan Buat Tugas

**User Story:** Sebagai sistem, saya perlu endpoint API yang andal untuk mengambil semua tugas dan membuat tugas baru, sehingga halaman task list dapat beroperasi.

#### Acceptance Criteria

1. WHEN Tasks_API menerima `GET /api/tasks`, THE Tasks_API SHALL mengembalikan respons `200 OK` dengan array semua objek Task dalam format JSON, diurutkan berdasarkan `createdAt` terbaru di atas.
2. WHEN Tasks_API menerima `GET /api/tasks` pada kondisi Task_Store kosong, THE Tasks_API SHALL mengembalikan respons `200 OK` dengan array kosong (`[]`).
3. WHEN Tasks_API menerima `POST /api/tasks` dengan body JSON `{ "title": string }`, THE Tasks_API SHALL membuat Task baru dengan `id` berupa UUID v4 yang unik, `completed: false`, dan `createdAt` berupa ISO_Date saat ini.
4. THE Tasks_API SHALL memvalidasi bahwa setiap `id` yang dihasilkan oleh `POST /api/tasks` adalah unik di antara seluruh Task yang ada di Task_Store.
5. FOR ALL Task yang dibuat melalui `POST /api/tasks`, melakukan `GET /api/tasks` setelahnya SHALL menghasilkan respons yang mengandung Task tersebut dengan data yang identik (round-trip property).

---

### Requirement 8: API Route — Toggle dan Hapus Tugas per Item

**User Story:** Sebagai sistem, saya perlu endpoint API yang andal untuk mengubah status dan menghapus tugas individual, sehingga interaksi per-item dapat berjalan dengan benar.

#### Acceptance Criteria

1. WHEN Task_Item_API menerima `PATCH /api/tasks/[id]` untuk Task dengan `id` yang ada, THE Task_Item_API SHALL membalik nilai `completed` (dari `false` ke `true` atau sebaliknya) dan mengembalikan `200 OK` dengan objek Task yang diperbarui.
2. FOR ALL Task yang ada, melakukan `PATCH` dua kali berturut-turut pada Task yang sama SHALL menghasilkan nilai `completed` yang sama dengan nilai awal (round-trip / toggle property).
3. WHEN Task_Item_API menerima `DELETE /api/tasks/[id]` untuk Task dengan `id` yang ada, THE Task_Item_API SHALL menghapus Task dari Task_Store dan mengembalikan `200 OK`.
4. WHEN Task_Item_API berhasil menghapus sebuah Task, THE Tasks_API SHALL memastikan bahwa melakukan `GET /api/tasks` setelahnya tidak mengandung Task dengan `id` yang telah dihapus.

---

### Requirement 9: Arsitektur dan Batasan Teknis

**User Story:** Sebagai developer tim, saya ingin fitur task list mengikuti konvensi arsitektur proyek yang telah disepakati, sehingga kode mudah di-review dan tidak menimbulkan konflik merge.

#### Acceptance Criteria

1. THE Task_List_Page SHALL diimplementasikan sebagai async Server Component yang memanggil `GET /api/tasks` pada sisi server saat render awal, sesuai konvensi Next.js 16 App Router.
2. THE TaskForm, TaskItem, dan TaskFilter SHALL masing-masing diimplementasikan sebagai Client Component dengan direktif `'use client'` di bagian atas file.
3. THE Task_List_Page SHALL menggunakan `revalidatePath('/tasks')` di dalam setiap Server Action yang melakukan mutasi data agar data halaman selalu segar setelah perubahan.
4. THE Task_Store SHALL mengimplementasikan fungsi-fungsi: `getTasks(): Task[]`, `addTask(title: string): Task`, `toggleTask(id: string): Task | undefined`, dan `deleteTask(id: string): boolean`.
5. THE Task_Board_Client SHALL tidak menggunakan library state management eksternal; semua state UI dikelola dengan `useState` dan `useActionState` dari React.
6. THE Task_List_Page, TaskItem, TaskForm, TaskFilter, Tasks_API, dan Task_Item_API SHALL menggunakan tipe `Task` dari `types/task.ts` dan tidak menduplikasi definisi tipe tersebut.
7. THE Task_Board_Client SHALL menggunakan kelas Tailwind CSS yang sudah tersedia; tidak ada file CSS global baru yang dibuat untuk fitur ini.
8. THE Task_List_Page SHALL menggunakan layout mobile-first: tampilan optimal pada lebar layar mulai dari `320px`, dengan breakpoint responsif untuk layar yang lebih lebar (`md`, `lg`) menggunakan utility Tailwind CSS.
9. THE Task_Board_Client SHALL tidak memodifikasi file `app/layout.tsx`, `components/Header.tsx`, `app/login/**`, atau `components/LoginForm.tsx`.

---

## Correctness Properties untuk Property-Based Testing

Bagian ini mendokumentasikan properti-properti yang dapat diuji secara otomatis menggunakan library property-based testing (misalnya `fast-check` atau `fc` untuk TypeScript).

### P1 — Round-Trip: Tambah dan Ambil Kembali

**Dasar:** Requirement 7, Acceptance Criteria 5

FOR ALL `title` string yang valid (tidak kosong setelah di-trim), melakukan `addTask(title)` pada Task_Store kemudian memanggil `getTasks()` SHALL menghasilkan array yang mengandung tepat satu Task dengan `title` yang identik dengan input, `completed === false`, dan `createdAt` berformat ISO_Date.

```
∀ title : NonEmptyString →
  let task = addTask(title)
  in task ∈ getTasks()
  ∧ task.title === title
  ∧ task.completed === false
  ∧ isISODate(task.createdAt)
```

### P2 — Invariant: Ukuran List Bertambah Tepat 1

**Dasar:** Requirement 2

FOR ALL kondisi awal Task_Store dengan `n` task, memanggil `addTask(title)` SHALL menghasilkan `getTasks().length === n + 1`.

```
∀ n = getTasks().length →
  addTask(anyValidTitle)
  → getTasks().length === n + 1
```

### P3 — Round-Trip: Toggle Dua Kali Mengembalikan Nilai Awal

**Dasar:** Requirement 8, Acceptance Criteria 2

FOR ALL Task yang ada di Task_Store, memanggil `toggleTask(id)` dua kali berturut-turut SHALL menghasilkan Task dengan nilai `completed` yang sama dengan nilai `completed` sebelum toggle pertama.

```
∀ task ∈ getTasks() →
  let before = task.completed
  toggleTask(task.id)
  toggleTask(task.id)
  → getTaskById(task.id).completed === before
```

### P4 — Metamorphic: Jumlah Active + Completed = Total All

**Dasar:** Requirement 5, Acceptance Criteria 7

FOR ALL kondisi Task_Store dengan sekumpulan task apa pun, jumlah task dengan `completed === false` ditambah jumlah task dengan `completed === true` SHALL selalu sama dengan `getTasks().length`.

```
∀ tasks = getTasks() →
  tasks.filter(t => !t.completed).length
  + tasks.filter(t => t.completed).length
  === tasks.length
```

### P5 — Invariant: Hapus Mengurangi List dan Task Tidak Lagi Ada

**Dasar:** Requirement 4 dan Requirement 8, Acceptance Criteria 4

FOR ALL Task yang ada di Task_Store, memanggil `deleteTask(id)` SHALL menghasilkan `getTasks()` yang tidak lagi mengandung Task dengan `id` tersebut, dan panjang list berkurang tepat 1.

```
∀ task ∈ getTasks(), n = getTasks().length →
  deleteTask(task.id)
  → getTasks().length === n - 1
  ∧ getTasks().every(t => t.id !== task.id)
```

### P6 — Invariant: ID Unik Setelah Banyak Penambahan

**Dasar:** Requirement 7, Acceptance Criteria 4

FOR ALL serangkaian operasi `addTask` dengan jumlah berapa pun, setiap `id` pada hasil `getTasks()` SHALL unik (tidak ada duplikat).

```
∀ sequence of addTask calls →
  let ids = getTasks().map(t => t.id)
  new Set(ids).size === ids.length
```

### P7 — Filter: Konsistensi Subset

**Dasar:** Requirement 5

FOR ALL kondisi Task_Store, filter "active" SHALL menghasilkan subset ketat dari filter "all" yang hanya berisi Task dengan `completed === false`, dan filter "completed" SHALL menghasilkan subset ketat dari filter "all" yang hanya berisi Task dengan `completed === true`.

```
∀ tasks = getTasks() →
  tasks.filter(t => !t.completed).every(t => !t.completed) === true
  ∧ tasks.filter(t => t.completed).every(t => t.completed) === true
```

### P8 — Validasi API: Title Kosong Selalu Ditolak

**Dasar:** Requirement 2, Acceptance Criteria 7 dan 8

FOR ALL string `title` yang kosong atau hanya terdiri dari whitespace, Tasks_API dan TaskForm SHALL menolak request dan tidak menambahkan Task baru ke Task_Store.

```
∀ title : string where title.trim() === "" →
  POST /api/tasks { title } → status 400
  ∧ getTasks().length tidak berubah
```
