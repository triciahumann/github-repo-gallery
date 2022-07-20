// where my profile information will appear
const profileInformationElement = document.querySelector(".overview");
// github username
const username = "triciahumann";


// Fetch information from my GitHub using the Github API
const getGithubData = async function () {
    const response = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await response.json();
    console.log(data);
    displayUserInfo(data);
};

getGithubData();


// Display fetched github data and display user info on webpage
const displayUserInfo = function (data) {
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
};