let quotes = [];
let currentPage = 0;
const quotesPerPage = 20;

// Fetch quotes from JSON file
async function loadQuotes() {
	try {
		const res = await fetch("quotes.json");
		quotes = await res.json();
		renderQuotes();
		showDailyQuote();
	} catch (err) {
		console.error("Failed to load quotes:", err);
	}
}

function showDailyQuote() {
	if (quotes.length === 0) return;
	const random = quotes[Math.floor(Math.random() * quotes.length)];
	document.getElementById("daily-quote").textContent = `"${random.text}"`;
	if (random.dhivehi === true) {
		document.getElementById(
			"daily-author"
		).textContent = `${random.author} —`;
        
        document.getElementById(
            "daily-author"
        ).classList.add("dhivehi");
	} else
		document.getElementById(
			"daily-author"
		).textContent = `— ${random.author}`;
}

function renderQuotes(filter = "", reset = false) {
	const grid = document.getElementById("quote-grid");
	if (reset) {
		grid.innerHTML = "";
		currentPage = 0;
	}

	const fragment = document.createDocumentFragment();
	const filteredQuotes = quotes.filter(
		(q) =>
			q.text.toLowerCase().includes(filter.toLowerCase()) ||
			q.author.toLowerCase().includes(filter.toLowerCase())
	);

	const start = currentPage * quotesPerPage;
	const end = start + quotesPerPage;
	const pageQuotes = filteredQuotes.slice(start, end);

	pageQuotes.forEach((quote) => {
		const card = document.createElement("div");
		card.className = "card";

		if (quote.dhivehi === true) {
			card.innerHTML = `
      <p class="quote">"${quote.text}"</p>
      <p class="author">${quote.author} —</p>
    `;
			card.classList.add("dhivehi");
		} else {
			card.innerHTML = `
      <p class="quote">"${quote.text}"</p>
      <p class="author">— ${quote.author}</p>
    `;
		}
		fragment.appendChild(card);
	});

	grid.appendChild(fragment);
	currentPage++;

	// Hide Load More if no more quotes
	document.getElementById("load-more").style.display =
		end < filteredQuotes.length ? "block" : "none";
}

document
	.getElementById("load-more")
	.addEventListener("click", () =>
		renderQuotes(document.getElementById("search").value)
	);

document.getElementById("search").addEventListener("input", (e) => {
	renderQuotes(e.target.value);
});
document.getElementById("search").addEventListener("input", (e) => {
	renderQuotes(e.target.value, true);
});

loadQuotes();
