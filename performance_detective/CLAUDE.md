# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Python-based educational project designed to teach performance optimization through identifying and fixing intentionally inefficient code. The codebase contains functions with common performance bottlenecks (O(n²) algorithms, inefficient data structures, repeated computations) that serve as examples for optimization exercises.

## Essential Commands

### Testing & Benchmarking
```bash
# Run all tests with benchmarks
pytest src/test_performance.py

# Run specific benchmark test
pytest src/test_performance.py::test_find_duplicates_large -v

# Run benchmarks and save results
pytest src/test_performance.py --benchmark-save=baseline

# Compare benchmark results
pytest src/test_performance.py --benchmark-compare=baseline
```

### Environment Setup
```bash
# Install dependencies
pip install -r requirements.txt
```

## Code Architecture

### Core Module: `src/data_processor.py`

Contains four intentionally inefficient functions that demonstrate different performance anti-patterns:

1. **`find_duplicates(items)`** - O(n²) nested loop implementation
   - Uses double iteration to find duplicates
   - Additional inefficiency: `not in` list lookup for duplicates list

2. **`calculate_statistics(data)`** - Multiple O(n) passes with O(n²) mode calculation
   - Mode calculation uses `.count()` inside a loop (O(n²))
   - Makes multiple passes through data for mean, median, mode

3. **`filter_and_transform(data, threshold)`** - O(n·m) string concatenation
   - Inefficient string building using `+` in loop (creates new string each time)
   - Character-by-character iteration

4. **`process_large_dataset(data, operations)`** - Combines all inefficiencies
   - Orchestrates the three functions above based on operations list
   - Used for comprehensive benchmarking

### Test Suite: `src/test_performance.py`

Uses `pytest-benchmark` to measure performance across three dataset sizes:
- **Small**: 100 items (50 unique, duplicated)
- **Medium**: 1,000 items (500 unique, duplicated)
- **Large**: 10,000 items (5,000 unique, duplicated)

Test structure:
- Benchmark tests: Measure execution time for each function at different scales
- Correctness tests: Verify functions produce accurate results (non-benchmarked)

## Performance Optimization Context

When optimizing functions in this codebase:

1. **Preserve correctness**: All existing tests must continue to pass
2. **Expected optimization patterns**:
   - Replace nested loops with hash-based lookups (sets/dicts)
   - Use single-pass algorithms where multiple passes exist
   - Replace string concatenation with `join()` or list comprehensions
   - Leverage built-in functions and data structures (Counter, etc.)

3. **Benchmark comparison workflow**:
   - Save baseline: `pytest --benchmark-save=before`
   - Make optimizations
   - Compare: `pytest --benchmark-compare=before`

## Key Design Note

All inefficiencies are **intentional** and documented in function docstrings. This is an educational codebase where the "bugs" are features for learning purposes.
