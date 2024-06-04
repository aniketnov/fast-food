import { useSelector } from "react-redux";

function UseName() {
const userName = useSelector((state) => state.userName.username)

  return (
    <div className="text-sm font-semibold capitalize hidden md:block">
      {userName}
    </div>
  );
}

export default UseName;
