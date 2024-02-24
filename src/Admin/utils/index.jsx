export function getDate(timestamp) {
  const idx = timestamp.indexOf("T");
  return timestamp.slice(0, idx);
}

export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const color = `rgb(${r},${g},${b})`;

  return color;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
}
