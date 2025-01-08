import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  function handleKeluar(e) {
    e.preventDefault();
    Swal.fire({
      title: `Kamu mau pulang ${localStorage.vistorName} ?`,
      text: "Jangan nyesel loh ya !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, mau pulang !"
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
        className="relative navbar bg-accent text-base-100 z-50"
        style={{ backgroundColor: "#6A994E" }}
      >
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <button
            className="btn btn-ghost text-4xl"
            style={{ color: "#F5EFE6" }}
          >
            RAGUNAN ONLINE
          </button>
        </div>
        <div className="navbar-end">
          <button
            onClick={handleKeluar}
            className="btn text-[#6A994E]"
            style={{ backgroundColor: "#F5EFE6" }}
          >
            PULANG
          </button>
        </div>
      </div>
    </>
  );
}
