# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a blog about using Claude Code with AWS Bedrock. The blog teaches developers how to use Claude Code for AWS development, with posts about:

- **Bedrock Integration**: Connecting Claude Code to AWS Bedrock for production AI applications
- **MCP Servers**: Using Model Context Protocol servers to extend Claude Code capabilities
- **CI/CD**: Implementing continuous integration and deployment workflows with Claude Code
- **Best Practices**: AWS development patterns, security, and optimization techniques

The blog is built with Next.js 14 and showcases modern web development with AWS branding. It is built progressively during the AWS Claude Code workshop and serves as hands-on practice for workshop participants.

## Architecture

This is a Next.js 14 App Router application with the following key architectural decisions:

- **Rendering Strategy**: React Server Components by default, client components only when necessary
- **Styling**: Tailwind CSS 4 with AWS custom theme colors defined in `globals.css`
- **Content Management**: Markdown files in `content/posts/` with gray-matter for frontmatter parsing
- **Markdown Rendering**: react-markdown with remark-gfm for GitHub-flavored markdown support
- **Deployment**: Designed for CloudFront proxy with path-stripping rewrites
- **Type Safety**: TypeScript with strict mode enabled
- **Inline Styles Approach**: `app/layout.tsx` uses inline `<style>` tags to bypass MIME type issues when serving CSS through the CloudFront proxy in the workshop environment

## Development Workflow

### Running the Application

```bash
npm install        # Install dependencies
npm run dev        # Start development server (binds to 0.0.0.0:3000 for CloudFront access)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Important Environment Notes

- **Local development**: `http://localhost:3000`
- **Workshop access**: `https://{cloudfront-url}/proxy/3000/`
- Dev server binds to `0.0.0.0` to allow CloudFront proxy access in AWS workshop environment

## Design Requirements

### Core Specifications

- **Primary Color**: AWS Orange (`#FF9900`)
- **Secondary Color**: AWS Dark (`#232F3E`)
- **Aesthetic**: Professional, technical aesthetic inspired by AWS documentation
- **Responsive Design**: Mobile-first approach
- **Rendering**: Server-side rendering only (no client JavaScript)

### Color Palette

- **AWS Orange** (`#FF9900`): Primary accent color for buttons, CTAs, links, highlights
- **AWS Dark** (`#232F3E`): Headers, primary text, dark backgrounds
- **AWS Blue** (`#146EB4`): Links, secondary accents, information elements
- **AWS Light Gray** (`#F2F3F3`): Light backgrounds, borders, dividers
- **AWS Dark Gray** (`#545B64`): Secondary text, muted elements

### Aesthetic Guidelines

- Professional, technical aesthetic inspired by AWS documentation
- Clean, minimalist layouts with clear visual hierarchy
- Use ample whitespace for readability
- Typography should be functional and legible
- Components should feel like AWS console and documentation

### Typography

- **Body Text**: System sans-serif fonts, 16px base size, 1.6 line height
- **Headings**: 1.2 line height
- **Code**: Fira Code or monospace fallback

### Responsive Design (Mobile-First)

- **Mobile**: < 768px (single column, stack elements)
- **Tablet**: 768px - 1024px (2-column layouts where appropriate)
- **Desktop**: > 1024px (full layouts, wider content areas)

### Rendering Strategy

- **Server-side rendering only** - Use React Server Components exclusively
- **No client JavaScript** - Do NOT add "use client" directives unless absolutely necessary
- All components should be server components by default
- No interactive features that require client-side JavaScript (no onClick, useState, useEffect, etc.)
- Static, fast-loading pages optimized for SEO and performance

## AWS Theme Usage

When building components, always reference the AWS color palette:

```typescript
// Example: AWS-themed button
<button className="bg-aws-orange hover:bg-aws-blue text-white px-6 py-3 rounded-lg">
  Call to Action
</button>

// Example: AWS-themed heading
<h1 className="text-aws-dark font-bold text-4xl">
  Heading Text
</h1>

// Example: AWS-themed link
<a href="#" className="text-aws-blue hover:text-aws-orange">
  Learn More
</a>
```

## CloudFront Proxy Architecture

### CRITICAL: How the Proxy Works

This project runs behind a CloudFront proxy with specific path-stripping behavior that affects navigation:

**Public URL Structure:**
```
https://{cloudfront-url}/proxy/3000/
```

**Path Stripping Behavior:**
- User visits: `https://{cloudfront-url}/proxy/3000/posts/slug`
- CloudFront strips prefix and forwards to Next.js as: `/posts/slug`
- Next.js receives requests WITHOUT the `/proxy/3000/` prefix
- Next.js routes are defined without the prefix (e.g., `app/posts/[slug]/page.tsx`)

**Navigation Requirements:**
- ALL `Link` components must output full paths: `/proxy/3000/posts/slug`
- Create a `withBasePath()` helper in `app/lib/basePath.ts` when building navigation
- Example: `<Link href={withBasePath('/posts/slug')}>`
- The helper should add `/proxy/3000/` to all internal navigation URLs

