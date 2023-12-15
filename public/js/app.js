console.log("This is clinet side js file loaded...");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchData = searchInput.value;

  fetch("http://localhost:3000/weather?address="+searchData)
    .then((response) => {
      response.json().then((data) => {
        if (data.err) {
          return data.err;
        }
        messageOne.textContent=data.geomap.location;
        messageTwo.textContent=data.forcast

        return ;
      });
    })
    .catch((err) => {
      return console.log("Error ", err);
    });
  console.log(searchData);
});
