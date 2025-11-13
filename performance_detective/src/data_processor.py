"""
Data processing module with intentionally inefficient implementations.
These functions are designed to demonstrate performance bottlenecks
that can be identified and optimized using Claude Code.
"""

from collections import Counter


def find_duplicates(items):
    """
    Find all duplicate items in a list.

    Optimized implementation: O(n) using hash-based sets
    Uses two sets for O(1) membership testing and insertion

    Args:
        items: List of items to check for duplicates

    Returns:
        List of duplicate items (each duplicate appears once)
    """
    seen = set()
    duplicates = set()

    for item in items:
        if item in seen:
            # Already seen, so it's a duplicate
            duplicates.add(item)
        else:
            # First time seeing this item
            seen.add(item)

    return list(duplicates)


def calculate_statistics(data):
    """
    Calculate mean, median, and mode from a list of numbers.

    Optimized implementation: O(n log n) overall
    - Mean: O(n) single pass
    - Median: O(n log n) sorting required
    - Mode: O(n) using Counter hash table

    Args:
        data: List of numeric values

    Returns:
        Dictionary with 'mean', 'median', and 'mode' keys
    """
    if not data:
        return {"mean": None, "median": None, "mode": None}

    # Calculate mean - O(n)
    mean = sum(data) / len(data)

    # Calculate median - O(n log n) for sorting
    sorted_data = sorted(data)
    n = len(sorted_data)
    if n % 2 == 1:
        median = sorted_data[n // 2]
    else:
        median = (sorted_data[n // 2 - 1] + sorted_data[n // 2]) / 2

    # Calculate mode - O(n) using Counter
    # Counter builds a hash table in single pass: O(n)
    # most_common(1) finds the maximum: O(n)
    counts = Counter(data)
    mode = counts.most_common(1)[0][0]

    return {"mean": mean, "median": median, "mode": mode}


def filter_and_transform(data, threshold):
    """
    Filter data above threshold and apply transformation.

    Current implementation: O(n·m) where m is string length
    Issues:
    - String concatenation in loop creates new string each time
    - Inefficient str() conversion and character iteration

    Args:
        data: List of numeric values
        threshold: Minimum value to include

    Returns:
        List of transformed string values
    """
    result = []
    for item in data:
        if item > threshold:
            # Inefficient: Creates new string object on each concatenation
            transformed = ""
            for char in str(item):
                transformed = transformed + char.upper()
            result.append(transformed)
    return result


def process_large_dataset(data, operations):
    """
    Apply multiple operations to a dataset.

    This function combines all the inefficiencies above for
    demonstration purposes on larger datasets.

    Args:
        data: List of numeric values
        operations: List of operation names to perform

    Returns:
        Dictionary with results of each operation
    """
    results = {}

    if "duplicates" in operations:
        results["duplicates"] = find_duplicates(data)

    if "statistics" in operations:
        results["statistics"] = calculate_statistics(data)

    if "filter" in operations:
        threshold = sum(data) / len(data)  # Use mean as threshold
        results["filtered"] = filter_and_transform(data, threshold)

    return results
