
var MOCK_QNAS = {
	"general": [
		{
			"id": "875789",
			"category": "General",
			"question": "Can you describe the difference between progressive enhancement and graceful degradation?",
			"answer": "Progressive enhancement is a way to implement a web page where basic features, which are supported by most environments, are implemented first and then progressively enhance them for advanced environments.On the other hand, graceful degradation is an opposite. The advanced features are freely implemented at any time, and additional works are done to support the environment where the features don't work well.",
			"citation": "MDN",
			"inputDate": 12351641
		},
		{
			"id": "875789",
			"category": "General",
			"question": "Can you describe your workflow when you create a web page?",
			"answer": "Decide a CSS preprocessor. I may consider using SCSS, but Less and Stylus are also viable options. Decide a HTML template engine. I may go with Pug(formerly Jade). Decide a JavaScript preprocessor or other languages being compiled to it. I may go with TypeScript or ES6 with Babel. Decide a task manager. I recently like to just use NPM scripts instead of using huge task managers like Gulp or Grunt. Write tests and make them fail. Write app code and check the tests succeed. Set CI. Publish the code and check a task in CI succeed.",
			"citation": "MDN",
			"inputDate": 12351641
		}
	],
	"javascript": [
		{
			"id": "875789",
				"category": "General",
				"question": "Explain event delegation",
				"answer": "When an event is fired from an element, the event will be bubbled up to its parent nodes. However, the original element where the event occurs, called 'target', stays the same in the event object. Using the target property, we can always keep tracking which element actually causes an event captured by its parent, and it can help use reduce the number of event handlers as we sometimes don't need to add event listeners for every element.",
				"citation": "MDN",
				"inputDate": 12351641
			},
			{
				"id": "875789",
				"category": "General",
				"question": "What's the difference between host objects and native objects?",
				"answer": "Host objects: what an environment(browser, Node.js, etc) provides Native objects: what JavaScript provides",
				"citation": "MDN",
				"inputDate": 12351641
			}
		]
}

function getQnAs(callbackFn) {
	setTimeout(function() {
		callbackFn(MOCK_QNAS)
	}, 1);
}

function displayQnAs(data) {

	for(index in data.general) {
		console.log(index, data.general)
		$('body').append(
			'<p>' + data.general[index].question + '</p>',
			'<p>' + data.general[index].answer + '</p>',
			'<p>' + data.javascript[index].question + '</p>',
			'<p>' + data.javascript[index].answer + '</p>'
			);
	}
}

function getAndDisplayQnAs() {
	getQnAs(displayQnAs);
}

$(function() {
	getAndDisplayQnAs();
})




