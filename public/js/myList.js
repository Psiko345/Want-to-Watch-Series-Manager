const seriesUUID = $(".mylist-seriesUUID").text();
const arrayUUID = seriesUUID.split(" ").map(uuid => uuid.trim());
console.log(arrayUUID);

// loop through all UUID from database except [0]
// somehow arrayUUID[0] is an empty string
for (let i = 1; i < arrayUUID.length; i++) {
  const queryURL = "https://www.omdbapi.com/?i=" + arrayUUID[i] + "&apikey=trilogy";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response.Title);
    const movieDiv = $("<div class='movie'>");

    const title = response.Title;
    const pFour = $("<p>").text("Title: " + title);
    movieDiv.append(pFour);

    const released = response.Released;
    const pTwo = $("<p>").text("Released: " + released);
    movieDiv.append(pTwo);

    const plot = response.Plot;
    const pThree = $("<p>").text(plot);
    movieDiv.append(pThree);

    const imgURL = response.Poster;
    const image = $("<img>").attr("src", imgURL);
    movieDiv.append(image);

    const lineBreak = $("<br>");
    movieDiv.append(lineBreak);

    // Putting the entire movie above the previous movies
    $(".popup-body").prepend(movieDiv);
  });
}

// my list popup script
const openPopupBtn = document.querySelectorAll("[data-popup-target]");
const closePopupBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openPopupBtn.forEach(button => {
  button.addEventListener("click", () => {
    const popup = document.querySelector(button.dataset.popupTarget);
    openPopup(popup);
  });
});

overlay.addEventListener("click", () => {
  const popups = document.querySelectorAll(".popup.active");
  popups.forEach(popup => {
    closePopup(popup);
  });
});

closePopupBtn.forEach(button => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

function openPopup(popup) {
  if (popup === null) {
    return;
  }
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closePopup(popup) {
  if (popup === null) {
    return;
  }
  popup.classList.remove("active");
  overlay.classList.remove("active");
}
