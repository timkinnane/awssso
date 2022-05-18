## Functions

Functions in this path are pure functional units, organised by general area of responsibility. They each provide a single operation to be composed into application logic.

They apply some rules for consistency and to simply achieve maximum test coverage:
	- Take maximum of one structured argument as props
	- Call no other functions from this package except utils
	- Contain no loops (looping is composer responsibility)
	- No side effects or need for mocks
	- Typed returns, to help avoid regressions
