let drinkAnimationInProgress = false;

export default function animateDrunk(setPosX, setPosY) {
  if (drinkAnimationInProgress) return;
  drinkAnimationInProgress = true;

  // Store original position
  let originalY = 180;

  function backToIdle() {
    let back = setInterval(() => {
      setPosY((y) => {
        if (y >= originalY) {
          clearInterval(back);
          drinkAnimationInProgress = false;
          return originalY;
        } else {
          return y + 10;
        }
      });
    }, 75);
  }

  let id = setInterval(() => {
    setPosY((y) => {
      if (y <= 70) {
        clearInterval(id);
        setTimeout(backToIdle, 3200);
        return 70;
      } else {
        return y - 10;
      }
    });
  }, 75);
}