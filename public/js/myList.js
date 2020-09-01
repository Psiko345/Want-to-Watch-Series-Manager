const seriesUUID = $(".mylist-seriesUUID").text();
const originalArrayUUID = seriesUUID.split(" ").map(uuid => uuid.trim());
const arrayUUID = [...new Set(originalArrayUUID)];
// console.log(arrayUUID);

// loop through all UUID from database except [0]
// somehow arrayUUID[0] is an empty string
for (let i = 1; i < arrayUUID.length; i++) {
  addToList(arrayUUID[i]);
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

function addToList(id) {
  const queryURL =
    "https://www.omdbapi.com/?i=" + id + "&apikey=trilogy";
  //   console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    // console.log(response.Title);
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

    const button = $("<button/>", {
      text: "Delete",
      click: function() {
        $.ajax({
          // url is the route that we want to call
          // change url
          url: "/members",
          method: "DELETE",
          data: {
            imdbID: response.imdbID
          }
        }).then(() => {
          location.reload();
        });
      }
    });

    movieDiv.append(button);

    const lineBreak = $(
      "<hr width='750px' max-width='80%' style='border: 1px dashed #C0C0C0' color='#FFFFFF' size='6'>"
    );
    movieDiv.append(lineBreak);

    // Putting the entire movie above the previous movies
    $(".popup-body").prepend(movieDiv);
  });
}
