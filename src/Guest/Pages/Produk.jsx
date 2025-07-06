import React, { useEffect, useState } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Checkbox } from "../Components/Checkbox";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { ProdukAPI } from "../../services/ProdukAPI";

const tabs = ["NEW", "BEST SELLERS"];

const priceRanges = [
  { label: "500rb - 800rb", min: 500000, max: 800000 },
  { label: "800rb - 1,1jt", min: 800000, max: 1100000 },
  { label: "1,1jt - 1,4jt", min: 1100000, max: 1400000 },
  { label: "1,4jt - 1,7jt", min: 1400000, max: 1700000 },
  { label: "1,7jt - 2jt", min: 1700000, max: 2000000 },
];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [brandOpen, setBrandOpen] = useState(true);
  const [genderOpen, setGenderOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const [filters, setFilters] = useState({
    brand: [],
    gender: [],
    ukuran: [],
    harga: [],
  });

  useEffect(() => {
    ProdukAPI.fetchAll().then((data) => {
      setProducts(data);
      setFiltered(data);

      const brandSet = [...new Set(data.map((p) => p.brand))];
      const genderSet = [...new Set(data.map((p) => p.gender))];
      const sizeSet = [
        ...new Set(
          data.flatMap((p) => p.ukuran.split(",").map((u) => u.trim()))
        ),
      ];

      setBrands(brandSet);
      setGenders(genderSet);
      setSizes(sizeSet);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }
    if (filters.gender.length > 0) {
      result = result.filter((p) => filters.gender.includes(p.gender));
    }
    if (filters.ukuran.length > 0) {
      result = result.filter((p) =>
        p.ukuran.split(",").some((u) => filters.ukuran.includes(u.trim()))
      );
    }
    if (filters.harga.length > 0) {
      result = result.filter((p) => {
        const harga = parseInt(p.harga);
        return filters.harga.some((r) => harga >= r.min && harga <= r.max);
      });
    }

    setFiltered(result);
  }, [filters, products]);

  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].some((item) =>
        type === "harga" ? item.label === value.label : item === value
      );
      const updated = exists
        ? prev[type].filter((item) =>
            type === "harga" ? item.label !== value.label : item !== value
          )
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="bg-base-200 pt-24 font-poppins min-h-screen">
      <Navbar />
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-2 p-6 border-r bg-white min-h-screen">
          <h2 className="font-bold mb-6 text-lg">Filters</h2>

          {/* Brand */}
          <div className="mb-6">
            <div
              className="flex justify-between font-semibold cursor-pointer mb-2"
              onClick={() => setBrandOpen(!brandOpen)}
            >
              <span>Brand</span>
              {brandOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {brandOpen &&
              brands.map((brand) => (
                <div className="flex items-center space-x-2" key={brand}>
                  <Checkbox
                    id={`brand-${brand}`}
                    onChange={() => handleCheckbox("brand", brand)}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
          </div>

          {/* Gender */}
          <div className="mb-6">
            <div
              className="flex justify-between font-semibold cursor-pointer mb-2"
              onClick={() => setGenderOpen(!genderOpen)}
            >
              <span>Gender</span>
              {genderOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {genderOpen &&
              genders.map((gender) => (
                <div className="flex items-center space-x-2" key={gender}>
                  <Checkbox
                    id={`gender-${gender}`}
                    onChange={() => handleCheckbox("gender", gender)}
                  />
                  <label htmlFor={`gender-${gender}`} className="text-sm">
                    {gender}
                  </label>
                </div>
              ))}
          </div>

          {/* Ukuran */}
          <div className="mb-6">
            <div
              className="flex justify-between font-semibold cursor-pointer mb-2"
              onClick={() => setSizeOpen(!sizeOpen)}
            >
              <span>Ukuran</span>
              {sizeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {sizeOpen &&
              sizes.map((size) => (
                <div className="flex items-center space-x-2" key={size}>
                  <Checkbox
                    id={`ukuran-${size}`}
                    onChange={() => handleCheckbox("ukuran", size)}
                  />
                  <label htmlFor={`ukuran-${size}`} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
          </div>

          {/* Harga */}
          <div className="mb-6">
            <div
              className="flex justify-between font-semibold cursor-pointer mb-2"
              onClick={() => setPriceOpen(!priceOpen)}
            >
              <span>Harga</span>
              {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {priceOpen &&
              priceRanges.map((range) => (
                <div className="flex items-center space-x-2" key={range.label}>
                  <Checkbox
                    id={`harga-${range.label}`}
                    onChange={() => handleCheckbox("harga", range)}
                  />
                  <label htmlFor={`harga-${range.label}`} className="text-sm">
                    {range.label}
                  </label>
                </div>
              ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-10 px-8 py-6">
          <h1 className="text-3xl font-bold mb-4">PRODUK</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Card key={product.id} to={`/produk/${product.id}`}>
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-72 object-contain p-4"
                />
                <CardContent>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="text-lg font-semibold">{product.nama}</h3>
                  <p className="text-right font-bold">
                    Rp {parseInt(product.harga).toLocaleString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Produk tidak ditemukan
              </p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