**Configuration Approach:**
- ✅ DO use `next.config.js` rewrites for server-side routing
- ✅ DO use `withBasePath()` helper for all Link hrefs
- ❌ DO NOT use `basePath` in `next.config.js` (won't work with path stripping)
- ❌ DO NOT hardcode proxy path in route files

**Why This Approach:**
CloudFront strips the prefix before Next.js sees the request, so `basePath` doesn't work. Instead:
1. Server-side: Next.js routes handle requests at `/` and `/posts/[slug]`
2. Client-side: Links must include `/proxy/3000/` so browsers navigate to correct URLs
3. The `withBasePath()` helper bridges this gap

## Blog Post Structure

Blog posts should use frontmatter with the following structure:

```markdown
---
title: "Post Title"
date: "2025-10-22"
author: "Author Name"
excerpt: "Brief description of the post"
category: "Category Name"
tags: ["tag1", "tag2"]
published: false
---

Your markdown content here...
```

## Key Files

### Configuration

@package.json - Defines project dependencies (Next.js 14, React 18, Tailwind CSS 4, markdown processing libraries like gray-matter, react-markdown, and remark-gfm), npm scripts (dev, build, start, lint, format), and project metadata.

@next.config.js - Configures CloudFront proxy with path-stripping rewrites that map `/proxy/3000/:path*` to `/:path*` for the AWS workshop environment. Also includes security headers (X-Frame-Options, X-Content-Type-Options).

@app/layout.tsx - Root layout component with inline CSS styles (to bypass MIME type issues with CloudFront proxy), AWS theme variables, metadata for SEO, and footer with AWS branding.

- `tsconfig.json` - TypeScript configuration with strict mode

### Core Application

- `app/page.tsx` - Home page with hero section and post list
- `app/globals.css` - Global styles and AWS theme variables (Tailwind CSS 4)
- `app/components/` - Reusable React components (ReadingTimeBadge, Header, etc.)
- `app/lib/readingTime.ts` - Utilities for calculating and formatting reading time
- `app/lib/basePath.ts` - Helper for handling CloudFront proxy paths in navigation

### Content

- `content/posts/` - Blog post markdown files with frontmatter

## Hooks Implementation

### Critical Details for Creating Hooks

**JSON Structure Received by Hooks:** Hooks receive JSON via stdin with this structure:

```json
{
  "session_id": "...",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/path/to/file"
  },
  "hook_event_name": "PreToolUse",
  "cwd": "/project/path"
}
```

**Key Implementation Details:**

- **Extract file path**: Use `.tool_input.file_path` when parsing the JSON
- **Read input**: Use `cat` to read JSON from stdin in bash scripts
- **Exit codes**:
  - Exit code `0` = Allow operation to proceed
  - Exit code `2` = Block operation (stderr message shown to Claude)
  - Other codes = Show error to user but continue
- **Configuration file**: Place hooks configuration in `.claude/settings.json`
- **Script location**: Place hook scripts in the `hooks/` directory
- **Matcher patterns**: Use `"Read|Grep"` to match both Read and Grep tools
- **Command format**: Simple format works best: `"bash hooks/script_name.sh"`
- **Make executable**: Remember to `chmod +x` hook scripts

**Example Configuration Structure:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/your_hook_script.sh"
          }
        ]
      }
    ]
  }
}
```

**Node.js Hooks:** For JavaScript/Node.js hooks, use one of these approaches:

- Add shebang `#!/usr/bin/env node` to script and make executable: `chmod +x hooks/script.js`
- Or use: `"command": "node hooks/script.js"`

**PostToolUse Hooks:**

- Run AFTER Write/Edit operations complete
- File is already saved to disk
- Can read file using Node.js `fs.readFileSync(filePath, 'utf8')`
- File path comes from `tool_input.file_path` in the JSON
- Use exit code 2 to show errors to Claude (Claude will see stderr and can fix issues)
- Use exit code 0 if validation passes

**Available Libraries:** This project includes these npm packages useful for hooks:

- `gray-matter` - Parse YAML frontmatter from markdown files
- `fs` (built-in) - Read files from disk

**Example PostToolUse Hook Structure:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node hooks/your_validation_script.js"
          }
        ]
      }
    ]
  }
}
```

**Environment Variables Available in Hook Commands:**

- `$CLAUDE_PROJECT_DIR`: Project root directory
- `$CLAUDE_EDITED_FILE`: File that was edited/written (for Edit/Write tools)
- `$CLAUDE_TOOL_NAME`: Name of the tool that triggered the hook

## Workshop Context

This project is built progressively through workshop exercises:

- **Exercise 004**: Context management with `/init` and memory mode
- **Exercise 005**: Visual development with screenshots and Plan Mode
- **Exercise 006**: Conversation control and component building
- **Exercise 007**: Custom commands for blog post generation
- **Exercise 008**: MCP servers for visual testing
- **Exercise 009**: GitHub integration and collaboration
- **Exercise 010-012**: Hooks for automation (formatting, validation, protection)
- **Exercise 013**: Multiple hooks composition
- **Exercise 014**: Claude Code SDK integration

### Workshop Structure

The repository contains:
- `starter/` - Initial project template (current working directory)
- `checkpoints/lesson-XXX/` - Completed states for each exercise
- `content/` - Shared assets (branding, diagrams, screenshots, example posts)

## Notes for Claude

When working on this project:

- **Critical**: Server-side rendering only - Do NOT add "use client" directives or client-side JavaScript
- Always maintain the AWS color scheme (use `bg-aws-orange`, `text-aws-dark`, etc.)
- Follow mobile-first responsive design (mobile < 768px, tablet 768-1024px, desktop > 1024px)
- Maintain professional, technical aesthetic inspired by AWS documentation
- Use semantic HTML elements for accessibility
- Layout uses inline styles to bypass MIME type issues with CloudFront proxy
- Add comments for complex logic
- Follow Next.js 14 App Router conventions with React Server Components
- Remember the CloudFront proxy when building navigation (use `withBasePath()` helper)
- Optimize for SEO and fast loading times
- Use TypeScript with proper types
- Test responsively across all breakpoints
