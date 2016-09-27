$(document).ready(function(){
    $("form").submit(function(){
        var text = $("#text").val();
        var type = $("#type").val();
        console.log(text, type);
        $.get("https://api.spotify.com/v1/search?query=" + text + "&offset=0&limit=20&type=" + type, function(res) {
            // console.log(res)
            var html_string;
            if(type == "track"){
                console.log("inputted an track");
                if(!res.tracks.items.length){
                    html_string = "<h1>No Results Found</h1><br>";
                } else {
                    html_string = "<h1>Results:</h1><br>";
                }

                console.log(res.tracks.items);
                for(var i = 0; i < res.tracks.items.length; i++){
                    console.log("name:", res.tracks.items[i].name);
                    console.log("artist:", res.tracks.items[i].artists[0].name);
                    console.log("albumURL:", res.tracks.items[i].album.images[0].url);
                    console.log("listen:", res.tracks.items[i].external_urls.spotify);

                    html_string += "<h4>#" + (i+1) + ".</h4>" +
                                "<div id='divId" + (i+1) + "'><h4>Track Name: " + res.tracks.items[i].name +
                                "</h4>" +
                                "<h4>Artist Name: " + res.tracks.items[i].artists[0].name +
                                "</h4>" +
                                "<img height='75' src='" + res.tracks.items[i].album.images[0].url + "'></h4><a href='" + res.tracks.items[i].external_urls.spotify +
                                "'><img id ='playbtn' src='images/playbtn2.png' alt='playbtn'></a></div><br><br><button class='btn btn-success btn-xs addBtn' data-btn-id='" + (i+1) + "'>Add to Favorites</button><hr>";
                }
            }

            if(type == "artist"){
                console.log("inputted an artist");

                if(!res.artists.items.length){
                    html_string = "<h1>No Results Found</h1><br>";
                } else {
                    html_string = "<h1>Results:</h1><br>";
                }
                // console.log(res.artists.items)
                for(var j = 0; j < res.artists.items.length; j++){
                    console.log("name:", res.artists.items[j].name);
                    if(res.artists.items[j].images.length > 0){
                        console.log("photo:", res.artists.items[j].images[0].url);
                    } else {
                        console.log("no photo available");
                    }
                    console.log("listen:", res.artists.items[j].external_urls.spotify);
                    console.log("followers:", res.artists.items[j].followers.total);

                    html_string += "<h4>#" + (j+1) + ".</h4>" +
                                "<h4>Artist Name: " + res.artists.items[j].name +
                                "</h4><h5>Followers: " +
                                res.artists.items[j].followers.total + "</h5>";


                    if(res.artists.items[j].images.length > 0){
                        html_string += "<img height='75' src='" + res.artists.items[j].images[0].url + "'></h4>";
                    } else {
                        html_string += "<img height='75' src='images/no_image.jpeg'></h4>";
                    }
                    html_string += "<a id='artistLink' href='" + res.artists.items[j].external_urls.spotify +
                                "'>View Profile</a><hr>";
                }
            }


            $("#results").html(html_string);
            $("#container").css( "height", 5700 );
        });

        return false;
    });
});

$(document).on("click", ".addBtn", function(){
    console.log("clicked btn!");
    var btn_id = $(this).attr('data-btn-id');
    music_html = document.getElementById("divId" + btn_id);
    $("#myMusic").prepend(music_html);
    $("#myMusic").prepend("<hr>");
});
