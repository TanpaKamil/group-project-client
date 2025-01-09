import { useNavigate } from "react-router";
import { useContext } from "react";
import Swal from "sweetalert2";
import logo from "../assets/home logo.png";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { visitorName, clearSession } = useContext(UserContext);

  function handleKeluar(e) {
    e.preventDefault();
    Swal.fire({
      title: `Are you sure ${visitorName}?`,
      text: "Don't regret it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i wanna go home!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `See you ${visitorName}`,
          icon: "success"
        });
        clearSession();
        navigate("/login");
      }
    });
  }

  return (
    <div
      className="relative navbar text-base-100 z-50 shadow-lg"
      style={{
        background: "linear-gradient(90deg, #16C47F, #5DB996)",
        color: "#F5EFE6",
      }}
    >
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <img className="w-96" src={logo} alt="Logo" />
      </div>
      <div className="navbar-end">
        <button
          onClick={handleKeluar}
          className="btn px-6 py-2 font-semibold transition-all duration-300 text-[#3E7B27] hover:text-white hover:bg-[#3E7B27] rounded-lg shadow-md"
          style={{
            backgroundColor: "#F5EFE6",
            border: "2px solid #3E7B27",
          }}
        >
          GO HOME
        </button>
      </div>
    </div>
  );
}