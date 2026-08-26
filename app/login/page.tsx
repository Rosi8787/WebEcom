"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { setAuthData } from "@/utils/cookies"
import Image from "next/image"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulasi delay jaringan
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (email === "Admin@gmail.com" && password === "12345") {
            const token = "dummy-jwt-token-12345"
            const role = "ADMIN"
            const userId = "1"
            const userName = "Administrator"

            setAuthData(token, role, userId, userName)
            toast.success(`Selamat Datang, ${userName}!`)
            
            router.push("/admin/dashboard")
        } else {
            toast.error("Email atau kata sandi salah.")
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-slate-950 font-sans overflow-hidden transition-colors duration-300">
            {/* Bagian Kiri - Cover Gambar (Hanya tampil di Desktop/Lg) */}
            <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
                <Image
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
                    alt="MyBrand E-Commerce Cover"
                    fill
                    priority
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 via-transparent to-transparent"></div>

                {/* Teks Promosi */}
                <div className="absolute bottom-16 left-16 right-16 text-white">
                    <div className="w-16 h-1 bg-blue-500 mb-6 rounded-full"></div>
                    <h2 className="text-4xl font-black mb-4 leading-snug tracking-tight">
                        Temukan Produk Terbaik & Penawaran Menarik.
                    </h2>
                    <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
                        Belanja kebutuhan Anda dengan mudah, cepat, dan aman. Nikmati gratis ongkir dan diskon khusus pengguna baru!
                    </p>
                </div>
            </div>

            {/* Bagian Kanan - Form Login */}
            <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 relative overflow-y-auto">
                {/* Tombol Kembali ke Home */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors self-start mb-8 lg:mb-4 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Kembali ke Beranda
                </Link>

                <div className="w-full max-w-md mx-auto my-auto">
                    {/* Logo & Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 font-black text-2xl text-slate-800 dark:text-slate-100 tracking-tight mb-6 transition-colors">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </div>
                            MyBrand<span className="text-blue-600">Store</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 transition-colors">Selamat Datang! 👋</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
                            Silakan masuk ke akun Anda atau <Link href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">daftar baru</Link>.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Input Email */}
                        <div>
                            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block ml-1">Alamat Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Contoh: Admin@gmail.com"
                                className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                            />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 block ml-1">Kata Sandi</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan kata sandi..."
                                    className="w-full pl-5 pr-12 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Lupa Sandi & Ingat Perangkat */}
                        <div className="flex items-center justify-between pt-1 pb-2 text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 dark:bg-slate-900" />
                                <span className="text-slate-500 dark:text-slate-400 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Ingat saya</span>
                            </label>
                            <a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Lupa kata sandi?</a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl text-white font-black tracking-widest uppercase transition-all duration-300 shadow-lg shadow-blue-200
                                ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"}`}
                        >
                            {loading ? "Memproses..." : "Masuk Sekarang"}
                        </button>
                    </form>

                    {/* Footer Terms */}
                    <div className="mt-12 text-center">
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed uppercase tracking-wider">
                            Dilindungi oleh enkripsi aman. <br />
                            <a href="#" className="hover:text-slate-600 hover:underline">Syarat & Ketentuan</a> • <a href="#" className="hover:text-slate-600 hover:underline">Privasi</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
