$(".search-form").on("submit", e => {
  e.preventDefault();
  e.stopPropagation();
  console.log("click ok");

  let movie = $(".movie-input").val().trim();
  const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
    const movieDiv = $("<div class='movie'>");
    const imageDiv = $("<div class='movie-image'>");

    const title = response.Title;
    const pFour = $("<p>").text("Title: " + title);
    movieDiv.append(pFour);

    const rating = response.Rated;
    const pOne = $("<p>").text("Rating: " + rating);
    movieDiv.append(pOne);

    const released = response.Released;
    const pTwo = $("<p>").text("Released: " + released);
    movieDiv.append(pTwo);

    const plot = response.Plot;
    const pThree = $("<p>").text(plot);
    movieDiv.append(pThree);

    const imgURL = response.Poster;
    const image = $("<img>").attr("src", imgURL);
    imageDiv.append(image);

    const button = $("<button/>", {
      text: "Save",
      click: function() {
        $.ajax({
          // url is the route that we want to call
          // change url
          url: "/members",
          method: "POST",
          data: {
            imdbID: response.imdbID
          }
        });
      }
    });

    movieDiv.append(button);

    const lineBreak = $(
      "<hr width='100%' style='border: 1px dashed #C0C0C0' color='#FFFFFF' size='6'>"
    );
    movieDiv.append(lineBreak);

    // Putting the entire movie above the previous movies
    $(".render-movie").prepend(movieDiv);
    $(".render-movie-img").prepend(imageDiv);
  });
});
