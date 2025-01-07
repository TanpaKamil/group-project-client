import gif from "../assets/cartoon network bear Sticker - Find & Share on GIPHY.gif";
import poop from "../assets/poop.png";

export default function Games() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="bg-black" style={{ width: "256px" }}>
        ini chat!
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ backgroundColor: "#D4F6FF" }}
      >
        <div className="relative">
          <p className="text-center font-semibold mb-10">Animal is busy!</p>

          {/* Status Indicators */}
          <div className="grid grid-cols-4 gap-2 absolute top-4 left-4 mt-5">
            <p className="font-bold">🔴 Hungry</p>
            <p className="font-bold">🔴 Thirsty</p>
            <p className="font-bold">🔴 Dirty</p>
            <p className="font-bold">🔴 hasWaste</p>
          </div>

          {/* Scenic Background Image */}
          <img
            className="w-[720px] h-[480px] rounded-3xl border-4 shadow-lg"
            style={{ borderColor: "#543A14" }}
            src="https://i.pinimg.com/736x/0a/46/83/0a4683bcffa5dcafb5f4193de381c32a.jpg"
            alt="Scenic Background"
          />

          {/* Animated GIF */}
          <img
            className="absolute top-0 left-0 w-28 h-36 ml-56 mt-44 rounded-lg"
            src={gif}
            alt="Bear GIF"
          />
          <img
            className="absolute top-0 left-0 w-28 h-36  mt-44 rounded-lg"
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamhpc2Nyc2FwZG9zNWp4MDVsamY2ZXdiMjFya3Vkdms5cmcycjBidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9DlJgNGN0PsKV7Vliw/giphy.webp"
            alt="chicken"
          />

          <img
            className="absolute top-0 left-0 w-28 h-28 mt-5 ml-72 rounded-lg"
            src={poop}
            alt="poop"
          />
          <img
            className="absolute top-0 left-0 w-28 h-28 ml-80 rounded-lg"
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW16Znd2bnFjdWFxcHEyZXc4c2JienZtNXUwZXVwcDdpNDRidDY0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/10U6IGiO7SKcslm7SD/giphy.webp"
            alt="shovel"
          />
          <img
            className="absolute top-0 left-0 w-28 h-28 rounded-lg"
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHk5cW5oc3diMW9jdjBwbnNkbTg5dzRoZzc0YnJ2MjVpN2Q0NHhvcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WZbYGnCm4urcn5LVQD/giphy.webp"
            alt="bathub"
          />

          {/* Buttons */}
          <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 flex flex-col space-y-4">
            <button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
              🍗
            </button>
            <button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
              🥛
            </button>
            <button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
              🧼
            </button>
            <button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
              💩
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
