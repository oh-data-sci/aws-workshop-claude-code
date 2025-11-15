#!/bin/bash
# PreToolUse hook: Protect sensitive files from being read
#
# This hook runs before Read/Grep operations.
# It blocks access to sensitive files like .env, credentials, private keys, etc.

# Read JSON input from stdin
input=$(cat)

# Extract the file path from the JSON
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Skip if no file path (empty or null)
if [ -z "$file_path" ] || [ "$file_path" = "null" ]; then
    exit 0
fi

# List of protected file patterns
if [[ "$file_path" =~ \.env$ ]] || \
   [[ "$file_path" =~ \.env\. ]] || \
   [[ "$file_path" =~ credentials ]] || \
   [[ "$file_path" =~ secret ]] || \
   [[ "$file_path" =~ \.pem$ ]] || \
   [[ "$file_path" =~ private.*key ]] || \
   [[ "$file_path" =~ \.key$ ]]; then
    echo "🔒 Access denied: Cannot read sensitive file: $file_path" >&2
    echo "This file contains secrets and is protected by hooks." >&2
    echo "If you need to access this file, temporarily disable the hook in .claude/settings.json" >&2
    exit 2  # Block the operation
fi

# Allow operation
exit 0
