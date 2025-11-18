# CLAUDE.md - AI Assistant Guide

## Repository Overview

**Repository Name:** MDR-cosmomed-Izabela-Za-cka-
**Organization:** mdrceoholding
**Purpose:** Procedures and documents repository for IAM POLAND SP Z O.O.
**Primary Content:** School seal templates and official documentation
**Language:** Polish (PL)

This repository contains official documentation, templates, and assets related to IAM POLAND SP Z O.O., specifically focused on school seal (pieczęć szkolna) design and usage guidelines.

## Project Structure

```
MDR-cosmomed-Izabela-Za-cka-/
├── README.md                    # Main repository description
├── INSTRUKCJA-PIECZEC.md       # Detailed seal usage instructions
├── pieczec-szkolna.svg         # School seal template (SVG format)
├── wzor-pieczeci.html          # Interactive preview and documentation
└── CLAUDE.md                   # This file - AI assistant guide
```

## File Descriptions

### Core Files

1. **README.md** (Line: 1-2)
   - Brief repository description
   - States purpose: "Procedury dokumenty"
   - Should remain minimal and direct

2. **INSTRUKCJA-PIECZEC.md** (142 lines)
   - Comprehensive seal usage guide
   - Technical specifications
   - Usage instructions for various contexts
   - Editing and modification guidelines
   - File format compatibility information
   - Version: 1.0 (Created: 2025-10-26)

3. **pieczec-szkolna.svg** (44 lines)
   - Vector graphics file in SVG format
   - Contains official school seal design
   - Dimensions: 300x300 px viewBox
   - Primary color: #003366 (navy blue)
   - Scalable without quality loss

4. **wzor-pieczeci.html** (197 lines)
   - Interactive HTML preview page
   - Multiple size demonstrations (150px, 300px, 450px)
   - Technical specifications display
   - Download functionality
   - Responsive design with CSS styling

### Design Specifications

**School Seal Details:**
- Format: Circular seal in 300x300 px square
- Outer circle radius: 145px (stroke: 3px)
- Inner circle radius: 130px (stroke: 2px)
- Color scheme: #003366 (navy blue) on transparent/white background
- Elements:
  - Top text (curved): "IAM POLAND SP Z O.O."
  - Center symbol: Open book (education symbol)
  - Bottom text: "SZKOŁA"
  - Year: "2025"

## Development Workflows

### Git Branching Strategy

This repository follows a feature branch workflow with AI-assisted development:

1. **Main Branch**
   - Production-ready content
   - Protected branch
   - Receives changes via Pull Requests only

2. **Feature Branches**
   - Pattern: `claude/[descriptive-name]-[session-id]`
   - Example: `claude/create-school-seal-template-011CUUzF4cs43deN3ANzpuZa`
   - Session ID format: Alphanumeric identifier
   - **CRITICAL:** Branch names MUST start with `claude/` and end with matching session ID

3. **Current Working Branch**
   - `claude/claude-md-mi3yolowrf1f0xqq-01N1QX4pXykqnve84kqPBCWD`

### Commit Message Conventions

Based on repository history:

```
Format: [Action] [Brief description] (in Polish)

Examples:
- "Dodano wzór pieczęci szkoły dla IAM POLAND SP Z O.O."
- "Merge pull request #1 from mdrceoholding/[branch-name]"
```

**Guidelines:**
- Use Polish language for commit messages
- Start with action verb (Dodano, Zaktualizowano, Naprawiono, etc.)
- Be specific about what was changed
- Reference entity names when relevant (e.g., "IAM POLAND SP Z O.O.")

### Pull Request Process

1. **Create PR** from feature branch to main
2. **Title:** Descriptive in Polish
3. **Description:** Should include:
   - Summary of changes
   - Purpose/rationale
   - Any breaking changes or important notes
4. **Merge:** After approval, merge to main
5. **Branch cleanup:** Feature branch can be deleted post-merge

### Git Operations Best Practices

**Push Operations:**
```bash
git push -u origin <branch-name>
```
- MUST use branch starting with `claude/` and ending with session ID
- Retry logic: Up to 4 attempts with exponential backoff (2s, 4s, 8s, 16s)
- Watch for 403 errors (indicates branch naming issue)

**Fetch/Pull Operations:**
```bash
git fetch origin <branch-name>
git pull origin <branch-name>
```
- Prefer specific branch fetching over full repository
- Same retry logic as push operations

## Key Conventions

### 1. Language

- **Primary Language:** Polish (Polski)
- All documentation in Polish
- File names may use Polish characters (pieczec, not piecząć in filename)
- Commit messages in Polish
- Comments and instructions in Polish

### 2. File Naming

- Use descriptive, lowercase names
- Separate words with hyphens: `wzor-pieczeci.html`
- Use appropriate extensions: `.md`, `.svg`, `.html`
- Avoid special Polish characters in filenames (use base ASCII)

### 3. Documentation Standards

