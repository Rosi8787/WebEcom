"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthData, clearAuthData } from "@/utils/cookies"

export default function AdminDashboard() {
    const router = useRouter()
    const [userName, setUserName] = useState("Admin")

    useEffect(() => {
        const { token, role, userName: name } = getAuthData()
        // Cek jika user belum login atau bukan ADMIN
        if (!token || role !== "ADMIN") {
            router.push("/login")
        } else {
            setUserName(name || "Administrator")
        }
    }, [router])

    const handleLogout = () => {
        clearAuthData()
        router.push("/login")
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
            {/* Navbar */}
            <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900 dark:text-white">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                        M
                    </div>
                    MyBrand<span className="text-blue-600">Store</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        Halo, <span className="text-blue-600 dark:text-blue-400">{userName}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 font-bold text-xs px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/50 transition-colors"
                    >
                        Keluar
                    </button>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Dashboard Utama
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Selamat datang kembali. Berikut adalah ikhtisar performa penjualan toko online Anda hari ini.
                    </p>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 p-4 rounded-xl flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <div>
                        <span className="font-bold">Informasi:</span> Anda saat ini login menggunakan akun <span className="underline font-semibold">dummy Administrator</span>. Semua fitur simulasi berjalan di sisi klien (client-side).
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total Penjualan</span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">Rp 152.480.000</span>
                            <span className="text-xs font-bold text-green-600">+12.4%</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Bulan ini</span>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Pesanan Baru</span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">342 Pesanan</span>
                            <span className="text-xs font-bold text-blue-600">+8.2%</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Hari ini</span>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tingkat Konversi</span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">4.2%</span>
                            <span className="text-xs font-bold text-green-600">+0.5%</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Rata-rata industri 2.5%</span>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Produk Aktif</span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">1.240 Item</span>
                            <span className="text-xs font-bold text-blue-600">Stok Aman</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">15 produk hampir habis</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaksi Terbaru</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Daftar pemesanan produk terbaru dari pembeli</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    <th className="p-4">Pelanggan</th>
                                    <th className="p-4">Produk</th>
                                    <th className="p-4">Total Harga</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                                <tr>
                                    <td className="p-4 font-semibold">Budi Santoso</td>
                                    <td className="p-4">Sepatu Sneakers Running</td>
                                    <td className="p-4">Rp 450.000</td>
                                    <td className="p-4">
                                        <span className="bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold">Diproses</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold">Siti Aminah</td>
                                    <td className="p-4">Kemeja Flanel Oversize</td>
                                    <td className="p-4">Rp 185.000</td>
                                    <td className="p-4">
                                        <span className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full text-xs font-bold">Dikirim</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold">Joko Susilo</td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400">Earphone Wireless TWS</td>
                                    <td className="p-4">Rp 299.000</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-bold">Selesai</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
