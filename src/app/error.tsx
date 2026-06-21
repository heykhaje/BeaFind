"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-headline-md font-bold">Terjadi Kesalahan</h2>
      <p className="mb-6 text-body-md text-on-surface-variant">
        Maaf, terjadi masalah saat memuat halaman. Silakan coba lagi.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 text-on-primary transition-all hover:opacity-90"
      >
        Coba Lagi
      </button>
    </div>
  );
}

