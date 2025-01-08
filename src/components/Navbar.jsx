import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  function handleKeluar(e) {
    e.preventDefault();
    Swal.fire({

      title: `Kamu mau pulang ${localStorage.visitorName} ?`,
      text: "Jangan nyesel loh ya !",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, mau pulang!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Hati-hati dijalan ${localStorage.vistorName}`,
          icon: "success"
        });
        localStorage.clear();
        navigate("/login");
      }
    });
  }

  return (
    <>
      <div
        className="relative navbar text-base-100 z-50 shadow-lg"
        style={{
          background: "linear-gradient(90deg, #3E7B27, #5FAF40)",
          color: "#F5EFE6",
        }}
      >
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <button
            className="btn btn-ghost text-4xl font-bold tracking-wide"
            style={{
              color: "#F5EFE6",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            RAGUNAN ONLINE
          </button>
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
            PULANG
          </button>
        </div>
      </div>
    </>
  );
}
