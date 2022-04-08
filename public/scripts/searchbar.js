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
    ".search-bar"
  );

  filter = input.value.toUpperCase();
  filter = removeSpace(filter);
  li = document.querySelectorAll(".card-container");

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
