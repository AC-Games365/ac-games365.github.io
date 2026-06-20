# Skills

This document details the specific skills and tools available to the AI assistant.

## Available Tools

The AI has access to the following Python library functions, which interact with the IDE:

### File System Operations
- `read_file(absolutePath: str, startLine: int = None, endLine: int = None) -> str`: Reads the content of a file.
- `write_file(absolutePath: str, text: str)`: Writes content to a specified file, overwriting existing content.
- `list_files(absolutePath: str) -> list[dict]`: Lists files and directories in a given path.

### Code Navigation and Search
- `find_declaration(symbol: str, contextFile: str = None, contextSnippet: str = None, include: str = None, exclude: str = None) -> list[dict]`: Finds the definition site of a symbol.
- `find_usages(symbol: str, type: str = "all", contextFile: str = None, context: int = None, before: int = None, after: int = None, include: str = None, exclude: str = None, filter: str = None) -> dict`: Finds all references and declarations of a symbol.

### Version Control (Git)
- `git(repoRoot: str, args: list[str]) -> dict`: Runs a Git CLI command. Allowed subcommands: `blame`, `diff`, `help`, `log`, `shortlog`, `show`, `status`, `ls-files`, `ls-tree`, `merge-tree`, `rev-list`, `rev-parse`, `grep`.
- `list_vcs_roots(contextFile: str = None) -> list[dict]`: Lists all VCS roots in the project.

### Code Analysis
- `analyze_file(absolutePath: str) -> list[dict]`: Analyzes a file for errors and warnings.

## General Capabilities

- **Code Modification**: Can add, remove, or modify code snippets in existing files or create new files.
- **Project Structure**: Can understand and suggest changes to project organization.
- **Dependency Management**: Can identify and suggest changes related to project dependencies (e.g., `package.json`).
- **Debugging Assistance**: Can help identify and resolve errors based on analysis.
- **Documentation**: Can generate or update documentation based on project context.
- **Best Practices**: Can suggest modern development practices and improvements.
- **Multi-language Support**: Can handle and modify content in different languages (e.g., i18n files).
- **UI/UX Improvements**: Can suggest and implement changes to improve user interface and experience.
- **External Service Integration**: Can guide through the integration of third-party services (e.g., EmailJS, reCAPTCHA, Analytics).

## Limitations

- Cannot perform actions that require direct user interaction outside the IDE (e.g., browsing external websites directly, making phone calls).
- Cannot execute arbitrary code or shell commands not exposed through the provided API.
- Cannot make design decisions without user input or clear guidelines.
- Cannot access external network resources unless explicitly allowed by the user or through a provided API.
- Cannot delete files or directories directly; must instruct the user or use `write_file` to empty content.
