# Lab Folder Documentation

This folder contains a small QuickSort learning project with implementations, tests, notes, and a simple web page demo.

## Files and Folders

### [quicksort.js](quicksort.js)
- Main JavaScript file for the QuickSort exercise.
- Contains multiple QuickSort implementations:
  - `quickSort` for a basic recursive version
  - `quickSortEnhanced` for an optimized version
  - `quickSortInPlace` for an in-place recursive implementation
  - `quickSortIterative` for an iterative version
- Also exports the functions for testing.

### [quickSort.test.js](quickSort.test.js)
- Jest-style test file for the QuickSort implementations.
- Verifies sorting behavior for:
  - empty arrays
  - single-element arrays
  - sorted and reverse-sorted input
  - duplicate values
  - a sample dataset
  - a larger random dataset

### [comparison.txt](comparison.txt)
- Contains a short comparison between recursive and iterative QuickSort approaches.
- Notes differences in stack usage and resilience to large inputs.

### [explaination.txt](explaination.txt)
- Stores explanatory notes related to how QuickSort works and its time/space complexity.
- Useful as a reference for understanding the algorithm.

### [webpage](webpage)
- A simple browser-based QuickSort demo.
- Includes HTML, CSS, JavaScript, and a prompt file for the UI.

#### [webpage/index.html](webpage/index.html)
- Main page structure for the QuickSort dashboard.
- Contains the input field, algorithm selector, and result display area.

#### [webpage/style.css](webpage/style.css)
- Styles the web page with a clean, modern layout.
- Defines colors, spacing, buttons, and result box appearance.

#### [webpage/app.js](webpage/app.js)
- Handles user input and runs the selected QuickSort implementation.
- Displays the original array, sorted array, and execution time.

#### [webpage/prompt.txt](webpage/prompt.txt)
- Contains the prompt text used to generate the web page implementation.

## Purpose of the Lab

This lab is intended to help understand and compare different versions of QuickSort, including:
- recursive vs iterative implementations
- out-of-place vs in-place sorting
- basic and enhanced algorithm variants

## Suggested Next Steps
- Open [quicksort.js](quicksort.js) to study the implementations.
- Run the tests in [quickSort.test.js](quickSort.test.js).
- Open [webpage/index.html](webpage/index.html) in a browser to try the interactive demo.
