let poopAnimationInProgress = false;

export default function animatePoop(setPosX) {
  if (poopAnimationInProgress) return;
  poopAnimationInProgress = true;

  // Store original position
  let originalX = 340;

  function backToIdle() {
    let back = setInterval(() => {
      setPosX((x) => {
        if (x >= originalX) {
          clearInterval(back);
          poopAnimationInProgress = false;
          return originalX;
        } else {
          return x + 10;
        }
      });
    }, 50);
  }

  let id = setInterval(() => {
    setPosX((x) => {
      if (x <= 200) {
        clearInterval(id);
        setTimeout(backToIdle, 3500);
        return 200;
      } else {
        return x - 10;
      }
    });
  }, 50);
}