import { useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";

const Home = () => {
  const { removeToken } = useToken();
  const navigate = useNavigate();
  const handleClick = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Log out{" "}
      </button>
    </div>
  );
};

export default Home;
