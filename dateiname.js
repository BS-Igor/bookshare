// Create a request variable and assign a new XMLHttpRequest object to it.




window.setTimeout(requestXmlHttp, 20);
var data;
var isSuccess;

function handleEvent(event) {
  console.log(event.type);
  document.getElementById('flex-cards').innerHTML = "<p>Verbindung zum Server verloren. Bitte versuchen Sie es später erneut.</p>";
isSuccess = false;  
}

function addListeners(xhr) {
  xhr.addEventListener('error', handleEvent);
  xhr.addEventListener('abort', handleEvent);
}

function requestXmlHttp() {
  var xmlHttp = new XMLHttpRequest();
  var url = "https://ghiblinpi.herokuapp.com/films";
  //addListeners(xmlHttp);
  // Open a new connection, using the GET request on the URL endpoint
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
 // xmlHttp.status;

if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
    isSuccess = true;
    // Begin accessing JSON data here
      data = JSON.parse(this.response);
      generateCards(data);
}  else {
  document.getElementById('flex-cards').innerHTML = "<p>Verbindung zum Server verloren. Bitte versuchen Sie es später erneut.</p>";
  isSuccess = false;
}

}

function filterData() {
  if(isSuccess){
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
    if (element.title.toLowerCase().includes(input.toLowerCase()) || element.description.toLowerCase().includes(input.toLowerCase())) {
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
      title.textContent = card.title;
      container.appendChild(title);

      // Create a p and set the text content to the film's description
      const paragraph = document.createElement('p');
      card.description = card.description.substring(0, 300); // Limit to 300 chars
      paragraph.textContent = card.description;
      paragraph.textContent = `${card.description}…`; // End with an ellipses ...

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
