// File: src/Guest/Components/BrandPartners.jsx
import { FaAmazon, FaEbay, } from "react-icons/fa";
import { SiZalando } from "react-icons/si";
import { SiAlibabadotcom } from "react-icons/si";
import { SiShopee } from "react-icons/si";

export default function BrandPartners() {
  return (
    <div className="bg-black py-6 ">
      <div className="flex justify-center  py-3 items-center space-x-44 object-contain text-white text-8xl">
        <FaAmazon title="Amazon" className="hover:scale-110 transition-transform" />
        <FaEbay title="eBay" className="hover:scale-110 transition-transform" />
        <SiZalando title="Zalando" className="hover:scale-110 transition-transform" />
        <SiAlibabadotcom title="Alibaba" className="hover:scale-110 transition-transform" />
        <SiShopee title="Shoope" className="hover:scale-110 transition-transform" />

        
      </div>
    </div>
  );
}
