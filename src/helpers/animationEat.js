let eatAnimationInProgress = false;

export default function animateEat(setPosX, setPosY) {
  if (eatAnimationInProgress) return;
  eatAnimationInProgress = true;

  // Store original position
  let originalX = 340;
  
  function backToIdle() {
    let back = setInterval(() => {
      setPosX((x) => {
        if (x >= originalX) {
          clearInterval(back);
          eatAnimationInProgress = false;
          return originalX;
        } else {
          return x + 10;
        }
      });
    }, 75);
  }

  let id = setInterval(() => {
    setPosX((x) => {
      if (x <= 75) {
        clearInterval(id);
        setTimeout(backToIdle, 3200);
        return 75;
      } else {
        return x - 10;
      }
    });
  }, 75);
}
