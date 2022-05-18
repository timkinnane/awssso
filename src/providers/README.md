## Providers

Providers in this context are methods that interact with external dependencies and therefore contain
side effects.

They're isolated from other functional units to be ignored from test coverage. This also avoids the
need for mocks in the rest of the application because they're all pure functions.
