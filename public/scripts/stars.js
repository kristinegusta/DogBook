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

function searchBar() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.querySelector(
    "body > div > div > div > div.search-bar-div > input"
  );
  filter = input.value.toUpperCase();
  filter = removeSpace(filter);
  li = document.querySelectorAll(".trainer-profile");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    txtValue = removeSpace(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//make search bar not sensitive to spaces
function removeSpace(x) {
  return x.replace(/\s/g, "");
}

function searchBarActivity() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.querySelector(
    "body > div > div > div.search-bar-div > input"
  );

  filter = input.value.toUpperCase();
  filter = removeSpace(filter);
  li = document.querySelectorAll(".trainer-profile");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    txtValue = removeSpace(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
