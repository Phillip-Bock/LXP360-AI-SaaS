# GitHub Project Board Integration Guide

## How to Link Commits to Project Items

When you commit code related to a project board item, use these formats in your commit message:

### Mark as In Progress
\`\`\`
feat: Start building bulk CSV upload tool #123
\`\`\`

### Mark as Complete
\`\`\`
feat: Add bulk CSV upload tool (closes #123)
fix: Resolve authentication bug (fixes #456)
docs: Update README (resolves #789)
\`\`\`

### Keywords that Mark Items as Complete
- `closes #123`
- `closed #123`
- `fixes #123`
- `fixed #123`
- `resolves #123`
- `resolved #123`

## Commit Message Format

Follow this structure:
\`\`\`
<type>: <description> (<project reference>)

<optional body>
\`\`\`

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, styling
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

**Starting work:**
\`\`\`
feat: Begin bulk CSV upload implementation #123
\`\`\`

**Completing work:**
\`\`\`
feat: Complete bulk CSV upload tool with validation (closes #123)

- Added CSV parser
- Implemented user validation
- Created admin UI
- Added error handling
\`\`\`

**Multiple items:**
\`\`\`
feat: Complete user management features (closes #123, closes #124, closes #125)
\`\`\`

## Manual Project Board Updates

If the automation doesn't work, you can manually:
1. Go to your GitHub Project board
2. Find the item by number
3. Drag it to the appropriate column
4. Add a comment linking to the commit

## Troubleshooting

If items aren't updating automatically:
1. Check that your commit message includes `#<number>`
2. Verify the item number exists in your project
3. Ensure you're pushing to the `main` branch
4. Check the Actions tab for workflow errors
