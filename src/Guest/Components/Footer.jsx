export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-50 grid md:grid-cols-3 gap-6">
      
      <div>
        <h3 className="text-lg font-bold mr-20 mb-2">Slick</h3>
        <p className="text-sm text-gray-400  mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <div className="flex space-x-4">
          <span>📘</span>
          <span>📷</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg px-20 ml-10 font-bold mb-2">Subscribe to our news letter</h3>
        <input type="email" placeholder="Enter Email..." className=" px-20 ml-10 py-2 w-full rounded" />
      </div>
      <div>
        <h3 className="text-lg px-25 font-bold mb-2">Quick Links</h3>
        <ul className="space-y-2 px-25 text-sm text-gray-400">
          <li>Home</li>
          <li>Shop</li>
          <li>Collection</li>
          <li>Contact</li>
          <li>Privacy</li>
        </ul>
      </div>
    </footer>
  );
}