$(".search-form").on("submit", e => {
  e.preventDefault();
  e.stopPropagation();
  console.log("click ok");

  let movie = $(".movie-input").val().trim();
  const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(response => {
    console.log(response);
    const movieDiv = $("<div class='movie'>");

    // Storing the rating data
    const rating = response.Rated;

    // Creating an element to have the rating displayed
    const pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    const released = response.Released;

    // Creating an element to hold the release year
    const pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    const plot = response.Plot;

    // Creating an element to hold the plot
    const pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    const imgURL = response.Poster;

    // Creating an element to hold the image
    const image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    const button = $("<button/>", {
      text: 'Save',
      click: function () {
        alert('hi');
      }
    });

    movieDiv.append(button);
    // Putting the entire movie above the previous movies
    $(".render-movie").prepend(movieDiv);

  });
});