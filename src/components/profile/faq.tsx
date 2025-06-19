const Faq = () => {
  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4">FAQ’s</h2>
      <ol className="space-y-4 text-sm text-gray-700 list-decimal list-inside">
        <li>
          <p className="font-medium">Apa itu Pawnesia?</p>
          <p>
            Pawnesia adalah platform e-commerce yang menyediakan berbagai
            kebutuhan hewan peliharaan seperti makanan, perlengkapan grooming,
            mainan, vitamin, dan aksesoris – semua dalam satu tempat.
          </p>
        </li>
        <li>
          <p className="font-medium">
            Produk hewan apa saja yang tersedia di Pawnesia?
          </p>
          <p>
            Sama seperti poin pertama: makanan, perlengkapan grooming, mainan,
            vitamin, dan aksesoris.
          </p>
        </li>
        <li>
          <p className="font-medium">Berapa lama waktu pengiriman?</p>
          <ul className="list-disc list-inside ml-4">
            <li>Jabodetabek: 1–3 hari kerja</li>
            <li>Luar kota: 2–5 hari kerja</li>
          </ul>
        </li>
      </ol>
    </section>
  );
};
export default Faq;
