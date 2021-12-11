// Create a request variable and assign a new XMLHttpRequest object to it.
requestXmlHttp();
var data;
var isSuccess;

function requestXmlHttp() {
  var xmlHttp = new XMLHttpRequest();
  //old request url "https://ghibliapi.herokuapp.com/films"
  var url = "https://google-books.p.rapidapi.com/volumes";
  // Open a new connection, using the GET request on the URL endpoint
  xmlHttp.open("GET", url, true); //true means it is async
  xmlHttp.setRequestHeader("x-rapidapi-host", "google-books.p.rapidapi.com");
  xmlHttp.setRequestHeader("x-rapidapi-key", "ae58d1f56bmsh83041b9a62d3035p1d8036jsnabd25f728591");

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

  xmlHttp.onloadstart = function () {
    document.getElementById('flex-cards').innerHTML = '<div class="loader"><div></div></div>';
  }

  xmlHttp.send();
}

function filterData(input) {
  if (isSuccess) {
    filter(input);
  } else {
    console.log("isSuccess? " + isSuccess);
  }
}

function filter(input) {
  //entweder wie drunter oder so: document.getElementById('search-input').value;
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
      container.className = "card";
      content.appendChild(container);

      //creates a modal-view by clicking
      container.onclick = function () {
        const modalContent = document.createElement('div');
        modalContent.className = "modal-content"; //replaces all other classes with the single new one
        // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
        const modalContainer = document.createElement('div');
        modalContainer.className = "modal";
        modalContainer.appendChild(modalContent);
        content.appendChild(modalContainer);
        const crossClose = document.createElement('span');
        crossClose.className = "close";
        crossClose.textContent = '×';
        modalContent.appendChild(crossClose);
        const modalTitle = document.createElement('h1');
        modalTitle.textContent = card.volumeInfo.title;
        modalContent.appendChild(modalTitle);
        const modalParagraph = document.createElement('p');
        modalParagraph.textContent = card.volumeInfo.description;
        modalContent.appendChild(modalParagraph);
        var applyBtn = document.createElement("button");
        applyBtn.id = "apply";
        applyBtn.innerHTML = "Select this book";
        modalContent.appendChild(applyBtn);
        window.onclick = function (event) {
          if (event.target == modalContainer || event.target == crossClose) {
            modalContainer.style.display = "none";
          }
        }
      };

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
        card.volumeInfo.description = 'No description available.';
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
