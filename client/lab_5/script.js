console.log("loaded")
async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  form.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something ****************************************
    submitEvent.preventDefault(); // This prevents your page from going to http://localhost:3000/api even if your form still has an action set on it
    console.log('form submission'); // this is substituting for a "breakpoint"
    
    /*
      ## GET requests and Javascript
        We would like to send our GET request so we can control what we do with the results
        But this blocks us sending a query string by default - ?resto='' won't exist

        Let's get those form results before sending off our GET request using the Fetch API
    */
/*
Hook this script to index.html
by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  console.log(query.resto)
  console.log(list)
  return list.filter(item => item.name.toLowerCase().includes(query.resto.toLowerCase()));
}

async function mainEvent() { // the async keyword means we can make API requests
const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
// Add a querySelector that targets your filter button here

let currentList = []; // this is "scoped" to the main event function

/* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
mainForm.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
  
  // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
  submitEvent.preventDefault(); 
  
  // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
  console.log('form submission'); 

  /*
    ## GET requests and Javascript
      We would like to send our GET request so we can control what we do with the results
      Let's get those form results before sending off our GET request using the Fetch API
  
    ## Retrieving information from an API
      The Fetch API is relatively new,
      and is much more convenient than previous data handling methods.
      Here we make a basic GET request to the server using the Fetch method to the county
  */

  // Basic GET request - this replaces the form Action
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

  // This changes the response from the GET into data we can use - an "object"
  currentList = await results.json();

  /*
    This array initially contains all 1,000 records from your request,
    but it will only be defined _after_ the request resolves - any filtering on it before that
    simply won't work.

    console.table(currentList); 
  */
  const formData = new FormData(mainForm);
  const formDataObject = Object.fromEntries(formData);
  currentList = filterList(currentList, formDataObject);
  console.table(currentList)
});


/*
  Now that you HAVE a list loaded, write an event listener set to your filter button
  it should use the 'new FormData(target-form)' method to read the contents of your main form
  and the Object.fromEntries() method to convert that data to an object we can work with
  When you have the contents of the form, use the placeholder at line 7
  to write a list filter
  Fire it here and filter for the word "pizza"
  you should get approximately 46 results
*/




}
/*
This adds an event listener that fires our main event only once our page elements have loaded
The use of the async keyword means we can "await" events before continuing in our scripts
In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
     // this is the preferred way to handle form data in JS in 2022
     const formData = new FormData(submitEvent.target); // get the data from the listener target
     const formProps = Object.fromEntries(formData); // Turn it into an object
     // You can also access all forms in a document by using the document.forms collection
     // But this will retrieve ALL forms, not just the one that "heard" a submit event - less good
 
     /*
       ## Retrieving information from an API
         The Fetch API is relatively new,
         and is much more convenient than previous data handling methods.
         Here we make a basic GET request to the server using the Fetch method
         to send a request to the routes defined in /server/routes/foodServiceRoutes.js
 
       // this is a basic GET request
       // It does not include any of your form values, though
     */
    console.log(formData)
    console.log(formProps)
    const fetchQuery = new URLSearchParams(formProps);
    const results = await fetch(`/api/foodServicePG?${new URLSearchParams(formProps)}`);
    
    /*
   ## Get request with query parameters

      const results = await fetch(`/api/foodServicePG?${new URLSearchParams(formProps)}`);

      The above request uses "string interpolation" to include an encoded version of your form values
      It works because it has a ? in the string
      Replace line 37 with it, and try it with a / instead to see what your server console says

      You can check what you sent to your server in your GET request
      By opening the "network" tab in your browser developer tools and looking at the "name" column
      This will also show you how long it takes a request to resolve
    */

    // This changes the response from the GET into data we can use - an "object"
    const arrayFromJson = await results.json();
    console.table(arrayFromJson.data); // this is called "dot notation"
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it initially contains all 1,000 records from your request
  });
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
