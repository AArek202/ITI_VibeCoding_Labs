const {
  quickSort,
  quickSortEnhanced,
  quickSortInPlace,
  quickSortIterative,
} = require("./quicksort.js");

describe("QuickSort Compendium Test Suite", () => {
  // Array of all implementations to run our test battery against
  const implementations = [
    { name: "Naive Out-of-Place", fn: quickSort },
    { name: "Copilot Enhanced Iterative (Hoare-like)", fn: quickSortEnhanced },
    { name: "Custom In-Place Recursive (Lomuto)", fn: quickSortInPlace },
    { name: "Custom In-Place Iterative (Median-of-3)", fn: quickSortIterative },
  ];

  implementations.forEach(({ name, fn }) => {
    describe(`${name} variant`, () => {
      const runSort = (arr) => fn([...arr]);

      // 1. Edge Cases
      test("should handle an empty array", () => {
        expect(runSort([])).toEqual([]);
      });

      test("should handle a single-element array", () => {
        expect(runSort([42])).toEqual([42]);
      });

      // 2. Already Sorted & Reverse Sorted Arrays
      test("should handle an already sorted array", () => {
        const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(runSort(sorted)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      test("should sort a reverse-sorted array", () => {
        const reverseSorted = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        expect(runSort(reverseSorted)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      // 3. Duplicate Elements
      test("should correctly sort arrays containing duplicate values", () => {
        const duplicates = [5, 1, 5, 3, 9, 1, 3, 5, 7];
        expect(runSort(duplicates)).toEqual([1, 1, 3, 3, 5, 5, 5, 7, 9]);
      });

      test("should handle an array where all elements are identical", () => {
        const allSame = [7, 7, 7, 7, 7];
        expect(runSort(allSame)).toEqual([7, 7, 7, 7, 7]);
      });

      // 4. Standard Unsorted Array (Your example array)
      test("should sort the specific example array", () => {
        const numbers = [7, 9, 5, 6, 4, 2, 1, 8, 3];
        expect(runSort(numbers)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      // 5. Large Datasets
      test("should efficiently sort 5,000 random elements", () => {
        const largeArray = Array.from({ length: 5000 }, () =>
          Math.floor(Math.random() * 50000),
        );

        const expected = [...largeArray].sort((a, b) => a - b);

        const startTime = performance.now();
        const result = runSort(largeArray);
        const endTime = performance.now();

        expect(result).toEqual(expected);
        expect(endTime - startTime).toBeLessThan(100);
      });
    });
  });
});
