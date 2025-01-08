function animatePoop(setPosX, setPosY) {
    function backToIdle() {
      let back = setInterval(() => {
        setPosX((x) => {
          if (x >= 340) {
            clearInterval(back);
            return 340;
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
          console.log(x);
          return x - 10;
        }
      });
    }, 50);
  }
  
  export default animatePoop;
  