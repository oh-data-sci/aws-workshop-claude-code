"""
Profiling script for find_duplicates function.
Uses cProfile and line_profiler to identify bottlenecks.
"""

import cProfile
import pstats
from io import StringIO
from src.data_processor import find_duplicates


def profile_with_cprofile():
    """Use cProfile to analyze function calls"""
    print("=" * 80)
    print("cProfile Analysis - Medium Dataset (1,000 items)")
    print("=" * 80)

    # Create medium dataset
    test_data = list(range(500)) + list(range(500))

    # Profile the function
    profiler = cProfile.Profile()
    profiler.enable()
    result = find_duplicates(test_data)
    profiler.disable()

    # Print stats
    s = StringIO()
    ps = pstats.Stats(profiler, stream=s).sort_stats('cumulative')
    ps.print_stats()
    print(s.getvalue())

    print(f"\nResult: Found {len(result)} duplicates\n")


def profile_with_cprofile_large():
    """Use cProfile on large dataset to see scaling"""
    print("=" * 80)
    print("cProfile Analysis - Large Dataset (10,000 items)")
    print("=" * 80)

    # Create large dataset
    test_data = list(range(5000)) + list(range(5000))

    # Profile the function
    profiler = cProfile.Profile()
    profiler.enable()
    result = find_duplicates(test_data)
    profiler.disable()

    # Print stats
    s = StringIO()
    ps = pstats.Stats(profiler, stream=s).sort_stats('cumulative')
    ps.print_stats()
    print(s.getvalue())

    print(f"\nResult: Found {len(result)} duplicates\n")


def analyze_complexity():
    """Analyze the computational complexity by counting operations"""
    print("=" * 80)
    print("Complexity Analysis - Operation Counting")
    print("=" * 80)

    for size in [100, 500, 1000, 2000]:
        test_data = list(range(size // 2)) + list(range(size // 2))

        # Count operations manually
        comparisons = 0
        list_lookups = 0

        duplicates = []
        for i in range(len(test_data)):
            for j in range(i + 1, len(test_data)):
                comparisons += 1
                if test_data[i] == test_data[j]:
                    # This triggers a 'not in' check
                    list_lookups += 1
                    if test_data[i] not in duplicates:
                        duplicates.append(test_data[i])

        # Calculate expected O(n²) comparisons
        expected_comparisons = size * (size - 1) // 2

        print(f"\nDataset size: {size}")
        print(f"  Comparisons (i==j checks): {comparisons:,}")
        print(f"  Expected O(n²): {expected_comparisons:,}")
        print(f"  'not in' list lookups: {list_lookups:,}")
        print(f"  Final duplicates found: {len(duplicates)}")

        # Estimate time complexity
        # Each 'not in' check is O(m) where m is current size of duplicates list
        avg_duplicate_size = len(duplicates) // 2 if len(duplicates) > 0 else 0
        estimated_lookup_ops = list_lookups * avg_duplicate_size
        print(f"  Estimated 'not in' operations: ~{estimated_lookup_ops:,}")


if __name__ == "__main__":
    # Run complexity analysis first
    analyze_complexity()

    # Run cProfile on medium dataset
    profile_with_cprofile()

    # Run cProfile on large dataset (this will take ~1 second)
    print("\nRunning large dataset profiling (this takes ~1 second)...")
    profile_with_cprofile_large()

    print("\n" + "=" * 80)
    print("PROFILING COMPLETE")
    print("=" * 80)
    print("\nKey findings:")
    print("1. Check the number of comparisons - should be O(n²)")
    print("2. Look for 'not in' operations on the duplicates list")
    print("3. These two operations combined create the bottleneck")
