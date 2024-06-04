import { formatCurrency } from "../utilis/helpers";
import Button from "../ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuanty } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuanty from "../cart/UpdateItemQuanty";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuanty = useSelector(getCurrentQuanty(id))

  const isInCart = currentQuanty > 0

 const dispatch = useDispatch()
function handleAddtoCart(){
  const newItem = {
    pizzaId: id,
    name,
    quantity: 1,
    unitPrice,
    totalPrice: unitPrice * 1,
  }
  dispatch(addItem(newItem))

}

  return (
    <li className="flex gap-4 py-2 ">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}/>
      <div className="flex flex-col flex-grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex justify-between items-center">
         
          {!soldOut ? (<p className="text-sm">{formatCurrency(unitPrice)}</p>) : (<p className="text-sm uppercase font-medium text-stone-500">Sold out</p>)}
        { isInCart && <div className="flex items-center gap-3 sm:gap-8">
          <UpdateItemQuanty pizzaId={id} currentQuanty = {currentQuanty}/>
          <DeleteItem pizzaId={id}/>
        </div> }
        { !soldOut && !isInCart && <Button type = "small" onclick={handleAddtoCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
