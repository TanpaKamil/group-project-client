import gif from "../assets/cartoon network bear Sticker - Find & Share on GIPHY.gif";
import poop from "../assets/poop.png";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import animateEat from "../helpers/animationEat";
import animatePoop from "../helpers/animationPoop";

const SOCKET_URL = "http://localhost:3000";

export default function Games({ visitorName }) {
  const [socket, setSocket] = useState(null);
  const [animalState, setAnimalState] = useState({});
  const [visitors, setVisitors] = useState([]);
  const [interactionError, setInteractionError] = useState("");
  const [posX, setPosX] = useState(340);
  const [posY, setPosY] = useState(180);
  const [wash, setWash] = useState("");
  const [clean, setClean] = useState("");

  // Connect to socket when component mounts
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on("animal_state_update", (state) => {
      setAnimalState(state);
    });

    newSocket.on("interaction_failed", (message) => {
      setInteractionError(message);
      // Clear error after 2 seconds
      setTimeout(() => setInteractionError(""), 2000);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [visitorName]);

  // Handle animal interactions
  const handleInteraction = (action) => {
    socket?.emit("interact_animal", action);

    // if (action === "feed") {
    //   animateEat(setPosX, setPosY);
    // }

    // if (action === "feed") {
    //   animateEat(setPosX, setPosY);
    // }

    // if (action === "wash") {
    //   setWash("wash");
    //   setTimeout(() => {
    //     setWash("");
    //   }, 4000);
    // }

    // if (action === "clean") {
    //     setClean("clean");
    //   animatePoop(setPosX);

    //   setTimeout(() => {
    //     setClean("");
    //   }, 4000);
    // }
  };

  useEffect(() => {
    if (animalState.isHungry === false) {
      animateEat(setPosX, setPosY);
    }
  }, [animalState.isHungry]);

  useEffect(() => {
    if (animalState.isDirty === false) {
      setWash("wash");
      setTimeout(() => {
        setWash("");
      }, 4000);
    }
  }, [animalState.isDirty]);

  useEffect(() => {
    if (animalState.hasWaste === false) {
      setClean("clean");
      animatePoop(setPosX);
      setTimeout(() => {
        setClean("");
      }, 4000);
    }
  }, [animalState.hasWaste]);

  if (!animalState) return <div>Loading...</div>;

  return (
    <>
    <div className="flex w-[720px] lg:w-full">
      {/* Main Content */}
      <div
        className="w-full flex flex-col items-center "
        // style={{ backgroundColor: "#F5EFE6" }}
      >
      
        {/* <div className="relative"> */}
        {/* Animal Activity Status */}
        <div
          className={animalState.isBusy ? "text-error" : "text-success-content"}
        >
          <p className="text-center font-semibold mt-6 text-xl mr-20">
            {animalState.isBusy ? "Animal is busy" : "Animal Status"}
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center gap-10 my-5 mr-20">
          <p className="font-bold text-base-content">
            {animalState.isHungry ? "🔴" : "🟢"}{" "}
            <span className="ml-2">Hungry</span>
          </p>
          <p className="font-bold text-base-content">
            {animalState.isThirsty ? "🔴" : "🟢"}{" "}
            <span className="ml-2">Thirsty</span>
          </p>
          <p className="font-bold text-base-content">
            {animalState.isDirty ? "🔴" : "🟢"}{" "}
            <span className="ml-2">Dirty</span>
          </p>
          <p className="font-bold text-base-content">
            {animalState.hasWaste ? "🔴" : "🟢"}{" "}
            <span className="ml-2">hasWaste</span>
          </p>
        </div>

        <div className="flex w-full justify-center gap-4">
          <div className="w-[720px] h-[480px] relative">
            {/* Scenic Background Image */}
            <img
              className="w-[720px] h-[480px] rounded-3xl border-4 shadow-lg absolute"
              style={{ borderColor: "#543A14" }}
              src="https://i.pinimg.com/736x/0a/46/83/0a4683bcffa5dcafb5f4193de381c32a.jpg"
              alt="Scenic Background"
            />

            <div className={clean === "clean" ? "" : "hidden"}>
              <img
                className="absolute top-[200px] left-[340px] w-28 h-28 rounded-lg"
                src={poop}
                alt="poop"
              />
            </div>

            {/* Clean Poop Anim*/}
            <div className={clean === "clean" ? "" : "hidden"}>
              <img
                className="absolute top-[175px] left-[360px] w-28 h-28 rounded-lg"
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW16Znd2bnFjdWFxcHEyZXc4c2JienZtNXUwZXVwcDdpNDRidDY0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/10U6IGiO7SKcslm7SD/giphy.webp"
                alt="shovel"
              />
            </div>

            {/* Character Animated GIF */}
            <div
              className="absolute w-24 h-24"
              style={{ top: posY, left: posX }}
            >
              <img className="absolute rounded-lg" src={gif} alt="Bear GIF" />

              {/* Bath */}
              <div className={wash === "wash" ? "" : "hidden"}>
                <img
                  className="absolute object-cover size-36 top-[-12px]"
                  src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHk5cW5oc3diMW9jdjBwbnNkbTg5dzRoZzc0YnJ2MjVpN2Q0NHhvcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WZbYGnCm4urcn5LVQD/giphy.webp"
                  alt="bathub"
                />
              </div>
            </div>

            {/* Eat */}
            <div className={posX === 75 ? "" : "hidden"}>
              <img
                className="absolute object-cover size-32 top-[180px]"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamhpc2Nyc2FwZG9zNWp4MDVsamY2ZXdiMjFya3Vkdms5cmcycjBidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9DlJgNGN0PsKV7Vliw/giphy.webp"
                alt="chicken"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-6 ml-4">
            <button
              onClick={() => handleInteraction("feed")}
              disabled={animalState.isBusy ? "disabled" : ""}
              className="size-16 bg-neutral hover:bg-warning text-white rounded-full shadow-lg flex items-center justify-center"
            >
              🍗
            </button>
            <button
              onClick={() => handleInteraction("drink")}
              disabled={animalState.isBusy ? "disable" : ""}
              className="size-16 bg-neutral hover:bg-warning text-white rounded-full shadow-lg flex items-center justify-center"
            >
              🥛
            </button>
            <button
              onClick={() => handleInteraction("wash")}
              disabled={animalState.isBusy ? "disabled" : ""}
              className="size-16 bg-neutral hover:bg-warning text-white rounded-full shadow-lg flex items-center justify-center"
            >
              🧼
            </button>
            <button
              onClick={() => handleInteraction("clean")}
              disabled={animalState.isBusy ? "disabled" : ""}
              className="size-16 bg-neutral hover:bg-warning text-white rounded-full shadow-lg flex items-center justify-center"
            >
              💩
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
