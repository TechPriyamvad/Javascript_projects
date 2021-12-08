// todo add automation to automatically generate new quote and tweet it without user interaction

// * Element selectors
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// *Loading Spinner shown
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// *remove loading spinner
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// *show new quote and author name on respective elements
function showNewQuote() {
  showLoadingSpinner();
  // * return single random quote
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // * Check if author field is blank then replace text with ' Unknown'
  authorText.textContent = quote.author ? quote.author : 'Unknown';

  //  * Check quote length to determine styling of quoteText element
  //  quote.text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, aspernatur, iure quis modi nam laudantium necessitatibus saepe vero velit tenetur voluptatem alias mollitia unde delectus odit error quaerat ipsum laboriosam."
  if (quote.text.length > 120) {
    // add css class to reduce font size of quote text
    quoteText.classList.add('long-quote');
  } else {
    // remove css class
    quoteText.classList.remove('long-quote');
  }
  // * Check if quote field is blank then replace text with ' Unknown'
  quoteText.textContent = quote.text ? quote.text : 'Unknown';
  removeLoadingSpinner();
}

// * Get quotes from a API and store them in array
async function getQuotes() {
  showLoadingSpinner();
  // *to resolve CORS issue use below proxy with API URL
  const proxyUrl = 'https://obscure-wave-79843.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    // create network request
    const response = await fetch(proxyUrl + apiUrl);
    // console.log(response);
    // getting data in json format
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    alert(error);
  }
}

// Tweet Quote on twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
// called when NewQuote btn is clicked
newQuoteBtn.addEventListener('click', showNewQuote);
// clicked when button having twitter icon is clicked
twitterBtn.addEventListener('click', tweetQuote);

// On page load
getQuotes();
