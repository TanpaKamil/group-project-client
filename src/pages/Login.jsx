import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import text from "../assets/Ragunan_Online-removebg-preview.png";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { visitorName, setVisitorName, setSessionId } = useContext(UserContext);

  useEffect(() => {
    // Check if user is already logged in
    if (visitorName) {
      navigate("/");
    }
  }, [visitorName, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a username',
        icon: 'error',
      });
      return;
    }

    // Generate a new session ID
    const newSessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    // Update context (which will also update localStorage)
    setVisitorName(trimmedUsername);
    setSessionId(newSessionId);

    Swal.fire({
      title: `Selamat Datang ${trimmedUsername}`,
      icon: "success",
    });

    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFE6] p-6">
      <img className="mb-5" src={text} alt="Logo" />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <p className="text-[#A5A58D] text-center mb-6">
          Please enter your username
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full rounded-lg border border-[#A5A58D] p-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6A994E] focus:border-[#6A994E] transition"
              placeholder="Username"
              value={username}
              autoFocus
              maxLength={20}
              required
            />
            <span className="absolute inset-y-0 right-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#A5A58D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#6A994E] px-6 py-3 text-lg font-medium text-white shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            disabled={!username.trim()}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}