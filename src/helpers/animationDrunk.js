function animateDrunk(setPosX, setPosY) {
    function backToIdle() {
      let back = setInterval(() => {
        setPosY((y) => {
          if (y >= 180) {
            clearInterval(back);
            return 180;
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
          console.log(y);
          return y - 10;
        }
      });
    }, 75);
  }
  
  export default animateDrunk;
  