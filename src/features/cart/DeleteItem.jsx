import { useDispatch } from "react-redux"
import Button from "../ui/Button"
import { deleteItem } from "./CartSlice"

function DeleteItem({pizzaId}) {
    const dispatch = useDispatch()
    
    function handleDeleteItem(e){
    e.preventDefault()
    dispatch(deleteItem(pizzaId))
      }
    return (
        <Button type ="small" onclick={handleDeleteItem}>delete</Button>
    )
}

export default DeleteItem
