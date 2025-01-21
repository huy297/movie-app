import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();
  const [activeTabTopTrendingId, setActiveTabTopTrendingId] = useState();
  const [activeTabTopRatedId, setActiveTabTopRatedId] = useState();
  //const navigate = useNavigate();

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isShowing]);

  const openPopUp = (content) => {
    setContent(content);
    setIsShowing(true);
  };
  return (
    <ModalContext.Provider
      value={{
        openPopUp,
        activeTabTopTrendingId,
        setActiveTabTopTrendingId,
        activeTabTopRatedId,
        setActiveTabTopRatedId,
        setIsShowing,
      }}
    >
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => {
              setIsShowing(false);
            }}
          >
            <div onClick={(e) => e.stopPropagation()}> 
              {content}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
