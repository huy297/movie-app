import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [loginPopUp, setLoginPopUp] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setProfileImage(localStorage.getItem("profileImage"));
    }
  }, []);

  const handleLoggout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLoggout,
        profileImage,
        setProfileImage,
        loginPopUp,
        setLoginPopUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
