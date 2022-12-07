let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-el");
const saveTab = document.getElementById("save-el");

//Keeps items on the screen from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


//Save the current browser tab to the myLeads Array
saveTab.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

//Deleting all myLeads from array, local storage, and off the DOM.
deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
}) 

//Saving input to myLeads array, adding it to local storage, and rendering on DOM.
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // save array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
    render(myLeads)

    console.log(localStorage.getItem("myLeads"));
})

//Renders out list item onto DOM, adding it to list and anchor tag to open
//up on another tab in the browser.
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
