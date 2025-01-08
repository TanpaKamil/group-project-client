function animateEat(setPosX, setPosY) {
    function backToIdle() {
      let back = setInterval(() => {
        setPosX((x) => {
          if (x >= 310) {
            clearInterval(back);
            return 340;
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
          console.log(x);
          return x - 10;
        }
      });
    }, 75);
  }
  
  export default animateEat;
  