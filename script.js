$(function() {

    var $searches = $('#searches');
    var sBtn = $('#search-button');
    var cBtn = $('#clear-button');
    var rBtn = $('#random-button');
    var sInput = $('#search-input');

    function searchFor() {
      sInput = $('#search-input').val(); //Input Value for searches
      $searches.html(""); // Clear out current results when clicked.

      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&search=" + sInput,
        type: "JSONP",
        dataType: "JSONP",
        success: function(data) {
            var title = data[1];
            var snip = data[2];
            var url = data[3];

            var searchResult = function(val) {
              var result = "<li>";
              result += '<a href="' + url[val] + '" target=_blank>';
              result += '<div>';
              result += '<h1>' + title[val] + '</h1>';
              result += '<p>' + snip[val] + '</p>';
              result += '</div></a></li>';

              return result;
            }; // searchResult function - result template

            for (var i = 0; i <= data[1].length - 1; i++) {
              $searches.append(searchResult(i));
            }; // for loop - append results
          } // ajax success function
      }); // AJAX JSONP Call
    }; //searchFor()

    function radnomSearch() {
      sInput = $('#search-input').val(""); //Clear input value
      $searches.html(""); //Clear all searches

      $.ajax({
          url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnfilterredir=redirects&rnlimit=10",
          dataType: "JSONP",
          data: "JSONP",
          success: function(data) {

            var r = data.query.random;

            var searchResult = function(val) {
              var result = "<li>";
              result += '<a href="https://en.wikipedia.org/?curid=' + r[val].id + '" target=_blank>';
              result += '<div>';
              result += '<h1>' + r[val].title + '</h1>';
              result += '</div></a></li>';

              return result;
            }; // searchResult function - result template

            for (var i = 0; i <= r.length - 1; i++) {
              $searches.append(searchResult(i));
            }; // for loop - append results
          }
        }) //ajax 
    } //randomSearch()

    sBtn.on('click', function() {
      searchFor();
    }); //Run search of input upon search button press

    rBtn.on('click', function() {
      radnomSearch();
    }); //Random search button press

    sInput.bind('keypress', function(c) {
      var keyCode = c.keyCode || c.which;
      if (keyCode === 13) {
        searchFor();
      }
    }); //Run search of input value upon enter keypress

    cBtn.on('click', function() {
      sInput = $('#search-input').val("");
      $searches.html(""); // Clear out current results when clicked.
    });

  }) //Ready