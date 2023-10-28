const express = require('express');
const serveless = require('serverless-http');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const wiki = {
    "Google": {
        url: "https://www.google.com",
        description: "Google is a popular search engine that can help you find information on the web.",
    },
    "Youtube": {
        url: "https://www.youtube.com",
        description: "YouTube is an online platform that allows you to search for movies and TV shows.",
    },
    "Facebook": {
        url: "https://www.facebook.com",
        description: "Facebook is an online social media and social networking service.",
    },
    "Instagram": {
        url: "https://www.instagram.com",
        description: "Instagram is a photo and video sharing social networking service.",
    },
    "X": {
        url: "https://www.example.com/x",
        description: "X is an online social media and social networking service that allows users to post texts, images, and videos.",
    },
    "Netflix": {
        url: "https://www.netflix.com",
        description: "Netflix is an online platform that allows you to search for movies and TV shows.",
    },
    "Wikipedia": {
        url: "https://www.wikipedia.org",
        description: "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world.",
    },
    "Amazon": {
        url: "https://www.amazon.com",
        description: "Amazon.com is an online retailer, manufacturer of e-book readers, and Web services provider.",
    },
    "eBay": {
        url: "https://www.ebay.com",
        description: "eBay is an online marketplace for buying and selling various products.",
    },
    "GitHub": {
        url: "https://github.com",
        description: "GitHub is a web-based platform for version control and collaboration.",
    },
    "LinkedIn": {
        url: "https://www.linkedin.com",
        description: "LinkedIn is a social networking platform for professionals.",
    },
    "TikTok": {
        url: "https://www.tiktok.com",
        description: "TikTok is a social media platform for sharing short videos.",
    },
    "ChatGPT": {
        url: "https://www.chatgpt.com",
        description: "ChatGPT is an AI-powered chatbot service for natural language understanding.",
    },
    "Twitch TV": {
        url: "https://www.twitch.tv",
        description: "Twitch TV is a live streaming platform for gamers and creators.",
    },
    "Reddit": {
        url: "https://www.reddit.com",
        description: "Reddit is a social news aggregation, web content rating, and discussion website.",
    },
    "WhatsApp": {
        url: "https://www.whatsapp.com",
        description: "WhatsApp is a messaging app for text, voice, and video communication.",
    },
    "Yahoo": {
        url: "https://www.yahoo.com",
        description: "Yahoo is a web services provider, offering news, email, and search functionality.",
    },
};


app.get('/styles.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/styles.css');
});

app.get('/JS/index.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/public/JS/index.js');
});


app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    let searchResults;
    
    if (query === "all") {
        searchResults = Object.entries(wiki).map(([title, content]) => ({
            titulo: title,
            content: content.description,
            url: content.url
        }));
    } else {
        searchResults = searchWiki(query, wiki);
    }
    
    res.json(searchResults);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function searchWiki(query, wiki) {
    console.log(query);
    query = query.toLowerCase();
    const results = Object.entries(wiki).filter(([title, content]) => {
        return title.toLowerCase().includes(query) || content.description.toLowerCase().includes(query);
    }).map(([title, content]) => ({ titulo: title, content: content.description, url: content.url }));
    return results;
}



module.exports.handler = serveless(app)