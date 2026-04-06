# JavaGuide (Java) Scan Validation Summary

Source report: `Snailclimb__JavaGuide.json`

## Scan Metadata

- **Scanner:** `cognium` (static analysis only)
- **Validation model:** `gpt-5.4`
- **Repository:** [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)

## Final Classification

- Files scanned (report): **0**
- Total findings: **3**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **3**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **3**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `variable-shadowing` | 2 | 0 | 2 | not_valid |
| `orphan-module` | 1 | 0 | 1 | not_valid |

## Notes

### `variable-shadowing` (2 × )

These findings are false positives: in the shown JavaScript function, `now` and `url` are simply local variables declared once within `getFixedUrl` and do not shadow any outer-scope declarations. The scanner appears to be misinterpreting same-line declarations as shadowing, and the suggested renaming is unnecessary for this codebase.

### `orphan-module` (1 × )

This finding is a false positive because sw.js is a service worker script, which is typically loaded by browser registration at runtime rather than imported by other modules. In a docsify/static-site setup, such files are legitimate entry points even when they have no incoming imports, so the orphan-module remediation does not apply here.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
