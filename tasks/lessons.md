# Lessons Learned - Documentation & Maintenance

## 🛡️ Preventing Documentation Debt

1. **Rebase Early, Rebase Often**:
   - Always `git pull --rebase origin main` before starting a new feature branch.
   - If a rebase fails, address conflict markers immediately before continuing.
   - Use `git rebase --abort` if the state becomes too corrupted and try again with a cleaner approach.

2. **Markdown Linting vs. Premium Design**:
   - **MD033 (No Inline HTML)**: While standard markdown is preferred, valid HTML like `<p align="center">` or `<details>` is acceptable for "premium" visual layouts if Markdown equivalents don't exist.
   - **Alt Text (MD045)**: Always provide descriptive alt text for images to satisfy accessibility and linting.
   - **Hierarchy (MD001)**: Maintain a logical heading hierarchy (`#`, `##`, `###`). Avoid skipping levels.

3. **Dealing with Merge Conflicts**:
   - In files like `README.MD`, conflicts often occur in the header/badges section.
   - Manually inspect each conflict marker (`<<<<<<<`, `=======`, `>>>>>>>`) and pick the most up-to-date version (usually `HEAD` for newer versions).
   - Deduplicate content immediately after resolution.

4. **Code Quality**:
   - Always run IDE diagnostics before committing documentation.
   - Fix MD012 (multiple blank lines) and MD018 (no space after heading) by using standard formatting.

## 🎨 UI/UX Pro Max Principles

1. **Landing Page Structure**:
   - Always follow a high-converting logical sequence: Value Prop (Hero) -> Ease of Use (How It Works/Video) -> Deep Dive (Features/Comparison) -> Reassurance (Testimonials/FAQ) -> Final Conversion (CTA).

2. **Accessibility**:
   - Always include `@media (prefers-reduced-motion: reduce)` in global CSS to respect user accessibility settings.

3. **Clean Markup**:
   - Strictly avoid inline styles. Use global CSS classes to maintain perfect flex/grid structures and alignment.

4. **Experimental Features**:
   - Dark Mode Toggle (HTML/CSS) implementation broke page layout; reverted changes. Further testing required before attempting complex theme toggle features that interact with background properties.

## 📝 Feature Review For Docs

1. **Keep documentation updated**:
   - Always verify `manifest.json` versions and active `popup.html` features (such as Batch Export and Review tabs) to ensure `ABOUT.md` accurately reflects the latest extension state.
