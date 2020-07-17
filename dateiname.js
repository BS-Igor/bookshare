// Create a request variable and assign a new XMLHttpRequest object to it.
var xmlHttp = new XMLHttpRequest();
var url = "https://ghibliapi.herokuapp.com/films";

// Open a new connection, using the GET request on the URL endpoint
xmlHttp.open("GET", url, true);

xmlHttp.onload = function () {
// Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if(xmlHttp.status >= 200 && xmlHttp.status < 400){
   
    data.forEach(filmchen => {

/*  <div>
      <h1>title</h1>
      <p>description</p>
    </div>    */

      const content = document.getElementById('flex-cards');
      // Create a div with a card class
      const container = document.createElement('div');
      content.appendChild(container);

      // Create an h1 and set the text content to the film's title
      const title = document.createElement('h1');
      title.textContent = filmchen.title;
      container.appendChild(title);

      // Create a p and set the text content to the film's description
      const paragraph = document.createElement('p');
      filmchen.description = filmchen.description.substring(0, 300); // Limit to 300 chars
      paragraph.textContent = filmchen.description;
      paragraph.textContent = `${filmchen.description}...`; // End with an ellipses ...
     
      container.appendChild(paragraph);

      console.log(filmchen.title);
    });

  } else{
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }

};

// Send request
xmlHttp.send();

