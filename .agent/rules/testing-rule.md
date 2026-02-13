---
trigger: always_on
---

The "Test-First Validation" Rule
Rule: Continuous Test Verification

Test Creation: Before implementing any new logic or phase, the agent must generate corresponding unit tests that cover the intended functionality and edge cases.

Execution Loop: After every implementation phase, the agent must execute:

All newly created unit tests.

The entire existing test suite (regression testing).

Success Criterion: "Phase Complete" can only be declared if 100% of tests pass.

Failure Protocol: If any test fails, the agent must prioritize fixing the code or the test before attempting to move to the next phase or adding new features.