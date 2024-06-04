import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";
import {  useDispatch, useSelector } from "react-redux";
import { clearCart, getCartDetails, getTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import { formatCurrency } from "../utilis/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigationSubmit = useNavigation();
  const formError = useActionData();
 const dispatch =  useDispatch()

  const submitLoading = navigationSubmit.state === "submitting";
  const {username , status : addressstatus ,position ,address, error: errorAddress}  = useSelector((state) => state.userName)
  const cart = useSelector(getCartDetails);
  const totalCartPrice = useSelector(getTotalPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.20 : 0
  const totalPrice = totalCartPrice + priorityPrice

  const isLoadingAddress = addressstatus === "loading"

 if(!cart.length) return <EmptyCart/>

  return (
    <div>
      <h2 className="px-6 py-6 font-semibold">Ready to order? Let's go!</h2>
  

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required  />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled = {isLoadingAddress}
              defaultValue={address}
              required
            />
          </div>
          {!position.latitude && !position.longitude &&   <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
          <button className="bg-yellow-400 uppercase font-semibold text-stone-800 tracking-widest rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 sm:px-5 sm:py-2.5 text-xs" disabled ={isLoadingAddress} type= "small" onClick={(e) => {
            e.preventDefault();
            dispatch(fetchAddress())
          }}>get location</button>
          </span>}
       
          {addressstatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
        </div>
        

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude} , ${position.longitude}` : ""} />
          <Button disabled={submitLoading || isLoadingAddress} type="primary">
            {submitLoading ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const fromData = await request.formData();
  const data = Object.fromEntries(fromData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // console.log(order)

  const error = {};
  if (!isValidPhone(order.phone))
    error.phone = "please type valid phone Number";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
  // return null

}

export default CreateOrder;
