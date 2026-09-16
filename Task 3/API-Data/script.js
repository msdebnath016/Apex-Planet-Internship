const jokeButton =
    document.getElementById("jokeButton");

const jokeTitle =
    document.getElementById("jokeTitle");

const jokeText =
    document.getElementById("jokeText");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const API_URL =
    "https://official-joke-api.appspot.com/random_joke";

async function fetchJoke() {

    try {

        loading.classList.remove("hidden");

        error.classList.add("hidden");

        jokeButton.disabled = true;

        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "Failed to fetch joke."
            );
        }

        const data =
            await response.json();

        jokeTitle.textContent =
            "Here's your joke!";

        jokeText.textContent =
            `${data.setup} ${data.punchline}`;


    } catch (err) {

        error.textContent =
            "Unable to fetch a joke. Please try again.";

        error.classList.remove("hidden");

        jokeTitle.textContent =
            "Something went wrong";

        jokeText.textContent =
            "Please check your internet connection and try again.";


    } finally {

        loading.classList.add("hidden");

        jokeButton.disabled = false;
    }
}


jokeButton.addEventListener(
    "click",
    fetchJoke
);