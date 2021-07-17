// describe() is simply a way to group our tests in Mocha. We can nest our tests in group. It takes two arguments, the first is the name of the test group and second is a callback function.
describe('First test suite', () => {

	// Describing an inner test suite
	describe('Inner (Nested) test suite', () => {

		before('This common code block runs before the first test in this describe block', () => {

		});
		
		beforeEach('This common code block runs before every test', () => {

			// You can put a repetitive code here
			// i.e. Login function

		});

		afterEach('This common code block runs after every test', () => {

		});

		after('This common code block runs after the last test in this describe block', () => {

		});

		// Describing an inner test case
		it('Inner (Nested) test case - 1', () => {

		});

		it('Inner (Nested) test case - 2', () => {

		});

		it('Inner (Nested) test case - 3', () => {

		});
	});

	// it() is used for an individual test case
	it('First test case', () => {

	});

	it('Second test case', () => {

	});

	it('Third test case', () => {

	});
});


// Describing a test suite
describe('Second test suite', () => {
	
	// Describing a test case
	it('First test case', () => {

	});

	it('Second test case', () => {

	});

	it('Third test case', () => {

	});
});