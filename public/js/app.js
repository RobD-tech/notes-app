console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultPlaceholder = document.getElementById('result');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchInput.value;
  resultPlaceholder.innerHTML = '';

  fetch(`http://localhost:3000/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        resultPlaceholder.innerHTML = `Error: ${data.error}`;
      } else {
        resultPlaceholder.innerHTML = `Location: ${data.location}, Forecast: ${data.forecast}`;
      }
    });
  });
})