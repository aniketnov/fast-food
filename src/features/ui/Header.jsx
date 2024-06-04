import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import UserName from "../user/UserName";

function Header() {
  return (
    <header className="font-sans bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200 sm:px-8 flex items-center justify-between ">
      <Link to="/" className="tracking-widest">
        Fast-food Pizza
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
