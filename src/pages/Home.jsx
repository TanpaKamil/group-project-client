import Games from "../Components/Games";
import Chat from "../Components/Chat";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";



export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex overflow-y-auto h-5/6">
        <Chat />
        <Games />
      </div>
        <Footer />
    </div>
  );
}
