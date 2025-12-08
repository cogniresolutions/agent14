# Agent14 Documentation

This folder contains all technical documentation for the Agent14 platform.

---

## 📁 Documentation Files

| File | Description |
|------|-------------|
| `ARCHITECTURE.md` | Complete technical architecture documentation |
| `ARCHITECTURE.html` | Static HTML version for offline viewing/printing |
| `architecture-diagram.jpg` | Main system architecture diagram |
| `salesforce-agentforce-architecture.jpg` | Salesforce Agentforce internal architecture |
| `prompt-injection-protection.jpg` | Einstein Trust Layer security pipeline |
| `human-escalation-flow.jpg` | Human agent escalation process flow |

---

## 📝 Updating Documentation

### Editing Markdown Files

1. Open the `.md` file in any text editor or IDE
2. Make your changes following the existing format
3. Commit changes to the repository

### Markdown Conventions

- Use `#` for main titles, `##` for sections, `###` for subsections
- Use tables for structured data (component lists, configurations)
- Use code blocks with language hints for code examples:
  ```yaml
  # Example YAML configuration
  config:
    enabled: true
  ```
- Reference images using relative paths: `![Alt Text](./image-name.jpg)`

---

## 🖼️ Updating Diagrams

Diagrams are stored as `.jpg` files in this folder. To update:

1. Create or edit the diagram using your preferred tool
2. Export as `.jpg` with the same filename
3. Replace the existing file in this folder
4. The markdown documentation will automatically display the updated image

### Diagram Naming Convention

- Use lowercase with hyphens: `diagram-name.jpg`
- Keep names descriptive and concise
- Current diagrams:
  - `architecture-diagram.jpg` - Main 3-layer architecture
  - `salesforce-agentforce-architecture.jpg` - Agentforce components
  - `prompt-injection-protection.jpg` - Security pipeline
  - `human-escalation-flow.jpg` - Escalation process

---

## 📄 Generating HTML from Markdown

### Option 1: Online Tools

1. Visit [md2pdf.netlify.app](https://md2pdf.netlify.app/) or [CloudConvert](https://cloudconvert.com/md-to-pdf)
2. Upload or paste `ARCHITECTURE.md` content
3. Download as HTML or PDF

### Option 2: VS Code Extension

1. Install "Markdown Preview Enhanced" or "Markdown PDF" extension
2. Open the `.md` file
3. Right-click → Export as HTML

### Option 3: Command Line (Pandoc)

```bash
# Install pandoc (if not installed)
# macOS: brew install pandoc
# Ubuntu: sudo apt install pandoc
# Windows: choco install pandoc

# Convert to HTML
pandoc docs/ARCHITECTURE.md -o docs/ARCHITECTURE.html --standalone

# Convert to PDF
pandoc docs/ARCHITECTURE.md -o docs/ARCHITECTURE.pdf
```

### Option 4: Manual Update

The `ARCHITECTURE.html` file is a styled static HTML version. To update it manually:

1. Edit the HTML file directly
2. Update the content sections to match the markdown changes
3. Keep the styling intact in the `<style>` section

---

## 🔄 Sync Guidelines

When updating `ARCHITECTURE.md`, remember to:

1. ✅ Update the "Last Updated" date in the header
2. ✅ Regenerate `ARCHITECTURE.html` if needed for stakeholder distribution
3. ✅ Update diagrams if architecture changes
4. ✅ Review all cross-references and links

---

## 📋 Document Structure

The main `ARCHITECTURE.md` file follows this structure:

```
1. Executive Summary
2. Architecture Diagram & Legend
3. Component Descriptions
   - Cloudflare Security Layer
   - Frontend Application
   - Backend Services
   - Salesforce Agentforce
   - Einstein Trust Layer
4. Salesforce Agentforce Internal Architecture
5. Agentforce Functional Settings
6. Security Testing Framework
7. Data Flow Sequence
8. Security Architecture
9. Prompt Injection Protection
10. Human Escalation Process
11. Compliance & Standards
12. Infrastructure Summary
```

---

## 🔒 Confidentiality

These documents are **confidential** and intended for:

- Internal development team
- Stakeholder review
- Technical audits

Do not share externally without authorization.

---

## 📞 Contact

For questions about this documentation, contact the Agent14 development team.
