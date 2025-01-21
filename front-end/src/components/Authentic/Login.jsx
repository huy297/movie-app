import { useState } from "react";
import { useModalContext } from "../../context/ModalProvider";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const {setIsShowing} = useModalContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = btoa(`${username}:${password}`);

    try {
      const response  = await fetch ("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`
        },
      });
      if (!response.ok) {
        setLoginFailed(true);
        throw new Error("Login failed");
      }
      setLoginFailed(false);
      setIsShowing(false);
      const data = await response.json();
      console.log("Login Succesful:", data);
    }
    catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="w-96 rounded-lg bg-white p-8" 
      >
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <form className="mt-4 flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="rounded border border-gray-300 p-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border border-gray-300 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginFailed && (
          <p className="text-red-500 text-sm">Login failed</p>
        )}
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
