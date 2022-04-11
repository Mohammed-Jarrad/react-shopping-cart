import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import Filter from "../../components/Filter/Filter";
import ProductModal from "../../components/Products/ProductModal";
import Products from "../../components/Products/Products";
import { GetRequest } from "../../utils/requests";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsClone, setProductsClone] = useState([]);
  const [sort, setSort] = useState("");
  const [size, setSize] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [singleProduct, setSingleProduct] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState('');

  //!getProductsAndCategories
  async function getProductsAndCategories() {
    try {
      //get all products
      const resProducts = await GetRequest('/products');
      const dataProducts = await resProducts.json();
      console.log("data for products", dataProducts);
      //get all categories
      const resCategories = await GetRequest('/categories');
      const dataCategories = await resCategories.json();
      console.log("data for Categories", dataCategories);
      setCategories(dataCategories.categories);

      if (dataProducts.products) {
        setProducts(dataProducts.products);
        setProductsClone(dataProducts.products);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(dataProducts.errors);
      }

    } catch (e) {
      console.log(e);
      setLoading(false);
    }

  };

  useEffect(() => {
    getProductsAndCategories();
  }, []);

  const closeModal = () => {
    setSingleProduct(false);
    setIsOpen(false);
  };

  const showProduct = (singleProduct) => {
    setSingleProduct(singleProduct);
    setIsOpen(true);
  };

  const addToCart = (singleProduct) => {
    const cartClone = [...cart];
    let productExist = false;
    cartClone.forEach(element => {
      if (element._id === singleProduct._id) {
        productExist = true;
        element.qty += 1;
      }
    });
    if (!productExist) {
      cartClone.push({ ...singleProduct, qty: 1 });
    }
    setCart(cartClone);
  };

  const handleFilterBySize = (e) => {
    setSize(e.target.value);
    if (e.target.value === "ALL") {
      getProductsAndCategories();
    } else {
      const newProducts = productsClone.filter((p) =>
        p.sizes.includes(e.target.value)
      );
      newProducts.length
        ? setProducts(newProducts)
        : setProducts(`NO ITEM TO SHOW WITH [${e.target.value}]`);
    }
  };

  const handleFilterBySort = (e) => {
    const order = e.target.value;
    setSort(order);
    const productsCLone = products.sort((current, next) => {
      if (order === "lowest") {
        return current.price - next.price;
      } else if (order === "highest") {
        return next.price - current.price;
      } else if (order === "ALL") {
        return current._id < next._id ? -1 : 1;
      } else {
        return current._id > next._id ? -1 : 1;
      }
    });
    setProducts(productsCLone);
  };

  const handleFilterByCategory = (e) => {
    // e.currentTarget.classList.toggle('active');

  }

  return (
    <main>
      <div className="container">
        <Products
          products={products}
          addToCart={addToCart}
          showProduct={showProduct}
          loading={loading}
          setLoading={setLoading}
          categories={categories}
          setProducts={setProducts}
          setCart={setCart}
        />
        <Filter
          handleFilterBySize={handleFilterBySize}
          handleFilterBySort={handleFilterBySort}
          size={size}
          sort={sort}
          products={products}
          loading={loading}
          categories={categories}
          handleFilterByCategory={handleFilterByCategory}
        />
      </div>
      <button className="create-product-btn">
        <NavLink to={`/create-product`}>Create New Product</NavLink>
      </button>
      <Cart
        cart={cart}
        setCart={setCart}
        showProduct={showProduct}
        products={products}
      />
      <ProductModal
        isOpen={isOpen}
        singleProduct={singleProduct}
        closeModal={closeModal}
      />
    </main>
  );
};

export default Home;
