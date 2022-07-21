// where my profile information will appear
const profileInformationElement = document.querySelector(".overview");
// github username
const username = "triciahumann";
// the unordered list to display repos
const repoList = document.querySelector(".repo-list");
// section where ALL repo data appears
const allRepoData = document.querySelector(".repos");
// section where the INDIVIDUAL repo data appears
const singleRepoData = document.querySelector(".repo-data")
// the "Back to Repo Gallery" button
const button = document.querySelector(".view-repos");
// input field with the "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");


// Fetch information from my GitHub using the Github API
const getGithubData = async function () {
    const response = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await response.json();
    //console.log(data);
    displayUserInfo(data);
};

getGithubData();


// Display fetched github data and display user info on webpage
const displayUserInfo = function (data) {
    // shows the input textbox that will filter though repos
    filterInput.classList.remove("hide");
    // new div containing user information we gathered from github
    const capturedUserDataDiv = document.createElement("div");
    capturedUserDataDiv.classList.add("user-info");
    capturedUserDataDiv.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    // ^^^ grabbing the JSON data we need to add to the displayed information in the new div
   
    // append the new div (capturedUserData) to the profile information display
    profileInformationElement.append(capturedUserDataDiv);
    gitRepos();
};

// Fetch repos 
const gitRepos = async function () {
    // paramaters = sort repos by most recently updated & show up to 100 repos on page at a time
    const getRepos = await fetch (` https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getRepos.json();
    //console.log(repoData);
    displayRepoName(repoData);
};

// // Display repo name
const displayRepoName = function (repos) {
    for (const repo of repos) {
        const listItem = document.createElement("li")
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(listItem);
    }
};

// Click event for indiviudal repos
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        // target the innerText where the event happens
        const repoName = e.target.innerText;
        // double check when I click on a repo that something pops up in the console
        // console.log(repoName);
        getSpecificRepoInfo(repoName);
    }
});

// FETCH SPECFIC repo information 
const getSpecificRepoInfo = async function (repoName) {
    const specificInfo = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    // resolve and save the json response
    const repoInfo = await specificInfo.json();
    // to view specific repo data when you click on a specific repo
    //console.log(repoInfo);

    // fetch data from lanuage_url property of repoInfo
    const fetchLanguages = await fetch (
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    // languageData is where the JSON data is saved
    const languageData = await fetchLanguages.json();
    //console.log(languageData); <<<<<< checked to make sure languages appeared in console

    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // console.log(languages); <<<< checked to make sure array of language for each repo clicked
    displayRepoInfo(repoInfo, languages);
};

// DISPLAY SPECIFIC repo information after click for an individual repo
const displayRepoInfo = function (repoInfo, languages) {
    singleRepoData.innerHTML = ""
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">
        View Repo on GitHub!</a>`
    singleRepoData.append(div);
    singleRepoData.classList.remove("hide");
    allRepoData.classList.add("hide");
    button.classList.remove("hide");
};

// When you click on button when viewing individual repo data 
const returnButton = addEventListener("click", function () {
    allRepoData.classList.remove("hide");
    singleRepoData.classList.add("hide");
    button.classList.add("hide");
});

// Add functionality to filter textbox
filterInput.addEventListener("input", function (e) {
    // captures the value of search text
    const textInput = e.target.value; 
    // console.log(textInput); <<<< checked that when you type in textbox it shows up in console
    const repos = document.querySelectorAll(".repo");
    const lowerCaseText = textInput.toLowerCase();

    // searches through all repos and compares
    // lowercase text of the repo name to lowercase text of what's in searh field/text box
    for (const repo of repos) {
        const lowerCaseRepo = repo.innerText.toLowerCase(); 
        if (lowerCaseRepo.includes(lowerCaseText)) {
            repo.classList.remove("hide")
        } else {
            repo.classList.add("hide");
        }
    }
});