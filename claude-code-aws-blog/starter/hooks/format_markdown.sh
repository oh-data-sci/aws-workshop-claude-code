#!/bin/bash
# Post-tool hook: Format markdown files with Prettier
#
# This hook runs after Write/Edit operations on markdown files.
# It automatically formats the file using Prettier to ensure consistent style.

# Read JSON input from stdin
input=$(cat)

# Extract the file path from the JSON
file_path=$(echo "$input" | jq -r '.tool_input.file_path')

# Check if this is a markdown file
if [[ "$file_path" != *.md ]] && [[ "$file_path" != *.mdx ]]; then
    # Not a markdown file, skip formatting
    exit 0
fi

# Check if file exists (it should, since this is PostToolUse)
if [ ! -f "$file_path" ]; then
    echo "❌ Error: File not found: $file_path" >&2
    exit 2
fi

echo "🎨 Formatting markdown file with Prettier: $file_path" >&2

# Run Prettier to format the file
if npx prettier --write "$file_path" 2>&1; then
    echo "✅ Successfully formatted: $file_path" >&2
    exit 0
else
    echo "❌ Prettier formatting failed for: $file_path" >&2
    echo "Please check the file for syntax errors." >&2
    exit 2
fi
