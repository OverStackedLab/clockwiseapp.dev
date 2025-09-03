# Git Commit Message Generator for Expo Projects

Analyze the staged changes in this repository and generate an appropriate Git commit message following Conventional Commits format.

## Instructions:
1. **Examine staged changes**: Use `git diff --cached` and `git status` to understand what files have been modified, added, or deleted
2. **Analyze the changes**: Review the actual content changes to understand the purpose and impact
3. **Generate commit message** with these requirements:

### Format Requirements:
- **Type prefix**: Use one of: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `ci`, `perf`, `build`
- **Subject line**: 
  - Write in imperative mood (e.g., "add splash screen" not "added splash screen")
  - Keep to 72 characters maximum
  - No period at the end
- **Body** (if needed):
  - Add explanatory body for complex changes
  - Wrap at 72 characters
  - Separate from subject with blank line

### Expo-Specific Considerations:
- **Configuration changes**: If `app.json`, `eas.json`, `expo.json`, or native config files are modified, mention the impact
- **Assets**: If images, fonts, or other assets were added/modified, note them
- **Dependencies**: If `package.json` changes include new libraries, mention key additions
- **Native code**: If iOS/Android native files are touched, indicate platform
- **Build/deployment**: If EAS build configs or deployment settings change, specify environment (dev/staging/prod)

### Examples:
```
feat: add user authentication with Firebase
fix: resolve splash screen display issue on Android
chore: update dependencies and remove unused packages
refactor: extract auth logic into custom hooks
docs: update README with new deployment instructions
style: apply consistent formatting to auth components
```

## Output:
Return only the commit message text - do not execute `git commit`. If changes are minimal or unclear, ask for clarification about the intended purpose.