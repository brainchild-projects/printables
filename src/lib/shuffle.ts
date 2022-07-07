/* eslint-disable no-param-reassign */

const { floor, random } = Math;

export default function shuffle<T>(inputArray: T[]) {
  const array = inputArray.slice(0);
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = floor(random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
