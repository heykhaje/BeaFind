'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addUser(formData: FormData) {
  // 1. Tambahkan tangkapan untuk password di sini
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string 

  // 2. Masukkan password ke dalam data Prisma
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password, // <-- Tambahkan baris ini
    },
  })

  revalidatePath('/')
}