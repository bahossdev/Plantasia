import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import PlantList from "./PlantList"

const Home = () => {
  return (
    <div className="container">
      <PlantList/>
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};


// the providers will eventually be called plantlist, blog, shop, and search 

export default Home;
