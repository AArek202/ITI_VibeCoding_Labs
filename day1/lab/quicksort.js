const numbers = [7, 9, 5, 6, 4, 2, 1, 8, 3];

// Prompt to Copilot: create a function that implements quick sorting on array of numbers in JavaScript

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const middle = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      middle.push(arr[i]);
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

console.log(quickSort(numbers));

// Enhancement Prompt: enhance and optimize the algorithm of the function quickSort in another function called quickSortEnhanced

function quickSortEnhanced(arr) {
  const stack = [[0, arr.length - 1]];

  while (stack.length > 0) {
    const [left, right] = stack.pop();

    if (left >= right) continue;

    const pivotIndex = partitionEnhanced(arr, left, right);

    if (pivotIndex - left < right - pivotIndex) {
      stack.push([pivotIndex + 1, right]);
      stack.push([left, pivotIndex - 1]);
    } else {
      stack.push([left, pivotIndex - 1]);
      stack.push([pivotIndex + 1, right]);
    }
  }

  return arr;
}

function partitionEnhanced(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }

  return i;
}

console.log(quickSortEnhanced([...numbers]));

// My Enhancement: do not create a new array, bu edit array in place

function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;

  // Partition the array and get the pivot index
  const pivotIndex = partition(arr, left, right);

  // Recursively sort the left and right halves
  quickSortInPlace(arr, left, pivotIndex - 1);
  quickSortInPlace(arr, pivotIndex + 1, right);

  return arr;
}

function partition(arr, left, right) {
  // Using the rightmost element as the pivot (Lomuto partition scheme)
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Move the pivot to its correct final position
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

console.log(quickSortInPlace(numbers));

// Iterative Prompt: create an iterative version in another function called quickSortIterative

function quickSortIterative(arr) {
  const stack = [];

  stack.push(0);
  stack.push(arr.length - 1);

  while (stack.length > 0) {
    // Pop the right and left boundaries
    const right = stack.pop();
    const left = stack.pop();

    if (left >= right) {
      continue;
    }

    medianOfThree(arr, left, right);

    const pivotIndex = partition(arr, left, right);

    // Push left subarray bounds to stack
    stack.push(left);
    stack.push(pivotIndex - 1);

    // Push right subarray bounds to stack
    stack.push(pivotIndex + 1);
    stack.push(right);
  }

  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

function medianOfThree(arr, left, right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[left] > arr[mid]) [arr[left], arr[mid]] = [arr[mid], arr[left]];
  if (arr[left] > arr[right]) [arr[left], arr[right]] = [arr[right], arr[left]];
  if (arr[mid] > arr[right]) [arr[mid], arr[right]] = [arr[right], arr[mid]];

  [arr[mid], arr[right]] = [arr[right], arr[mid]];
}

module.exports = {quickSort, quickSortEnhanced, quickSortInPlace, quickSortIterative}