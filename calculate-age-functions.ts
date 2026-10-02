export function getVotingMessage(enteredAge: string) {
  const age = checkCorrectnessOfEnteredAge(enteredAge);
  if (age < 18) {
    return 'Ви ще не можете голосувати';
  }
  return 'Ви можете голосувати.';
}

function checkCorrectnessOfEnteredAge(enteredAge: string) {
  enteredAge = enteredAge.trim();
  if (Number.isNaN(Number(enteredAge))) {
    throw new Error('Введіть коректне число');
  }
  if (!Number.isInteger(Number(enteredAge))) {
    throw new Error('Введіть ціле число');
  }
  if (enteredAge.trim().length < 1 || enteredAge.trim().length > 3) {
    throw new Error('Введіть вік від 1 до 99 років');
  }
  return Number(enteredAge);
}
