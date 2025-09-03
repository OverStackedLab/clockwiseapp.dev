# Pull Request Preparation Command

Analyze the current branch and prepare a comprehensive pull request description by examining the changes, commit history, and project context.

## Instructions:
1. **Gather branch information**:
   - Get current branch name: `git branch --show-current`
   - Compare with main/master: `git diff main...HEAD` (or `master...HEAD`)
   - Get commit history: `git log main..HEAD --oneline` (or `master..HEAD --oneline`)
   - Check file changes: `git diff --name-status main...HEAD`

2. **Analyze the changes**:
   - Review actual code changes to understand the purpose
   - Identify the scope and impact of modifications
   - Note any breaking changes or migration requirements
   - Check for new dependencies or configuration changes

3. **Generate PR description** with this structure:

## PR Description Template:

```markdown
## Summary
[Brief description of what this PR does - 1-2 sentences]

## Changes
- [List key changes made]
- [Include file/component names where relevant]
- [Note any architectural decisions]

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Chore (dependency updates, build changes, etc.)

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated  
- [ ] Manual testing completed
- [ ] Tested on iOS/Android (for Expo projects)

## Screenshots/Videos
[If UI changes, include before/after screenshots or demo videos]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] Tested in development environment

## Additional Notes
[Any additional context, concerns, or follow-up items]
```

## Expo-Specific Considerations:
- **Native changes**: Note if iOS/Android native code was modified
- **Config updates**: Highlight changes to `app.json`, `eas.json`, `expo.json`
- **Assets**: Mention new images, fonts, or other assets
- **Dependencies**: Call out new packages, especially native modules
- **Build impact**: Note if EAS build configuration changed
- **Environment**: Specify if changes affect specific environments

## Smart Analysis:
- **Branch naming**: Use branch name to infer PR purpose (e.g., `feature/`, `fix/`, `chore/`)
- **Commit patterns**: Analyze commit messages to understand the development flow
- **File patterns**: 
  - `/components/` changes → UI updates
  - `/hooks/` changes → Logic changes
  - `/utils/` changes → Helper function updates
  - `/screens/` changes → New pages or page updates
  - `package.json` → Dependency changes
  - `*.test.*` → Testing updates

## Output Format:
1. **First**: Provide the formatted PR description ready to copy/paste
2. **Then**: Suggest an appropriate PR title based on the changes
3. **Finally**: Recommend reviewers if you can identify relevant code owners or specialists

## Examples:

**PR Title Examples:**
- `feat: add user profile management with avatar upload`
- `fix: resolve navigation crash on deep linking`
- `chore: upgrade Expo SDK to v50 and update dependencies`
- `refactor: migrate authentication to React Query`

**Branch Analysis Examples:**
- `feature/user-auth` → New authentication feature
- `fix/ios-crash` → iOS-specific bug fix  
- `chore/expo-50` → Expo SDK upgrade
- `refactor/state-management` → Code restructuring