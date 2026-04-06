# mall (Java) Scan Validation Summary

Source report: `macrozheng__mall.json`

## Scan Metadata

- **Scanner:** `cognium` (static analysis only)
- **Validation model:** `gpt-5.4`
- **Repository:** [macrozheng/mall](https://github.com/macrozheng/mall)

## Final Classification

- Files scanned (report): **0**
- Total findings: **15140**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **15140**
- **Valid (actionable or objectively correct signal):** **858**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **14282**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `missing-public-doc` | 12372 | 825 | 11547 | not_valid |
| `unused-interface-method` | 1203 | 0 | 1203 | not_valid |
| `naming-convention` | 695 | 0 | 695 | not_valid |
| `orphan-module` | 524 | 0 | 524 | not_valid |
| `external_taint_escape` | 210 | 0 | 210 | not_valid |
| `god-class` | 71 | 0 | 71 | not_valid |
| `unbounded-collection` | 8 | 0 | 8 | not_valid |
| `dependency-fan-out` | 7 | 7 | 0 | valid |
| `n-plus-one` | 7 | 7 | 0 | valid |
| `excessive-allocation` | 6 | 6 | 0 | valid |
| `unchecked-return` | 6 | 3 | 3 | mixed |
| `log_injection` | 6 | 4 | 2 | mixed |
| `infinite-loop` | 4 | 0 | 4 | not_valid |
| `redundant-loop-computation` | 4 | 0 | 4 | not_valid |
| `ssrf` | 4 | 0 | 4 | not_valid |
| `xss` | 4 | 0 | 4 | not_valid |
| `swallowed-exception` | 3 | 3 | 0 | valid |
| `sql_injection` | 3 | 0 | 3 | not_valid |
| `todo-in-prod` | 2 | 2 | 0 | valid |
| `unused-variable` | 1 | 1 | 0 | valid |

## Notes

### `missing-public-doc` (12372 × )

In this Java/Spring codebase, the rule is overwhelmingly noisy because it flags framework overrides and bean factory methods where Javadoc is not typically required, and it also misses existing API documentation annotations such as @ApiOperation on controllers. Methods implementing interfaces or overriding superclass methods inherit their contract from the framework type, so demanding duplicate doc comments is not a meaningful maintainability issue here. Only the plain public entry-point main method is a straightforward case where the rule technically applies without conflicting with framework idioms.

### `unused-interface-method` (1203 × )

These findings are false positives caused by analyzing Java interface declarations in isolation. In this Spring/MyBatis codebase, DAO interfaces intentionally declare mapper methods that are implemented and invoked via framework proxies and XML/annotation mappings, so they are not expected to be called within the same file. The suggested remediation to remove these methods is inappropriate because it would break the mapper contract and public API used elsewhere.

### `naming-convention` (695 × )

These findings are false positives caused by the scanner misclassifying Java constructors as ordinary methods and applying method camelCase rules to them. In Java, constructors must match the class name exactly, and the suggested renames would break the language semantics; likewise, `serialVersionUID` is a standard Java serialization field name and is conventionally exempt from generic UPPER_SNAKE_CASE rules.

### `orphan-module` (524 × )

These findings are false positives caused by applying import-graph dead-code logic to a Spring Boot Java application and even to shell scripts. In this codebase, many classes are discovered reflectively via annotations such as @SpringBootApplication, @Configuration, @Controller, @Bean, and framework interfaces like UserDetails, so they legitimately have no direct incoming imports. The shell files under document/sh are operational entry-point scripts invoked manually, not Java modules expected to participate in an import graph.

### `external_taint_escape` (210 × )

These findings are false positives caused by the scanner conflating ordinary Spring MVC request handling and response serialization with a security issue. In this Java/Spring codebase, passing request parameters to service-layer query/update methods and returning DTOs, entity lists, or numeric counts via CommonResult is standard controller behavior; no concrete unsafe sink, missing framework-specific validation requirement, or exploitable taint escape is shown in the reported lines. The cross-method flows are especially implausible, with taint from one endpoint incorrectly propagated into unrelated endpoints' return statements.

### `god-class` (71 × )

These findings are all in MyBatis Generator output under mall-mbg, where large Example/GeneratedCriteria classes and wide POJO models are mechanically generated to mirror database schemas and provide fluent query builders. The scanner is flagging size-based metrics on boilerplate/accessor-heavy code, but the suggested refactor is not appropriate here because splitting these classes would break the expected generated API and offers little architectural value. This pattern is representative of generated model code in this repository, so the broader set of 71 findings for this rule is best treated as noise rather than actionable god-class design defects.

### `unbounded-collection` (8 × )

These findings are ordinary Java patterns where a temporary collection is populated from an already bounded source such as method parameters, an input list, Elasticsearch aggregation buckets, or a preloaded map. The scanner is flagging any add-inside-loop pattern without considering that the loop bounds are determined by existing finite collections and the created lists/maps are local, short-lived objects rather than attacker-amplifiable accumulators. The suggested remediation to add arbitrary MAX checks or clear/drain these collections is not appropriate for these APIs and would likely break expected behavior.

### `dependency-fan-out` (7 × )

These findings are valid for this Java codebase because the reported files are concrete classes with unusually large import/dependency sets, which is a legitimate fan-out signal in Spring service/controller implementations. While some imports come from wildcard packages and framework annotations that are common in Java, the rule is language-appropriate and still highlights real coupling and testability concerns rather than a scanner misunderstanding.

### `n-plus-one` (7 × )

All reviewed findings are true positives in this Java/MyBatis codebase: each method performs one INSERT per element inside a loop, causing multiple round-trips and avoidable write amplification. While this is not the classic ORM read-side N+1 pattern, the rule's batching remediation is still applicable here because these service methods are bulk-create/allocation operations that should use batch inserts or MyBatis batch execution.

### `excessive-allocation` (6 × )

All six findings are true positives in Java: they allocate short-lived objects inside loops, which can increase allocation rate and GC churn on hot paths. While some allocations are idiomatic and may be acceptable at small scale, the rule and suggested remediation are language-appropriate because these objects can often be hoisted, pre-sized, or replaced with map/list helper patterns without changing semantics.

### `unchecked-return` (6 × )

The RedisServiceImpl findings at lines 37 and 42 are false positives because the methods directly return the RedisTemplate result to callers rather than discarding it. The hash delete and controller/service delete calls do ignore returned values, so those are genuine unchecked-return cases, although the suggested remediation is too generic and should be adapted to the actual return types and API semantics rather than blindly throwing IOException.

### `log_injection` (6 × )

The findings that log request-body DTOs are valid CWE-117 concerns because untrusted user-controlled fields can reach SLF4J logs via the object's toString(), potentially allowing CR/LF log forging if not sanitized. However, the two findings on deleteBrand are false positives because the scanner claims taint from line 43 in a different method; those log statements only use the local path variable id and do not receive data from the reported source flow.

### `infinite-loop` (4 × )

All four findings are ordinary bounded Java loops whose termination is controlled by a changing loop variable or iterator state. The scanner appears to be using an incorrect heuristic that expects an explicit break/return/throw inside the loop body, which is not required for finite for/while loops in Java. In this codebase, each loop advances toward termination via i++ or iterator.next()/hasNext(), so the suggested remediation does not apply.

### `redundant-loop-computation` (4 × )

These findings are technically about repeated access to Java array/list length or size in loop conditions, but in Java `array.length` is a field access and `ArrayList.size()` is O(1), so hoisting them is not a meaningful or generally warranted remediation. Modern JVMs/JITs already optimize such trivial loop invariants, and changing these loops would not address a real performance issue in this codebase. The rule is therefore noise rather than a useful Java-specific finding here.

### `ssrf` (4 × )

These findings are false positives because the outbound URLs are built from a fixed configuration property (`host.mall.admin`) plus constant path segments, not from attacker-controlled input. The user-controlled values (`id`, `brand`, `name`) are only used as path variables or request bodies/parameters to a predetermined destination, which does not constitute SSRF in this Java Spring RestTemplate usage. The scanner appears to be conflating any user-influenced HTTP client call with SSRF without verifying control over the target host or full URL.

### `xss` (4 × )

These findings are false positives because the code is only concatenating numeric promotion fields (counts, discounts, prices) into backend message strings in a Java service layer, not rendering untrusted HTML/JavaScript into a browser context. XSS requires a web output sink without proper context-aware escaping, and none of the cited lines perform template rendering, HTTP response writing, or HTML generation; the scanner appears to be over-tainting ordinary DTO/database values.

### `swallowed-exception` (3 × )

These Java findings are true positives because the catch blocks only call printStackTrace(), which is not structured application logging and effectively suppresses error handling in production code. In the date parsing cases, failures are ignored and the query silently changes behavior; in RequestUtil, the exception is printed and execution continues to dereference inetAddress, which can also lead to a NullPointerException. The scanner's remediation to log or rethrow is appropriate for this codebase and language.

### `sql_injection` (3 × )

These findings are false positives caused by incorrect taint-flow correlation across separate controller methods. The reported sink is a call to an Alipay service query method, not a database API, and the evidence shown does not demonstrate any SQL construction or execution in this controller. The scanner appears to be conflating request parameter handling in notify() with unrelated parameters in query(), so the SQL injection remediation does not apply to the code shown.

### `todo-in-prod` (2 × )

Both findings are genuine TODO markers left in Java production service implementations, which is exactly what this rule targets. They indicate acknowledged unfinished behavior or missing field handling rather than framework-required annotations or benign syntax, so flagging them as maintainability issues is appropriate for this codebase.

### `unused-variable` (1 × )

This is a straightforward Java unused local variable case: `int count;` is declared in the method and, in the shown code, never read or meaningfully used. In Java/Spring codebases this is not an idiomatic pattern that should be preserved, and the appropriate remediation is to remove the dead variable or actually use it if intended.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
