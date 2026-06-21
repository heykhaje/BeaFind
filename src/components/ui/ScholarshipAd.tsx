import { MaterialIcon } from "./MaterialIcon";

export function ScholarshipAd() {
  return (
    <div className="card-shadow flex flex-col items-center justify-center rounded-xl border-4 border-black bg-secondary p-6 text-center text-on-secondary dark:border-white">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white text-secondary">
        <MaterialIcon name="school" className="text-3xl" />
      </div>
      <h3 className="mb-2 text-xl font-black uppercase">Iklan Beasiswa</h3>
      <p className="mb-4 text-sm font-medium">
        Temukan ratusan beasiswa unggulan lainnya dari berbagai negara. Jangan lewatkan kesempatan emas ini!
      </p>
      <button className="card-hover w-full rounded-lg border-2 border-black bg-white py-2 font-bold text-black transition-colors hover:bg-gray-100">
        Lihat Selengkapnya
      </button>
    </div>
  );
}

