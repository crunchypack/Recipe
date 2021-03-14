# Recipe
Website that brings you recipes based on ingredients. You can search using any keyword, ingredients or both. 

## AJAX

The Recipe Puppy api doesn't seem to be actually open for public use since the owner hasn't activated CORS headers. Changing the API could have been a way to go, but most of the job was already done before I noticed.
JavaScript fetch function would not work so I had to use XMLHttpRequest. But I figured out later that it worked due to me having my extension for CORS activated. 

In the contact page I let users upload recipes. The original API did not have any documentation for POST so I quickly added a post function to my existing API, and since it is configures for CORS on the same host it wont need CORS extensions.
The form sends the data to me, but I can't actually add any new recipes to Recipe Puppy. I could expand my own API to contain the recipes in the future as a side project.


## CSS
I am not the best designer, I prefer to sit in the backend. But if you give me a template to follow for frontend design I can follow it. But nobody gave me one, I just put together a simple three-page website with minimal design.
I optimised the site for tablet/mobile as well and tested it on Firefox and Chrome.

## JavaScript
Other than AJAX request the JavaScript is used to handle formdata and manipulate DOM.

## HTML
The markup is based on simple sketches and Recipe Puppy arguments and validated using https://validator.w3.org/
