import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Kalau ada orang buka URL yang depannya /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Cek apakah dia punya sesi/token (Misalnya nanti lu simpan cookie 'admin_token' pas login)
    // Ini cuma contoh sederhana, bisa disesuaikan dengan sistem login lu nanti
    const isAdmin = request.cookies.get('admin_token')?.value

    if (!isAdmin) {
      // Kalau bukan admin, tendang balik ke halaman login!
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Konfigurasi ini buat ngasih tau Next.js: "Terapin aturan ini cuma buat halaman admin aja"
export const config = {
  matcher: '/admin/:path*',
}