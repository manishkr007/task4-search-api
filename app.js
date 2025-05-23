const express = require('express');
const axios = require('axios');

// Instantiate the express app
const app = express();
const port = 3000;

/* getMovieTitles function fetches the movie titles as required in the task.
   It will navigate through all the returned pages of the API response.
   It will sort the movie titles and return those in an array. */
async function getMovieTitles(substr) {
    let titles = [];
    let page = 1;
    let totalPages = 1;

    // Loop through all pages to fetch all movie titles
    while (page <= totalPages) {
        const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${page}`;
        try {
            const response = await axios.get(url);
            const data = response.data;

            // Update totalPages based on the response
            totalPages = data.total_pages;

            data.data.forEach(movie => {
                titles.push(movie.Title);
            });
            // Increment page to fetch the next set of results
            page++;
        } catch (error) {
            console.error(`Error querying API for page ${page}:`, error.message);
            throw new Error('Failed to retrieve movie titles from the external API.');
        }
    }

    // Sort the collected titles in ascending order
    titles.sort();

    return titles;
}

// Root endpoint for basic server status
app.get('/', (req, res) => {
    res.status(200).send(` <h1>Challenge 4 !!</h1>
                           <p>Click this link to search for movies:</p>
                           <a href="http://localhost:${port}/movies?substr=ironman">http://localhost:${port}/movies?substr=ironman</a> `);
});

// This endpoint will respond to GET requests at '/movies'. It expects a query parameter 'substr'.
app.get('/movies', async (req, res) => {
    
    // Check if 'substr' is provided
    const substr = req.query.substr;
    if (!substr) {
        return res.status(400).json({ error: 'Missing "substr" query parameter.' });
    }
    try {
        const movieTitles = await getMovieTitles(substr);
        res.status(200).json(movieTitles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Movie API server listening at http://localhost:${port}`);
    console.log(`Try: http://localhost:${port}/movies?substr=ironman`);
});