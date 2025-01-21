import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useModalContext } from "../context/ModalProvider";
import Login from "./Authentic/Login";
import SignUp from "./Authentic/SignUp";

const Header = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const { openPopUp } = useModalContext();
  return (
    <div>
      <header className="flex h-14 items-center justify-between bg-slate-950 px-8 text-white lg:h-20">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/">
            <img src="/netflix.png" className="w-16 sm:w-28" />
          </Link>
          <Link to="/search?mediaType=movie" className="lg:text-xl">
            Movie
          </Link>
          <Link to="/search?mediaType=tv" className="lg:text-xl">
            TV Show
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="cursor-pointer"
            />
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button
                onClick={() => {
                  openPopUp(<Login />);
                }}
              >
                Login
              </button>
              <button onClick={() => {
                  openPopUp(<SignUp />);
                }}>Sign Up</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
