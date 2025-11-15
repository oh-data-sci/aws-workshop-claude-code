---
description: Generate a new AWS-themed blog post with standardized structure
---

Generate a new AWS-themed blog post in the `content/posts/` directory with the following specifications:

## Parameters

- `[topic]` - The topic/title for the blog post (required)
- `[category]` - The category for the post (optional, default: "Bedrock")

## File Naming

Create the file with the format: `YYYY-MM-DD-topic-slug.mdx`

- Use today's date in YYYY-MM-DD format
- Convert the topic to a URL-friendly slug (lowercase, hyphens instead of spaces)
- **IMPORTANT**: File extension must be `.mdx` (not `.md`)

## Frontmatter Structure

Include the following YAML frontmatter at the top of the file:

```yaml
---
title: "[Derived from topic parameter]"
date: "[Today's date in YYYY-MM-DD format]"
author: "AWS Developer"
excerpt: "[Brief 1-2 sentence description of the post]"
category: "[From category parameter, default: Bedrock]"
tags: ["AWS", "Claude Code", "[topic-related tags]"]
published: false
---
```

## Post Structure

Create an AWS-themed blog post with the following sections:

### Introduction
- Brief overview of the topic
- Why it matters for AWS developers
- What readers will learn

### Prerequisites
- Required AWS services or accounts
- Tools and dependencies needed
- Prior knowledge assumptions

### Step-by-Step Guide
- Detailed implementation instructions
- Code examples with explanations
- AWS-specific configurations

### Best Practices
- Recommended approaches
- Performance optimization tips
- Security considerations
- Cost optimization strategies

### Common Pitfalls
- Frequent mistakes to avoid
- Troubleshooting tips
- Known limitations

### Conclusion
- Summary of what was covered
- Key takeaways
- Next steps for readers

### Further Reading
- Links to relevant AWS documentation
- Related blog posts
- Additional resources

## Writing Style

- Use professional, technical tone
- Include code examples where relevant
- Reference AWS services and features accurately
- Add helpful tips and warnings using markdown callouts
- Use proper markdown formatting (headers, lists, code blocks)

## After Creation

After creating the file:
1. Confirm the file path and name
2. Show a preview of the frontmatter
3. Remind the user to update `published: true` when ready to publish
