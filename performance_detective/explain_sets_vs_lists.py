"""
Demonstration: Why sets are faster than lists for membership testing.
This explains the underlying data structure differences.
"""

import time
import random


def visualize_list_search():
    """Show how list membership testing works"""
    print("=" * 80)
    print("HOW LISTS WORK: Linear Search")
    print("=" * 80)
    print("""
When you check 'if x in my_list', Python must:
1. Start at index 0
2. Check if my_list[0] == x
3. If not, move to my_list[1]
4. Check if my_list[1] == x
5. Continue until found or reach the end

Example: Looking for 7 in [3, 1, 4, 1, 5, 9, 2, 6, 5, 7]
         ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
         1  2  3  4  5  6  7  8  9  10 checks required!

Best case:  Item is first → 1 comparison
Worst case: Item is last or not present → n comparisons
Average:    n/2 comparisons

Time Complexity: O(n) - scales linearly with list size
""")


def visualize_set_search():
    """Show how set membership testing works"""
    print("=" * 80)
    print("HOW SETS WORK: Hash Table Lookup")
    print("=" * 80)
    print("""
Sets are implemented as hash tables. When you check 'if x in my_set':

1. Calculate hash(x) - converts value to an integer
2. Use hash to compute bucket index: hash(x) % table_size
3. Look directly at that bucket
4. Done! (with occasional collision handling)

Example: Looking for 7 in {3, 1, 4, 1, 5, 9, 2, 6, 5, 7}

hash(7) → 7 (simplified)
Index: 7 % 10 = bucket 7

Memory layout (conceptual):
Bucket:  0    1    2    3    4    5    6    7    8    9
Value:   -    1    2    3    4    5    6    7    -    9
                                        ^
                              Found in 1 step!

Best case:    1 hash computation + 1 lookup
Average case: 1 hash computation + 1 lookup
Worst case:   1 hash computation + few collision checks

Time Complexity: O(1) - constant time regardless of set size!
""")


def demonstrate_performance():
    """Benchmark the actual difference"""
    print("=" * 80)
    print("PERFORMANCE DEMONSTRATION")
    print("=" * 80)
    print("\nSearching for items in increasingly large collections...\n")

    sizes = [100, 1000, 10000, 100000]

    print(f"{'Size':<10} {'List (ms)':<15} {'Set (ms)':<15} {'Speedup':<15}")
    print("-" * 55)

    for size in sizes:
        # Create test data
        data = list(range(size))
        test_list = data.copy()
        test_set = set(data)

        # Items to search for (mix of present and absent)
        num_searches = min(1000, size)
        search_items = random.sample(range(size * 2), num_searches)

        # Time list searches
        start = time.perf_counter()
        for item in search_items:
            _ = item in test_list
        list_time = time.perf_counter() - start

        # Time set searches
        start = time.perf_counter()
        for item in search_items:
            _ = item in test_set
        set_time = time.perf_counter() - start

        speedup = list_time / set_time if set_time > 0 else float('inf')

        print(f"{size:<10,} {list_time*1000:<15.4f} {set_time*1000:<15.4f} {speedup:<15.1f}x")


def explain_hash_function():
    """Show how hashing works"""
    print("\n" + "=" * 80)
    print("HOW HASH FUNCTIONS WORK")
    print("=" * 80)
    print("""
A hash function converts any value into an integer:

Example hashes in Python:
""")

    examples = [7, "hello", (1, 2, 3), 42, "world", 1000000]

    print(f"{'Value':<15} {'Type':<15} {'Hash':<20}")
    print("-" * 50)
    for val in examples:
        print(f"{str(val):<15} {type(val).__name__:<15} {hash(val):<20}")

    print("""
Key properties of hash functions:
1. Same input always produces same output: hash(7) = hash(7)
2. Fast to compute: O(1) operation
3. Distributes values evenly across buckets
4. Even small changes produce different hashes: hash(7) ≠ hash(8)
""")


def explain_memory_tradeoff():
    """Discuss the memory cost"""
    print("=" * 80)
    print("TRADE-OFFS: Memory vs Speed")
    print("=" * 80)
    print("""
Lists:
  ✓ Memory efficient: Only stores items sequentially
  ✗ Slow lookups: O(n) must scan through items
  ✓ Maintains insertion order
  ✓ Allows duplicates
  ✓ Allows indexing: my_list[5]

Sets:
  ✓ Fast lookups: O(1) hash-based direct access
  ✗ More memory: Needs hash table with extra space (load factor ~2/3)
  ✗ No order guarantee (until Python 3.7, maintains insertion order)
  ✗ No duplicates allowed
  ✗ No indexing: can't do my_set[5]

Memory comparison:
""")

    import sys

    sizes = [100, 1000, 10000]
    print(f"{'Size':<10} {'List (bytes)':<20} {'Set (bytes)':<20} {'Ratio':<15}")
    print("-" * 65)

    for size in sizes:
        data = list(range(size))
        test_list = data.copy()
        test_set = set(data)

        list_size = sys.getsizeof(test_list)
        set_size = sys.getsizeof(test_set)
        ratio = set_size / list_size

        print(f"{size:<10,} {list_size:<20,} {set_size:<20,} {ratio:<15.2f}x")


def explain_our_case():
    """Apply this to our find_duplicates function"""
    print("\n" + "=" * 80)
    print("APPLYING THIS TO find_duplicates")
    print("=" * 80)
    print("""
Current code (SLOW):
    duplicates = []                           # List
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j] and items[i] not in duplicates:
                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                     O(n) scan through duplicates list!
                duplicates.append(items[i])

For 10,000 items with 5,000 duplicates:
- The 'not in' check happens 5,000 times
- Each check scans through duplicates list (average size ~2,500)
- Total operations: ~12.5 million list element comparisons

Optimized code (FAST):
    seen = set()                              # Set
    duplicates = set()                        # Set
    for item in items:                        # O(n) single pass
        if item in seen:                      # O(1) hash lookup!
               ^^^^^^^^^^^^
               Direct hash table access!
            duplicates.add(item)              # O(1) hash insert!
        else:
            seen.add(item)                    # O(1) hash insert!

For 10,000 items:
- Single pass: 10,000 iterations
- Each 'in' check: O(1) hash lookup
- Each 'add': O(1) hash insert
- Total: ~10,000 operations

Improvement: 12,500,000 operations → 10,000 operations = 1,250x fewer operations!
Expected speedup: ~500-1000x faster in practice
""")


if __name__ == "__main__":
    print("\n")
    print("╔" + "=" * 78 + "╗")
    print("║" + " " * 20 + "SETS vs LISTS: MEMBERSHIP TESTING" + " " * 25 + "║")
    print("╚" + "=" * 78 + "╝")
    print()

    visualize_list_search()

    visualize_set_search()

    explain_hash_function()

    demonstrate_performance()

    explain_memory_tradeoff()

    explain_our_case()

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print("""
Lists use LINEAR SEARCH:  O(n) - must check each item sequentially
Sets use HASH TABLES:     O(1) - direct access via hash computation

For membership testing ('in' operator):
- Lists: Slow but memory-efficient
- Sets:  Fast but uses more memory

For find_duplicates with 10,000 items:
- Current (lists): ~1.1 seconds
- Optimized (sets): ~0.001 seconds (expected)
- Speedup: ~1000x faster! 🚀
""")
