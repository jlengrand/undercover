export function arrayHasDuplicates(array) {
  return array.length !== new Set(array).size;
}

export function arrayHasDuplicateValue(array, value) {
  if (!value) throw new Error('No value to find duplicates on!');
  const theArray = array.map(item => item[value]);
  return arrayHasDuplicates(theArray);
}
