# GitHub-Chinese-Top-Charts (Java) Scan Validation Summary

Source report: `GrowingGit__GitHub-Chinese-Top-Charts.json`

## Scan Metadata

- **Scanner:** `cognium` (static analysis only)
- **Validation model:** `gpt-5.4`
- **Repository:** [GrowingGit/GitHub-Chinese-Top-Charts](https://github.com/GrowingGit/GitHub-Chinese-Top-Charts)

## Final Classification

- Files scanned (report): **0**
- Total findings: **1**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **1**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **1**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `orphan-module` | 1 | 0 | 1 | not_valid |

## Notes

### `orphan-module` (1 × )

This finding is not valid for a Java codebase because Java source files are not expected to have incoming imports to be legitimate; classes with a public static void main(String[] args) method are standard executable entry points. The scanner's rationale fits module systems in other ecosystems better than standalone Java classes, especially for a script-like file under content/scripts.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
