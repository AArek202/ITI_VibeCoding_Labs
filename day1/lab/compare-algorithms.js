// Simplest QuickSort (Out-of-Place)
function quickSortSimple(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [],
    middle = [],
    right = [];

  for (let x of arr) {
    if (x < pivot) left.push(x);
    else if (x > pivot) right.push(x);
    else middle.push(x);
  }
  return [...quickSortSimple(left), ...middle, ...quickSortSimple(right)];
}

// Simplest MergeSort (Divide and Conquer)
function mergeSortSimple(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortSimple(arr.slice(0, mid));
  const right = mergeSortSimple(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [],
    i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Simplest HeapSort (In-Place Tree Structure)
function heapSortSimple(arr) {
  let size = arr.length;
  // Build heap
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) heapify(arr, size, i);
  // Extract elements from heap
  for (let i = size - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, size, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && arr[left] > arr[largest]) largest = left;
  if (right < size && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, size, largest);
  }
}

// 2. BENCHMARK SUITE

const runBenchmark = (name, fn, data, isMutation = false) => {
  const inputCopy = [...data];
  const start = performance.now();
  const result = fn(inputCopy);
  const end = performance.now();
  return (end - start).toFixed(4);
};

// Generate an unsorted random array
const size = 5000;
const testData = Array.from({ length: size }, () =>
  Math.floor(Math.random() * 100000),
);

console.log(`=== Sorting Benchmark (${size} random elements) ===`);
console.log(
  `QuickSort : ${runBenchmark("QuickSort", quickSortSimple, testData)} ms`,
);
console.log(
  `MergeSort : ${runBenchmark("MergeSort", mergeSortSimple, testData)} ms`,
);
console.log(
  `HeapSort  : ${runBenchmark("HeapSort", heapSortSimple, testData)} ms`,
);
console.log(
  `Built-in  : ${runBenchmark("JS Native", (arr) => arr.sort((a, b) => a - b), testData)} ms`,
);
