import { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import Swal from "sweetalert2";
import gif from "../assets/cartoon network bear Sticker - Find & Share on GIPHY.gif";
import poop from "../assets/poop.png";
import drink from "../assets/glassDrink.gif";
import bgMusic from "../assets/music bg.mp3";
import { UserContext } from "../contexts/UserContext";
import { CoordinateContext } from "../contexts/CoordinateContext";
import animateEat from "../helpers/animationEat";
import animatePoop from "../helpers/animationPoop";
import animateDrunk from "../helpers/animationDrunk";
import ReactAudioPlayer from "react-audio-player";

const SOCKET_URL = "https://xazerly.biz.id";
const ANIMATION_DURATION = 4000;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function Games() {
  const { visitorName, sessionId } = useContext(UserContext);
  const { posX, posY, setPosX, setPosY } = useContext(CoordinateContext);
  const [socket, setSocket] = useState(null);
  const [animalState, setAnimalState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(null);

  // Animation queue system
  const animationQueueRef = useRef([]);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef(null);

  // Process the next animation in queue
  const processNextAnimation = () => {
    if (animationQueueRef.current.length === 0) {
      isAnimatingRef.current = false;
      return;
    }

    // Get next animation from queue
    const nextAnimation = animationQueueRef.current.shift();
    isAnimatingRef.current = true;
    setActiveAnimation(nextAnimation);

    // Handle animation based on type
    switch (nextAnimation) {
      case "eat":
        animateEat(setPosX, setPosY);
        break;
      case "drink":
        animateDrunk(setPosX, setPosY);
        break;
      case "clean":
        animatePoop(setPosX);
        break;
      // wash doesn't need position animation
      default:
        break;
    }

    // Set timeout to clear animation
    timeoutRef.current = setTimeout(() => {
      setActiveAnimation(null);
      // Process next animation after current one finishes
      setTimeout(() => {
        processNextAnimation();
      }, 100); // Small delay between animations
    }, ANIMATION_DURATION);
  };

  // Queue a new animation
  const queueAnimation = (animationType) => {
    animationQueueRef.current.push(animationType);

    if (!isAnimatingRef.current) {
      processNextAnimation();
    }
  };

  // Clean up all animations and timeouts
  const cleanupAnimations = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    animationQueueRef.current = [];
    isAnimatingRef.current = false;
    setActiveAnimation(null);
    // Reset positions
    setPosX(340);
    setPosY(200);
  };

  // Socket connection setup
  useEffect(() => {
    if (!visitorName || !sessionId) return;

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected");
      newSocket.emit("join_room", { visitorName, sessionId });
    });

    newSocket.on("animal_state_update", (state) => {
      setAnimalState(state);
      if (!state.isBusy) {
        setIsLoading(false);
      }
    });

    newSocket.on("interaction_failed", (message) => {
      Toast.fire({
        icon: "error",
        title: message,
      });
      setIsLoading(false);
    });

    return () => {
      cleanupAnimations();
      newSocket.close();
    };
  }, [visitorName, sessionId]);

  // Track which animations have played for each state change
  const animatedStatesRef = useRef({
    isHungry: true,
    isThirsty: true,
    isDirty: true,
    hasWaste: true,
  });

  // Handle state changes and trigger animations
  useEffect(() => {
    if (!animalState) return;

    // Helper to check if we need to animate this state change
    const shouldAnimate = (stateKey, currentValue) => {
      if (animatedStatesRef.current[stateKey] !== currentValue) {
        animatedStatesRef.current[stateKey] = currentValue;
        return true;
      }
      return false;
    };

    if (animalState.isHungry === false && shouldAnimate("isHungry", false)) {
      queueAnimation("eat");
    } else if (animalState.isHungry === true) {
      animatedStatesRef.current.isHungry = true;
    }

    if (animalState.isThirsty === false && shouldAnimate("isThirsty", false)) {
      queueAnimation("drink");
    } else if (animalState.isThirsty === true) {
      animatedStatesRef.current.isThirsty = true;
    }

    if (animalState.isDirty === false && shouldAnimate("isDirty", false)) {
      queueAnimation("wash");
    } else if (animalState.isDirty === true) {
      animatedStatesRef.current.isDirty = true;
    }

    if (animalState.hasWaste === false && shouldAnimate("hasWaste", false)) {
      queueAnimation("clean");
    } else if (animalState.hasWaste === true) {
      animatedStatesRef.current.hasWaste = true;
    }
  }, [animalState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupAnimations();
  }, []);

  const handleInteraction = async (action) => {
    if (!socket || animalState.isBusy) {
      Toast.fire({
        icon: "warning",
        title: "Please wait for current action to complete",
      });
      return;
    }

    setIsLoading(true);
    socket.emit("interact_animal", action);
  };

  if (!animalState) return null;

  return (
    <>
      <div className="flex w-[720px] lg:w-full">
        <div className="w-full flex flex-col items-center">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="fixed top-20 right-4 z-50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5CB338]" />
            </div>
          )}

          {/* Animal Status */}
          <div
            className={
              animalState.isBusy ? "text-error" : "text-success-content"
            }
          >
            <p className="text-center font-semibold mt-6 text-2xl mr-20">
              {animalState.isBusy
                ? "I'm Busy !"
                : `Hello ${localStorage.visitorName}`}
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

          {/* Game Area */}
          <div className="flex w-full justify-center gap-4">
            <div className="w-[720px] h-[480px] relative">
              {/* Background */}
              <img
                className="w-[720px] h-[480px] rounded-3xl border-4 shadow-lg absolute"
                style={{ borderColor: "#543A14" }}
                src="https://i.pinimg.com/736x/d4/88/09/d4880923f87cac9cdf44560356f16da1.jpg"
                alt="Scenic Background"
              />

              {/* Poop Animation */}
              {activeAnimation === "clean" && (
                <>
                  <img
                    className="absolute top-[200px] left-[340px] w-28 h-28 rounded-lg"
                    src={poop}
                    alt="poop"
                  />
                  <img
                    className="absolute top-[175px] left-[360px] w-28 h-28 rounded-lg"
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW16Znd2bnFjdWFxcHEyZXc4c2JienZtNXUwZXVwcDdpNDRidDY0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/10U6IGiO7SKcslm7SD/giphy.webp"
                    alt="shovel"
                  />
                </>
              )}

              {/* Bear Character */}
              <div
                className="absolute w-24 h-24 transition-all duration-300"
                style={{ top: posY, left: posX }}
              >
                <img className="absolute rounded-lg" src={gif} alt="Bear" />

                {/* Bath Animation */}
                {activeAnimation === "wash" && (
                  <img
                    className="absolute object-cover size-36 top-[-12px]"
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHk5cW5oc3diMW9jdjBwbnNkbTg5dzRoZzc0YnJ2MjVpN2Q0NHhvcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WZbYGnCm4urcn5LVQD/giphy.webp"
                    alt="bathub"
                  />
                )}
              </div>

              {/* Eat Animation */}
              {activeAnimation === "eat" && posX === 75 && (
                <img
                  className="absolute object-cover size-32 top-[180px]"
                  src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamhpc2Nyc2FwZG9zNWp4MDVsamY2ZXdiMjFya3Vkdms5cmcycjBidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9DlJgNGN0PsKV7Vliw/giphy.webp"
                  alt="chicken"
                />
              )}

              {/* Drink Animation */}
              {activeAnimation === "drink" && posY === 70 && (
                <img
                  className="absolute object-cover size-32 left-[400px]"
                  src={drink}
                  alt="wineGlass"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-6 ml-6 mt-14">
              {[
                { action: "feed", icon: "🍗" },
                { action: "drink", icon: "🥛" },
                { action: "wash", icon: "🧼" },
                { action: "clean", icon: "💩" },
              ].map(({ action, label, icon }) => (
                <button
                  key={action}
                  onClick={() => handleInteraction(action)}
                  disabled={animalState.isBusy}
                  className="size-16 bg-gradient-to-r from-[#3E7B27] to-[#5DB996] hover:from-[#3E7B27] hover:to-[#5DB996] text-white rounded-full shadow-lg flex items-center justify-center transform transition-transform duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="text-4xl ">{icon}</span>
                  <span className="font-semibold text-lg">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="game-container">
            <ReactAudioPlayer
              src={bgMusic}
              autoPlay
              controls
              loop
              volume={0.1} // Atur volume awal
            />
          </div>
        </div>
      </div>
    </>
  );
}
