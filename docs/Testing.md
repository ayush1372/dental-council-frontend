# How to write Test Cases

Step 1: Provide Data setup around which component's functionality you need to perform testing.
To provide data render the component which you need to test.

Step 2: Provide testid to the element which you want to test by [data-testid].
Select the element(button,tags) by getbyTestid,getbyrole,getbylabelvalue,queryallby or trigger events on the rendered component by userEvent or fireEvent to get the result from the component.

Step 3: Write assertion.Check whether what is expected as result and what we are getting from the 2nd step is same
For this use tobetruthy, tobeinthedocument(),null etc to compare the results

If the rendered component contains code which gets data from redux store then we need to wrap the rendered component with provider and store

If we are writing testcases around Navigation then we have to warp Router component around rendered Component

# How to Track Code Coverage

Write Jest Configuration File to track the Code Coverage
We can also define Thershold for Code to be covergaed to pass test suites
For more details refer https://jestjs.io/docs/configuration

# Command to Run Test Cases

To run all test cases/test suites the command is npm run test
To run testcases with code coverage the command is npm test -- --coverage --watchAll