- Use Markdown for documentation (`.md` files)
- Include clear hierarchical headings (H1, H2, H3)
- Provide code examples where relevant
- Include version information and dates
- Maintain comprehensive instructions for non-technical users

### 4. SVG Files

- Use semantic, well-structured SVG code
- Include XML declaration
- Use viewBox for scalability
- Define reusable elements in `<defs>` section
- Prefer standard fonts (Arial, sans-serif)
- Use descriptive comments for major sections

### 5. HTML Files

- HTML5 standard
- Include proper meta tags (charset UTF-8, viewport)
- Embedded CSS in `<style>` tags
- Responsive design considerations
- Polish language attribute: `lang="pl"`

## AI Assistant Guidelines

### When Working on This Repository

1. **Respect Language Context**
   - Write all new documentation in Polish
   - Maintain existing Polish terminology
   - Don't translate existing content to English unless requested

2. **File Modifications**
   - ALWAYS read files before editing
   - Preserve exact formatting and indentation
   - Maintain existing code style
   - Test SVG changes by validating XML structure

3. **Creating New Content**
   - Follow existing naming conventions
   - Match documentation style of INSTRUKCJA-PIECZEC.md
   - Include version information and dates
   - Provide comprehensive usage instructions

4. **Graphics and Design**
   - Maintain color consistency (#003366 navy blue)
   - Preserve SVG structure and scalability
   - Don't modify core design elements without explicit permission
   - Keep branding elements intact (company name, logos)

5. **Git Operations**
   - Use proper branch naming: `claude/[description]-[session-id]`
   - Write commits in Polish
   - Create detailed PR descriptions
   - Never force push
   - Always verify branch name before pushing

6. **Documentation Updates**
   - Update version numbers when making significant changes
   - Update modification dates
   - Maintain backward compatibility notes
   - Keep examples up-to-date

### Common Tasks

**Adding New Documentation:**
1. Create `.md` file with descriptive name
2. Include proper headings structure
3. Add version and date information
4. Update README.md if necessary
5. Commit with descriptive message in Polish

**Modifying SVG Seal:**
1. Read current `pieczec-szkolna.svg`
2. Make changes preserving structure
3. Validate SVG syntax
4. Update `INSTRUKCJA-PIECZEC.md` if specs changed
5. Update version information
6. Test in `wzor-pieczeci.html` preview

**Updating Instructions:**
1. Read `INSTRUKCJA-PIECZEC.md`
2. Make targeted edits preserving style
3. Update "Ostatnia modyfikacja" date
4. Increment version if major changes
5. Ensure all examples still work

### Testing Considerations

**SVG Files:**
- Validate XML syntax
- Test scalability at different sizes
- Verify colors render correctly
- Check browser compatibility

**HTML Files:**
- Test in modern browsers
- Verify responsive behavior
- Check all links and downloads
- Validate HTML5 structure

**Documentation:**
- Ensure all instructions are accurate
- Verify code examples work
- Check internal references
- Validate external links

## Technical Specifications Reference

### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Navy Blue  | #003366  | Primary (seal, headers, text) |
| White      | #FFFFFF  | Background |
| Light Blue | #e8f4f8  | Instruction boxes background |
| Light Gray | #f5f5f5  | Page background |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Seal top text | Arial, sans-serif | 24px | Bold |
| Seal bottom text | Arial, sans-serif | 16px | Bold |
| Seal year | Arial, sans-serif | 12px | Normal |
| HTML headers | Arial, sans-serif | Various | Normal/Bold |

### File Size Guidelines

- SVG files: Keep under 10KB
- HTML files: Keep under 50KB
- Documentation: No strict limit, prioritize clarity

## Version Control

**Current Version:** 1.0
**Repository Created:** Initial commit f7307ba
**Last Major Update:** 2025-10-26 (Seal template addition)
**CLAUDE.md Version:** 1.0 (2025-11-18)

## Contact and Support

For questions about this repository or AI-assisted development:
- Refer to organizational documentation
- Contact IAM POLAND SP Z O.O. administration
- Review commit history for context
- Check Pull Request discussions

## Quick Reference Commands

```bash
# Check current branch
git branch --show-current

# Create new feature branch (AI session)
git checkout -b claude/[description]-[session-id]

# Stage all changes
git add .

# Commit with Polish message
git commit -m "Zaktualizowano [opis zmian]"

# Push with tracking
git push -u origin claude/[description]-[session-id]

# View file structure
ls -la

# Validate SVG
cat pieczec-szkolna.svg | head -n 50
```

## Important Reminders

1. **NEVER** modify core branding without authorization
2. **ALWAYS** use Polish for documentation
3. **ALWAYS** read files before editing
4. **NEVER** push to main directly
5. **ALWAYS** use proper branch naming convention
6. **ALWAYS** test SVG and HTML changes
7. **ALWAYS** update version info and dates
8. **NEVER** include sensitive information in commits

---

**Document Maintained By:** AI Assistants (Claude)
**Last Updated:** 2025-11-18
**Repository:** mdrceoholding/MDR-cosmomed-Izabela-Za-cka-
