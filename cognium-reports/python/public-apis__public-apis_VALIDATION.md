# public-apis (Python) Scan Validation Summary

Source report: `public-apis__public-apis.json`

## Scan Metadata

- **Scanner:** `cognium-ai` (LLM-enhanced · `default`)
- **Validation model:** `gpt-5.4`
- **Repository:** [public-apis/public-apis](https://github.com/public-apis/public-apis)

## Final Classification

- Files scanned (report): **0**
- Total findings: **4**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **4**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **4**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `path_traversal` | 2 | 0 | 2 | not_valid |
| `ssrf` | 1 | 0 | 1 | not_valid |
| `missing-stream` | 1 | 0 | 1 | not_valid |

## Notes

### `path_traversal` (2 × )

These findings are in repository validation scripts that intentionally accept a filename argument and open that file locally; this is normal CLI utility behavior, not a path traversal vulnerability. CWE-22 requires attacker-controlled path input crossing a trust boundary in a security-sensitive context, but here the user invoking the script already chooses the file to validate and gains no privilege or unintended file access beyond their own process permissions.

### `ssrf` (1 × )

This code is a repository maintenance/validation script that intentionally fetches arbitrary public API links to verify whether they are alive, so the network request is the core intended behavior rather than an exploitable server-side request sink. The input is not user-controlled in a deployed service context; it comes from repository data being checked by a developer/CI job, making CWE-918 SSRF remediation inapplicable here. While fetching untrusted URLs can have operational risks, this finding is not a meaningful SSRF vulnerability for this Python codebase.

### `missing-stream` (1 × )

This finding is a false positive for this Python code because the function intentionally needs the entire file contents as a single string to call .find('## Index') and then slice from that offset before applying a regex over the resulting text. Replacing .read() with line-by-line iteration would not be an equivalent fix and would complicate the logic without a clear performance benefit for the small text files this validator processes.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
