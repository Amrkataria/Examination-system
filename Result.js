const date = new Date("9,25,2024");
function getCookie(key) {
    var value = null;
    var cookieArr = document.cookie.split(";");
    console.log();
    cookieArr.forEach(function (el) {
      var keyAndvalue = el.split("=");
      if (keyAndvalue[0].trim() == key) {
        value = keyAndvalue[1];
      }
    });
  
    return value;
  }

  
  const score = getCookie("examScore");
  const wrongAnswered = getCookie("wrongAnswered");
console.log(score);
console.log(wrongAnswered);

const correct=document.getElementById("count count--green");
correct.textContent=score;

const wrong=document.getElementById("count count--red");
wrong.textContent=wrongAnswered;
if(score<10){
    const icon=document.getElementById("icon_grade");
    icon.src="./assets/icons8-sad-100.png";
    const para=document.getElementById("section-results__title");
    para.textContent="You Failed To Pass The Exam"

}

