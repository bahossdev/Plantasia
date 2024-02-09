import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
// import PlantList from "./PlantList"

const Shop = () => {
  return (
    <div className="container">

      {/* <PlantList/> */}
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Shop;
