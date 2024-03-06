import './style.css';
function calculatePoints() {
  const input1 = parseInt(document.getElementById('input1').value);
  const input2 = parseInt(document.getElementById('input2').value);
  const input3 = parseInt(document.getElementById('input3').value);
  const input4 = parseInt(document.getElementById('input4').value);
  const input5 = parseInt(document.getElementById('input5').value);
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwLfUZr_dyGcsbE3-fzlxAKlKpv_O8hReEWd16nOPdVivInMQz3DUB2FYotBkZR5esMwQ/exec';
  const form = document.forms['contact-form'];

  function validateInput(input) {
    if (isNaN(input)) {
      throw new Error('Please fill out all entries.');
    }
    if (input < 0) {
      throw new Error('Invalid input. Please enter a positive number.');
    }
  }

  function calculatePointsForInput(input, ranges) {
    for (let i = 0; i < ranges.length; i++) {
      if (input <= ranges[i].max) {
        return ranges[i].points;
      }
    }
    return ranges[ranges.length - 1].points;
  }

  try {
    validateInput(input1);
    validateInput(input2);
    validateInput(input3);
    validateInput(input4);
    validateInput(input5);

    const ranges1 = [
      { max: 499, points: 0 },
      { max: 999, points: 20 },
      { max: 1999, points: 30 },
      { max: 2999, points: 40 },
      { max: Infinity, points: 60 },
    ];

    const ranges2 = [
      { max: 499999, points: 0 },
      { max: 999999, points: 2 },
      { max: 1999999, points: 4 },
      { max: 2999999, points: 6 },
      { max: 3999999, points: 8 },
      { max: Infinity, points: 10 },
    ];

    const ranges3 = [
      { max: 199999, points: 0 },
      { max: 399999, points: 2 },
      { max: 699999, points: 4 },
      { max: 999999, points: 6 },
      { max: 1199999, points: 8 },
      { max: Infinity, points: 10 },
    ];

    const ranges4 = [
      { max: 4900, points: 0 },
      { max: 9900, points: 2 },
      { max: 19999, points: 4 },
      { max: 29999, points: 6 },
      { max: 39999, points: 8 },
      { max: Infinity, points: 10 },
    ];

    const ranges5 = [
      { max: 499999, points: 0 },
      { max: 9999999, points: 2 },
      { max: 19999999, points: 4 },
      { max: 29999999, points: 6 },
      { max: 39999999, points: 8 },
      { max: Infinity, points: 10 },
    ];

    const points1 = calculatePointsForInput(input1, ranges1);
    const points2 = calculatePointsForInput(input2, ranges2);
    const points3 = calculatePointsForInput(input3, ranges3);
    const points4 = calculatePointsForInput(input4, ranges4);
    const points5 = calculatePointsForInput(input5, ranges5);

    const result = points1 + points2 + points3 + points4 + points5;
    document.getElementById('result').textContent = `Total Points: ${result}`;
  } catch (error) {
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
}

const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', calculatePoints);

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(data => {
    alert("Score calculated!");
  })
  .then(response => response.json())
  .catch(error => console.error('Error!', error.message));
});
