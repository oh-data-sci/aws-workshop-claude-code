#!/usr/bin/env node

/**
 * PostToolUse Hook: Validate Blog Post Frontmatter
 *
 * This hook runs after Write/Edit operations to validate that blog posts
 * in content/posts/ have proper frontmatter with all required fields.
 *
 * JSON Input Structure (via stdin):
 * {
 *   "tool_name": "Write" | "Edit",
 *   "tool_input": { "file_path": "/path/to/file" },
 *   "hook_event_name": "PostToolUse",
 *   ...
 * }
 *
 * Exit Codes:
 * - 0: Validation passed or file should be skipped
 * - 2: Validation failed (stderr message shown to Claude)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Read JSON from stdin
let inputData = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    const filePath = data.tool_input?.file_path;

    if (!filePath) {
      console.error('Error: No file_path found in tool_input');
      process.exit(1);
    }

    // Only process files in content/posts/ directory
    if (!filePath.includes('content/posts/')) {
      process.exit(0); // Not a blog post, skip validation
    }

    // Only process .md and .mdx files
    const ext = path.extname(filePath);
    if (ext !== '.md' && ext !== '.mdx') {
      process.exit(0); // Not a markdown file, skip validation
    }

    // Read the file from disk
    let fileContent;
    try {
      fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }

    // Parse frontmatter
    let parsed;
    try {
      parsed = matter(fileContent);
    } catch (err) {
      console.error(`❌ Failed to parse frontmatter: ${err.message}`);
      process.exit(2);
    }

    const frontmatter = parsed.data;
    const errors = [];

    // Validate required fields
    validateTitle(frontmatter, errors);
    validateDate(frontmatter, errors);
    validateAuthor(frontmatter, errors);
    validateExcerpt(frontmatter, errors);
    validateCategory(frontmatter, errors);
    validateTags(frontmatter, errors);
    validatePublished(frontmatter, errors);

    // If there are validation errors, report them and exit with code 2
    if (errors.length > 0) {
      console.error('\n❌ Blog post frontmatter validation failed:\n');
      console.error(`File: ${path.basename(filePath)}\n`);
      errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
      console.error('\n📝 Please fix the frontmatter and try again.\n');
      process.exit(2);
    }

    // Validation passed
    process.exit(0);

  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    process.exit(1);
  }
});

/**
 * Validation Functions
 */

function validateTitle(frontmatter, errors) {
  if (!frontmatter.title) {
    errors.push('Missing required field: "title"');
  } else if (typeof frontmatter.title !== 'string') {
    errors.push(`Invalid "title": expected string, got ${typeof frontmatter.title}`);
  } else if (frontmatter.title.trim().length === 0) {
    errors.push('Invalid "title": cannot be empty');
  } else if (frontmatter.title.length < 5) {
    errors.push(`Invalid "title": too short (${frontmatter.title.length} chars). Minimum 5 characters recommended.`);
  } else if (frontmatter.title.length > 100) {
    errors.push(`Invalid "title": too long (${frontmatter.title.length} chars). Maximum 100 characters recommended.`);
  }
}

function validateDate(frontmatter, errors) {
  if (!frontmatter.date) {
    errors.push('Missing required field: "date"');
  } else if (typeof frontmatter.date !== 'string') {
    errors.push(`Invalid "date": expected string in YYYY-MM-DD format, got ${typeof frontmatter.date}`);
  } else {
    // Validate YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(frontmatter.date)) {
      errors.push(`Invalid "date": expected YYYY-MM-DD format, got "${frontmatter.date}"`);
    } else {
      // Validate it's a valid date
      const dateObj = new Date(frontmatter.date);
      if (isNaN(dateObj.getTime())) {
        errors.push(`Invalid "date": "${frontmatter.date}" is not a valid date`);
      }
      // Check if date is not in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateObj > today) {
        errors.push(`Invalid "date": "${frontmatter.date}" is in the future. Use today's date or earlier.`);
      }
    }
  }
}

function validateAuthor(frontmatter, errors) {
  if (!frontmatter.author) {
    errors.push('Missing required field: "author"');
  } else if (typeof frontmatter.author !== 'string') {
    errors.push(`Invalid "author": expected string, got ${typeof frontmatter.author}`);
  } else if (frontmatter.author.trim().length === 0) {
    errors.push('Invalid "author": cannot be empty');
  }
}

function validateExcerpt(frontmatter, errors) {
  if (!frontmatter.excerpt) {
    errors.push('Missing required field: "excerpt"');
  } else if (typeof frontmatter.excerpt !== 'string') {
    errors.push(`Invalid "excerpt": expected string, got ${typeof frontmatter.excerpt}`);
  } else if (frontmatter.excerpt.trim().length === 0) {
    errors.push('Invalid "excerpt": cannot be empty');
  } else if (frontmatter.excerpt.length < 50) {
    errors.push(`Invalid "excerpt": too short (${frontmatter.excerpt.length} chars). Minimum 50 characters recommended.`);
  } else if (frontmatter.excerpt.length > 200) {
    errors.push(`Invalid "excerpt": too long (${frontmatter.excerpt.length} chars). Maximum 200 characters recommended.`);
  }
}

function validateCategory(frontmatter, errors) {
  const validCategories = [
    'Bedrock',
    'Infrastructure',
    'MCP',
    'CI/CD',
    'Best Practices'
  ];

  if (!frontmatter.category) {
    errors.push(`Missing required field: "category". Valid options: ${validCategories.join(', ')}`);
  } else if (typeof frontmatter.category !== 'string') {
    errors.push(`Invalid "category": expected string, got ${typeof frontmatter.category}`);
  } else if (!validCategories.includes(frontmatter.category)) {
    errors.push(`Invalid "category": "${frontmatter.category}". Valid options: ${validCategories.join(', ')}`);
  }
}

function validateTags(frontmatter, errors) {
  if (!frontmatter.tags) {
    errors.push('Missing required field: "tags" (can be empty array [])');
  } else if (!Array.isArray(frontmatter.tags)) {
    errors.push(`Invalid "tags": expected array, got ${typeof frontmatter.tags}`);
  } else {
    if (frontmatter.tags.length > 5) {
      errors.push(`Invalid "tags": too many tags (${frontmatter.tags.length}). Maximum 5 tags recommended.`);
    }
    // Validate each tag is a string
    frontmatter.tags.forEach((tag, index) => {
      if (typeof tag !== 'string') {
        errors.push(`Invalid "tags[${index}]": expected string, got ${typeof tag}`);
      } else if (tag.trim().length === 0) {
        errors.push(`Invalid "tags[${index}]": tag cannot be empty`);
      }
    });
  }
}

function validatePublished(frontmatter, errors) {
  // published is optional, but if present, must be boolean
  if (frontmatter.published !== undefined && typeof frontmatter.published !== 'boolean') {
    errors.push(`Invalid "published": expected boolean (true/false), got ${typeof frontmatter.published} (${frontmatter.published})`);
  }
}
