let allDiv = document.querySelectorAll(".trainer-profile");

allDiv.forEach((element) => {
  let reviewAverage = element.querySelector(".average-rating").innerText;

  let star1 = element.querySelector("span:nth-child(1)");
  let star2 = element.querySelector("span:nth-child(2)");
  let star3 = element.querySelector("span:nth-child(3)");
  let star4 = element.querySelector("span:nth-child(4)");
  let star5 = element.querySelector("span:nth-child(5)");

  if (reviewAverage > 4.5) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";
    star3.style.color = "yellow";
    star4.style.color = "yellow";
    star5.style.color = "yellow";
  } else if (reviewAverage > 3.5) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";
    star3.style.color = "yellow";
    star4.style.color = "yellow";
  } else if (reviewAverage > 2.5) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";
    star3.style.color = "yellow";
  } else if (reviewAverage > 1.5) {
    star1.style.color = "yellow";
    star2.style.color = "yellow";
  } else if (reviewAverage > 0.5) {
    star1.style.color = "yellow";
  }
});
