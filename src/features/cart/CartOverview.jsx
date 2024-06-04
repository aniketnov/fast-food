import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilis/helpers";
import {  getTotalCartQuanty, getTotalPrice } from "./CartSlice";


function CartOverview() {
  const totalcartQuantity = useSelector(getTotalCartQuanty)
  const totalcartPrice= useSelector(getTotalPrice)
  if(!totalcartQuantity) return null
  return (
    <div className="bg-stone-900 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6 ">
        <span>{totalcartQuantity} pizzas</span>
        <span>{formatCurrency (totalcartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
  
export default CartOverview;
