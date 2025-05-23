let quotes = [];
let currentPage = 0;
const quotesPerPage = 20;

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
	const quoteEl = document.getElementById("daily-quote");
	const authorEl = document.getElementById("daily-author");

	// Author exists
	if (random.author) {
		quoteEl.textContent = `"${random.text}"`;

		authorEl.textContent = random.dhivehi
			? `${random.author} —`
			: `— ${random.author}`;
		authorEl.classList.toggle("dhivehi", !!random.dhivehi);
	} else {
		// No author
		quoteEl.textContent = random.text;
		authorEl.textContent = "";
		authorEl.classList.remove("dhivehi");
	}
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
			card.classList.add("dhivehi");
		}

		// No author case
		if (!quote.author) {



			if (quote.conversation) {
				card.innerHTML = `
					<p class="quote no-quotes">${quote.text}</p>
					<p class="quote no-quotes">${quote.conversation}</p>
				`;
			}
			else {
				card.classList.add("centered-text");
				card.innerHTML = `
				<p class="quote no-quotes">${quote.text}</p>
			`;
			}
		} else {
			// With author
			const quoteText = `"${quote.text}"`;
			const authorText = quote.dhivehi
				? `${quote.author} —`
				: `— ${quote.author}`;

			card.innerHTML = `
				<p class="quote">${quoteText}</p>
				<p class="author">${authorText}</p>
			`;


		}


		fragment.appendChild(card);
	});

	grid.appendChild(fragment);
	currentPage++;

	document.getElementById("load-more").style.display =
		end < filteredQuotes.length ? "block" : "none";
}

document
	.getElementById("load-more")
	.addEventListener("click", () =>
		renderQuotes(document.getElementById("search").value)
	);

document.getElementById("search").addEventListener("input", (e) => {
	renderQuotes(e.target.value, true);
});

loadQuotes();
