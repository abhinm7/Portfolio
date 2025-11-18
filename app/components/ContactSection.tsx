export default function ContactSection() {
  return (
    <section className="py-20 bg-[#0a0a0a] text-white px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Contact
      </h2>

      <div className="text-center space-y-3">
        <p className="text-gray-300 text-lg">📧 abhin18m@gmail.com</p>
        <p className="text-gray-300">🐙 github.com/abhinm7</p>
        <p className="text-gray-300">🔗 linkedin.com/in/abhinm7</p>
      </div>

      <footer className="mt-10 text-center text-gray-500">
        © {new Date().getFullYear()} ABHIN M — All Rights Reserved
      </footer>
    </section>
  );
}
