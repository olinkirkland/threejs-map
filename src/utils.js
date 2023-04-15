export function randomCode() {
  // Create a code like 'XV3L'
  const code = [];
  for (let i = 0; i < 4; i++) {
    const randomNum =
      Math.random() < 0.5
        ? Math.floor(Math.random() * 10)
        : String.fromCharCode(65 + Math.floor(Math.random() * 26));
    code.push(randomNum);
  }
  return code.join('');
}
