import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";
import Button from "./Button";
function Home() {
  const userName = useSelector((state) => state.userName.username)
  return (
    <div className="my-10 sm:my-16 text-center px-4">
      <h1 className="text-center  capitalize text-xl font-semibold m-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ?   <Button to="/menu" type="primary">
          Continue ordering, {userName}
        </Button> : <CreateUser /> }
    
    </div>
  );
}

export default Home;
