import { useDispatch } from "react-redux"
import Button from "../ui/Button"
import { decItemQuanty, incItemQuanty } from "./CartSlice"

function UpdateItemQuanty({pizzaId , currentQuanty }) {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-3">
        <Button type= "updatebtn" onclick={() => dispatch(decItemQuanty(pizzaId))}>-</Button>
        <span className="text-sm font-medium">{currentQuanty}</span>
        <Button type= "updatebtn" onclick={() => dispatch(incItemQuanty(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuanty
