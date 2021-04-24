var movieImg;
$(document).ready(function () {
  var apikey = "54e8fa38";

  $("#movieForm").submit(function (event) {
    event.preventDefault();

    $("#main").empty();

    $("#main2").empty();

    var movie = $("#movie").val();

    if (movie === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Type in a movie title into the search bar.",
      });
      return;
    }

    var result = " ";

    var urlMovie = "http://www.omdbapi.com/?apikey=" + apikey;

    var urlWiki =
      "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

    $.ajax({
      method: "GET",
      url: urlMovie + "&s=" + movie,
      success: function (data) {
        console.log(data.Search);

        var i;
        for (var i = 0; i < data.Search.length; i++) {
          var poster = data.Search[i].Poster;
          var movieTitle = data.Search[i].Title;
          var type = data.Search[i].Type;
          var year = data.Search[i].Year;

          result = `
    
                    <div class="result">
                    
                    <img width="300" class="movieImg" height="300" src="${poster}"/>
                    <h2 id="movie-title">${movieTitle}</h2>
                    <h2>${type}</h2>
                    <h2>${year}</h2>
                    
                    </div>
    
                    `;

          $("#main").append(result);
        }
      },
    }).then(function () {
      $(".movieImg").on("click", function (e) {
        var movieName = $(this).siblings(".movie-title").text();
        console.log(movieName);
        getWiki(movieName);
      });
    });
  });

  function getWiki(movie) {
    $.ajax({
      method: "GET",
      url: urlWiki + movie,
      success: function (data) {
        console.log(data.query.search);

        var i;
        for (var i = 0; i < 5; i++) {
          var snippet = data.query.search[i].snippet;
          var wikiTitle = data.query.search[i].title;
          var wikiURL = encodeURI(`https://en.wikipedia.org/wiki/${wikiTitle}`);

          result = `
  
                  <div class="result2">
                  
                  <h2>${wikiTitle}</h2>
                  <h2>${snippet}</h2>
                  <a href="${wikiURL}" target="_blank" rel="no opener">${wikiTitle}</a>

                  
                   </div>
  
                   `;

          $("#main2").append(result);
        }
      },
    });
  }
});
