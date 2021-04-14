
console.log("Let's get this party started!");

const APIKEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

//This function will return the value the user inputs into the form
function getVal(){
  return $("#search").val();
}

//This function will create an awaited get request to the giphy API using the information
// that the user provides to pull in a relevant image, returns the URL as a string
async function getImage(){
  let term = getVal();
  let response = await axios.get("http://api.giphy.com/v1/gifs/search", { 
    params: {q:term, api_key:APIKEY}});
  let randomIdx = Math.floor(Math.random()*(response.data.data.length-1));
  let imageURL = response.data.data[randomIdx].images.original.url;
  return imageURL;
}

//Function will then create a new image variable, set the variable's source to that image URL and appends it to the DOM
async function submitHandler(){
  let $firstGiphy = $("<img>").attr("src", await getImage());
  $(".giphy-container").append($firstGiphy);
}

//typically better to use submit on the form functionality 
$("form").submit(function(e){
  e.preventDefault();
  submitHandler();
});

//Adds functionality to the remove button to remove all giphys from the DOM when clicked
$("#remove-button").on("click", function(){
  $(".giphy-container").remove();
});