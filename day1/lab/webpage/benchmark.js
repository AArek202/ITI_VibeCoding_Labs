const {
  quickSort,
  quickSortEnhanced,
  quickSortInPlace,
  quickSortIterative,
} = require("./quickSort");

const generateData = (size, type) => {
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size * 10),
  );

  switch (type) {
    case "sorted":
      return arr.sort((a, b) => a - b);
    case "reversed":
      return arr.sort((a, b) => b - a);
    case "duplicates":
      return Array.from({ length: size }, () => Math.floor(Math.random() * 5));
    case "random":
    default:
      return arr;
  }
};

const runBenchmark = (fn, data) => {
  const dataCopy = [...data];
  const start = performance.now();
  fn(dataCopy);
  const end = performance.now();
  return end - start;
};

const sizes = [100, 1000, 10000];
const types = ["random", "sorted", "reversed", "duplicates"];
const TRIALS = 5;

console.log("=== BEGINNING QUICKSORT VS NATIVE BENCHMARK ===");

types.forEach((type) => {
  console.log(`\n--- Array Type: ${type.toUpperCase()} ---`);

  sizes.forEach((size) => {
    console.log(`\n[ Size: ${size} elements ]`);

    const runners = [
      { name: "Native Array.sort()  ", fn: (arr) => arr.sort((a, b) => a - b) },
      { name: "Naive Out-of-Place   ", fn: quickSort },
      { name: "Copilot Enhanced Iter", fn: quickSortEnhanced },
      { name: "In-Place Recursive   ", fn: quickSortInPlace },
      { name: "In-Place Iterative(M3)", fn: quickSortIterative },
    ];

    const masterData = generateData(size, type);

    runners.forEach((runner) => {
      let totalDuration = 0;
      let crashed = false;

      for (let t = 0; t < TRIALS; t++) {
        try {
          totalDuration += runBenchmark(runner.fn, masterData);
        } catch (e) {
          crashed = true;
          break;
        }
      }

      if (crashed) {
        console.log(`  ${runner.name} : STACK OVERFLOW / CRASHED`);
      } else {
        const avgDuration = (totalDuration / TRIALS).toFixed(4);
        console.log(`  ${runner.name} : ${avgDuration} ms`);
      }
    });
  });
});
