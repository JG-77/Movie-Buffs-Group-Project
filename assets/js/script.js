$(document).ready(function(){

var savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
var formEl = $('#movieForm');
var historyDiv = $('<div>');
//var clearBtn = $('#clear');
historyDiv.attr('class', 'histDiv');
var apikey = "54e8fa38"

    $("#movieForm").submit(function(event){
        event.preventDefault()


        $("#main").empty()

        $("#main2").empty()

        var movie = $("#movie").val()

        if (movie === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Type in a movie title into the search bar.',
              })
            return;
        }

        var result = " "

        var urlMovie = "http://www.omdbapi.com/?apikey="+apikey

        var urlWiki = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        
        $.ajax({
            method:'GET',
            url:urlMovie+"&s="+movie,
            success:function(data){
                console.log(data.Search);
                //local storage for search input
                savedMovies.push(movie);
                localStorage.setItem('movies', JSON.stringify(savedMovies));
               
                $('.histDiv').empty();

                //for loop for creating history buttons
                for(i = 0; i < savedMovies.length; i++) {
                    var historyBtn = $('<button>')
                    var movieLink = $('<a>')

                    historyBtn.attr('class', 'historyBtn');
                    formEl.append(historyDiv);
                    historyDiv.append(historyBtn);
                    historyBtn.append(movieLink);

                    movieLink.text(savedMovies[i]);

                }  
                var i;
                for(var i =0; i < data.Search.length; i++){
                    var poster = data.Search[i].Poster
                    var movieTitle = data.Search[i].Title
                    var type = data.Search[i].Type
                    var year = data.Search[i].Year

                    result = `
    
                    <div class="result">
                    
                    <img style="float:left" width="300" height="300" src="${poster}"/>
                    <h2>${movieTitle}</h2>
                    <h2>${type}</h2>
                    <h2>${year}</h2>
                    
                    </div>
    
                    `;
                    
                    $("#main").append(result)

                }

            } /*, error: function() {
                console.log('error')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Could not find movie title.',
                  })
            }*/ 
        })

        $.ajax({
            method:'GET',
            url:urlWiki+movie,
            success:function(data){
                console.log(data.query.search);
                
                var i;
                for(var i =0; i < 5; i++){
                    var snippet = data.query.search[i].snippet
                    var wikiTitle = data.query.search[i].title
                    var wikiURL = encodeURI(`https://en.wikipedia.org/wiki/${wikiTitle}`)

                    result = `
    
                    <div class="result2">
                    
                    <h2>${wikiTitle}</h2>
                    <h2>${snippet}</h2>
                    <a href="${wikiURL}" target="_blank" rel="noopener">${wikiTitle}</a>

                    
                     </div>
    
                     `;
                    
                    $("#main2").append(result)
                }

            }
        })
    })
    
    function listSearchHistory() {
        for(i = 0; i < savedMovies.length; i++) {
            console.log(savedMovies)
            
            var historyBtn = $('<button>')
            var movieLink = $('<a>')
            
            historyBtn.attr('class', 'historyBtn');
            formEl.append(historyDiv);
            historyDiv.append(historyBtn);
            historyBtn.append(movieLink);
            
            movieLink.text(savedMovies[i]);  
        }
    }
    
    listSearchHistory();
    
    function clearHistory() {
        localStorage.clear('movies');
        $('.histDiv').empty();
        location.reload();
    }
    
    $('#clear').on('click', function() {
        console.log('click');
        clearHistory();
    })
})