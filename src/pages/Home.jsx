import Games from "../components/Games";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <div className="h-screen w-screen">
      <div className="w-full h-full bg-[#F5EFE6] fixed -z-10 opacity-70"></div>
      <Navbar />

      <div className="flex overflow-y-auto h-5/6">
        <Chat />
        <Games visitorName={localStorage.visitorName}/>
      </div>
      <Footer />
    </div>
  );
}
