"""
Detailed timing analysis to measure exact time spent in each operation.
"""

import time


def find_duplicates_instrumented(items):
    """
    Instrumented version of find_duplicates that measures time spent
    in each operation.
    """
    duplicates = []

    time_comparisons = 0
    time_not_in = 0
    time_append = 0

    comparison_count = 0
    not_in_count = 0
    append_count = 0

    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            # Time the equality comparison
            start = time.perf_counter()
            is_equal = items[i] == items[j]
            time_comparisons += time.perf_counter() - start
            comparison_count += 1

            if is_equal:
                # Time the 'not in' check
                start = time.perf_counter()
                not_present = items[i] not in duplicates
                time_not_in += time.perf_counter() - start
                not_in_count += 1

                if not_present:
                    # Time the append
                    start = time.perf_counter()
                    duplicates.append(items[i])
                    time_append += time.perf_counter() - start
                    append_count += 1

    return (
        duplicates,
        {
            "comparisons": {
                "count": comparison_count,
                "time": time_comparisons,
                "avg": time_comparisons / comparison_count if comparison_count > 0 else 0,
            },
            "not_in_checks": {
                "count": not_in_count,
                "time": time_not_in,
                "avg": time_not_in / not_in_count if not_in_count > 0 else 0,
            },
            "appends": {
                "count": append_count,
                "time": time_append,
                "avg": time_append / append_count if append_count > 0 else 0,
            },
        },
    )


def analyze_timing(dataset_size):
    """Analyze timing for a specific dataset size"""
    print(f"\n{'=' * 80}")
    print(f"Timing Analysis - Dataset Size: {dataset_size}")
    print(f"{'=' * 80}")

    # Create test data
    test_data = list(range(dataset_size // 2)) + list(range(dataset_size // 2))

    # Run instrumented function
    start_total = time.perf_counter()
    result, stats = find_duplicates_instrumented(test_data)
    total_time = time.perf_counter() - start_total

    print(f"\nTotal execution time: {total_time * 1000:.2f} ms")
    print(f"Duplicates found: {len(result)}")

    print(f"\n{'Operation':<20} {'Count':<15} {'Total Time (ms)':<20} {'Avg Time (µs)':<20} {'% of Total':<15}")
    print("-" * 95)

    for op_name, op_data in stats.items():
        count = op_data["count"]
        op_time = op_data["time"]
        avg_time = op_data["avg"] * 1_000_000  # Convert to microseconds
        percent = (op_time / total_time * 100) if total_time > 0 else 0

        display_name = op_name.replace("_", " ").title()
        print(
            f"{display_name:<20} {count:<15,} {op_time * 1000:<20.4f} {avg_time:<20.6f} {percent:<15.1f}%"
        )

    # Calculate overhead
    measured_time = sum(s["time"] for s in stats.values())
    overhead = total_time - measured_time
    overhead_pct = (overhead / total_time * 100) if total_time > 0 else 0
    print(
        f"{'Overhead':<20} {'':<15} {overhead * 1000:<20.4f} {'':<20} {overhead_pct:<15.1f}%"
    )

    # Calculate theoretical complexity
    expected_comparisons = dataset_size * (dataset_size - 1) // 2
    print(f"\n📊 Complexity Analysis:")
    print(f"   Expected comparisons (O(n²)): {expected_comparisons:,}")
    print(f"   Actual comparisons: {stats['comparisons']['count']:,}")
    print(f"   'not in' checks: {stats['not_in_checks']['count']:,}")

    # Estimate cost of 'not in' operation
    if stats['not_in_checks']['count'] > 0:
        avg_list_size = len(result) // 2
        estimated_not_in_ops = stats['not_in_checks']['count'] * avg_list_size
        print(f"   Average duplicates list size during execution: ~{avg_list_size}")
        print(f"   Estimated 'not in' list scans: ~{estimated_not_in_ops:,}")


if __name__ == "__main__":
    print("=" * 80)
    print("DETAILED TIMING ANALYSIS OF find_duplicates")
    print("=" * 80)
    print("\nThis analysis instruments the function to measure time spent in each operation.")
    print("Note: Instrumentation adds overhead, but relative times are meaningful.")

    # Test with increasing sizes
    for size in [100, 500, 1000, 2000]:
        analyze_timing(size)

    print("\n" + "=" * 80)
    print("KEY FINDINGS")
    print("=" * 80)
    print("\n1. NESTED LOOPS: O(n²) comparisons dominate at scale")
    print("2. 'not in' CHECKS: Each duplicate triggers O(m) list scan")
    print("3. COMBINED COMPLEXITY: O(n²) + O(n·m) where m = duplicates found")
    print("4. As dataset grows, both factors compound the performance problem")
