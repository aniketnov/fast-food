import { useSelector } from "react-redux";

import { formatCurrency } from "../utilis/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuanty from "./UpdateItemQuanty";
import { getCurrentQuanty } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

const currentQuanty = useSelector(getCurrentQuanty(pizzaId))
 

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuanty pizzaId = {pizzaId} currentQuanty ={currentQuanty}/>
        <DeleteItem pizzaId ={pizzaId} />
       
      
      </div>
    </li>
  );
}

export default CartItem;
