export default function Testimonial() {
  const testimonials = [
    {
      name: 'Owi Sigma',
      rating: 4,
      comment: 'We walk the talk no onle talk to talk .'
    },
    {
      name: 'Meythli Odex',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ];

  return (
    <section className="py-16 px-10 bg-gray-100">
      <div className="flex items-center justify-center my-10">
  <span className="w-10 h-px mt-20 bg-black mr-4"></span>
  <h2 className="text-2xl font-bold mt-20">Client Testimonial</h2>
  <span className="w-10 h-px mt-20 bg-black ml-4"></span>
</div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded shadow text-center">
            <img
              src="/img/profile.jpg"
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="font-bold">{t.name}</h3>
            <div className="text-yellow-500 text-lg">{'★'.repeat(t.rating)}</div>
            <p className="text-sm text-gray-600 mt-2">{t.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
