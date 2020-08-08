// Create a request variable and assign a new XMLHttpRequest object to it.
requestXmlHttp();
var data;
var isSuccess;

function requestXmlHttp() {
  var xmlHttp = new XMLHttpRequest();
  //old request url "https://ghibliapi.herokuapp.com/films"
  var url = "https://google-books.p.rapidapi.com/volumes?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc";
  // Open a new connection, using the GET request on the URL endpoint
  xmlHttp.open("GET", url, true);
  xmlHttp.setRequestHeader("x-rapidapi-host", "google-books.p.rapidapi.com");
  xmlHttp.setRequestHeader("x-rapidapi-key", "ae58d1f56bmsh83041b9a62d3035p1d8036jsnabd25f728591");
  console.log(xmlHttp);

  xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
      isSuccess = true;
      // Begin accessing JSON data here
      var wholeResponse = JSON.parse(xmlHttp.response);
      data = wholeResponse.items;
      generateCards(data);
    } else {
      document.getElementById('flex-cards').innerHTML = "<p>Verbindung zum Server verloren. Bitte versuchen Sie es später erneut.</p>";
      isSuccess = false;
    }
  }

  // xmlHttp.onprogress = function(){
  //   document.getElementById('flex-cards').innerHTML = "<p>Please wait.</p>";
  // }

  xmlHttp.send();
}

function filterData() {
  if (isSuccess) {
    filter();
  } else {
    console.log("isSuccess? " + isSuccess);
  }
}

function filter() {
  //entweder wie drunter oder so: document.getElementById('search-input').value;
  const input = document.querySelector('input').value;
  var dataFiltered = [];
  //neues gefilterte Array erstellen  
  data.forEach(element => {
    if (element.volumeInfo.title.toLowerCase().includes(input.toLowerCase()) || element.volumeInfo.description.toLowerCase().includes(input.toLowerCase())) {
      // Quelle: https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
      dataFiltered.push(element);
    }
  });
  generateCards(dataFiltered);
}

function generateCards(cards) {
  document.getElementById('flex-cards').innerHTML = "";
  if (cards.length === 0) {
    document.getElementById('flex-cards').innerHTML = "<p>No result.</p>";
  } else {

    cards.forEach(card => {
      const content = document.getElementById('flex-cards');
      // Create a div with a card class
      const container = document.createElement('div');
      content.appendChild(container);

      // Create an h1 and set the text content to the film's title
      const title = document.createElement('h1');
      title.textContent = card.volumeInfo.title;
      container.appendChild(title);
      // Create a p and set the text content to the film's description
      const paragraph = document.createElement('p');
      if (typeof (card.volumeInfo.description) !== 'undefined') {
        card.volumeInfo.description = card.volumeInfo.description.substring(0, 300); // Limit to 300 chars
        paragraph.textContent = card.volumeInfo.description;
        paragraph.textContent = `${card.volumeInfo.description}…`; // End with an ellipses ...  
      } else {
        card.volumeInfo.description ='No description available.';
        paragraph.textContent = card.volumeInfo.description;
      }
      container.appendChild(paragraph);
    });
  }
}

// function filterItems(arr, query) {
//   var dataFiltered = arr.filter(function(el) {
//       return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
//   })

//   var dataFiltered = arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
// }

// Send request
