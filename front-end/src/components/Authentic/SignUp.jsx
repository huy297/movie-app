import { useState } from "react";
import { useModalContext } from "../../context/ModalProvider";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpFailed, setSignUpFailed] = useState(false);
  const {setIsShowing} = useModalContext(); 

  const handleSignUp = async (e) => {
    e.preventDefault();
    const signUpData = {
      username,
      password,
      email
    }
    try  {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(signUpData),
      });
      if (!response.ok) {
        setSignUpFailed(true);
        throw new Error("Login failed");
      }
      setSignUpFailed(false);
      setIsShowing(false);
    }
    catch (error) {
      console.error("Signup failed", error);
    }
  }
  return (
    <div className="w-96 rounded-lg bg-white p-8">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>
      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          className="rounded border border-gray-300 p-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded border border-gray-300 p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border border-gray-300 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        {signUpFailed && (
          <p className="text-red-500 text-sm">Sign Up failed</p>
        )}
        <button type = "submit" className="rounded bg-green-500 p-2 text-white">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
