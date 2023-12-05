function getImages() {
    let list = document.getElementsByTagName('img');
    let images = [];
    for (let i of list) {
        if (i.classList.contains('false') && i.src.includes('760')) {
            images.push(i.src);
        }
    }
    return images;
}

const topPublishingCountries = [
    'United States',
    'United Kingdom',
    'Germany',
    'Russia',
    'France',
    'India',
    'Spain',
    'Italy',
    'Netherlands'
  ];

  function getRandomCountry(countryArray) {
    const randomIndex = Math.floor(Math.random() * countryArray.length);
    return countryArray[randomIndex];
  }

let latestId = 236;

function getNewId() {
    return ++latestId;
}

function genrateRandomRating() {
    const min = 3;
    const max = 5;
    const diff = max - min;
    const randomDecimal = (Math.random() * diff) + min;
    return randomDecimal.toFixed(1);
}

function genrateRandomDiscount() {
    const min = 5;
    const max = 35;
    const diff = max - min;
    const randomDecimal = (Math.random() * diff) + min;
    return Math.round(randomDecimal);
}

function getRandomReviews(){
    let reviews = [];
    const min = 1;
    const max = 50;
    const diff = max - min;
    for(let i = 1; i <= 5; i++){
        const randomDecimal = (Math.random() * diff) + min;
        reviews.push(Math.round(randomDecimal));
    }
    return reviews;
}

const allTags = [
    "Verse composition",
  "Poetic forms",
  "Poetic devices",
  "Emotional expression",
  "Symbolism",
  "Rhythm and meter",
  "Lyric poetry",
  "Narrative poetry",
  "Modern poetry",
  "Poetry analysis"
];

function getRandomTags(tagArray) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const numberOfTagsToGet = Math.floor(Math.random() * (5 - 3 + 1)) + 3; // Random number between 3 and 5
    const shuffledTags = shuffleArray(tagArray);
    const randomTags = shuffledTags.slice(0, numberOfTagsToGet);

    return randomTags;
}

function getRandomInteger() {
    return Math.floor(Math.random() * 50) + 1; // Random number between 1 and 50
}

function getData() {

    let ob = {
        id: getNewId(),
        title: document.getElementsByClassName('pdp_book_title')[0].innerText,
        rating: genrateRandomRating(),
        description: document.getElementsByClassName('innerhtml_description')[0].innerText,
        publishDate: document.getElementsByClassName('text-neutral-700 font-normal text-sm tracking-normal font-manrope')[5].innerText,
        images: getImages(),
        price: parseInt(document.getElementsByClassName('!leading-loose false')[0].innerText.substring(1)),
        discountPercentage: genrateRandomDiscount(),
        pages: parseInt(document.getElementsByClassName('text-neutral-700 font-normal text-sm tracking-normal font-manrope')[2].innerText),
        bookFormat: document.getElementsByClassName('!leading-loose')[0].innerText,
        language: document.getElementsByClassName('dropdown_placeolder')[0].innerText,
        country: getRandomCountry(topPublishingCountries),
        tags: getRandomTags(allTags),
        reviews: getRandomReviews(),
        authorName: document.getElementsByClassName('ellipsisAfterOneLine')[0].innerText,
        authorId: 0,
        publisherName: document.getElementsByClassName('ellipsisAfterOneLine')[1].innerText,
        publisherId: 0,
        genreId: 3,
        subgenreId: 22
    };

   console.log(JSON.stringify(ob));
}

