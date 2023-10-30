const currentYear = new Date().getFullYear();

const footer = document.querySelector('footer');
footer.innerText = `@ ${currentYear} Rui Martins`;

const websiteTitles = [
    "Google",
    "Youtube",
    "Facebook",
    "Instagram",
    "Twitter",
    "Netflix",
    "Wikipedia",
    "Amazon",
    "eBay",
    "GitHub",
    "LinkedIn",
    "TikTok",
    "ChatGPT",
    "Twitch TV",
    "Reddit",
    "WhatsApp",
    "Yahoo",
    "Shein",
    "GGdeals"
];


const searchInput = document.getElementById("search-input");
const datalist = document.createElement("datalist");
datalist.id = "website-suggestions";


websiteTitles.forEach(title => {
    const option = document.createElement("option");
    option.value = title;
    datalist.appendChild(option);
});


searchInput.setAttribute("list", "website-suggestions");
searchInput.insertAdjacentElement("afterend", datalist);


document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const placeholders = ["your_placeholder1", "your_placeholder2", "your_placeholder3"];

    if (query === "" || placeholders.includes(query)) {
        return;
    }

    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error(error);
        });
});

// Event listener for the "Show all Websites" button
document.getElementById("new-button").addEventListener("click", () => {
    const query = "all";
    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error(error);
        });
});

function displaySearchResults(searchResults) {
    const searchResultsContainer = document.querySelector(".search-results");
    searchResultsContainer.innerHTML = "";
    if (searchResults.length > 0) {
        searchResults.forEach(result => {
            const resultDiv = document.createElement("div");
            const link = document.createElement("a");
            link.href = result.url || "#"; 
            link.target = "_blank"; 
            link.innerHTML = `<h3>${result.titulo}</h3>`;
            resultDiv.appendChild(link);
            resultDiv.innerHTML += `<p>${result.content}</p>`;
            searchResultsContainer.appendChild(resultDiv);
        });
    } else {
        searchResultsContainer.innerHTML = "No results found.";
    }
}


const modeToggle = document.getElementById('mode-toggle');
const title = document.getElementById('title');


function toggleMode() {
    if (modeToggle.checked) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        title.innerText = 'Mini Wiki';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        title.innerText = 'Mini Wiki';
    }
}


modeToggle.addEventListener('change', toggleMode);


document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});


document.getElementById("search-button").addEventListener("click", () => {
    handleSearch();
});


function handleSearch() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const placeholders = ["your_placeholder1", "your_placeholder2", "your_placeholder3"]; 

    if (query === "" || placeholders.includes(query)) {
        return;
    }

    
    fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error(error);
        });
}


const clearTitle = document.getElementById('title');

title.addEventListener('click', () => {
    clearSearchResults();
});

function clearSearchResults() {
    const searchResultsContainer = document.querySelector(".search-results");
    searchResultsContainer.innerHTML = ""; 
}


