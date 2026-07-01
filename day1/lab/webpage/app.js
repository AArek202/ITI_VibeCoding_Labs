document.getElementById("sortBtn").addEventListener("click", () => {
  const inputStr = document.getElementById("arrayInput").value;
  const algo = document.getElementById("algoSelect").value;

  const originalArray = inputStr
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  if (originalArray.length === 0) {
    alert("Please enter a valid list of numbers separated by commas.");
    return;
  }

  const arrayToSort = [...originalArray];
  let result = [];

  const t0 = performance.now();

  switch (algo) {
    case "naive":
      result = quickSort(arrayToSort);
      break;
    case "enhanced":
      result = quickSortEnhanced(arrayToSort);
      break;
    case "inplace":
      result = quickSortInPlace(arrayToSort);
      break;
    case "iterative":
      result = quickSortIterative(arrayToSort);
      break;
  }

  const t1 = performance.now();

  document.getElementById("originalDisplay").textContent =
    `[ ${originalArray.join(", ")} ]`;
  document.getElementById("sortedDisplay").textContent =
    `[ ${result.join(", ")} ]`;
  document.getElementById("timeDisplay").textContent = (t1 - t0).toFixed(4);

  document.getElementById("resultsBox").classList.remove("hidden");
});
