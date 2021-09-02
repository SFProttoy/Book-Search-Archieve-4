const searchField = document.getElementById("search-field");
const bookViews = document.getElementById("book-details");
const totalResult = document.getElementById("total-result");
const invalidInput = document.getElementById("invalid-input");

// search books
const searchBooks = () => {
  const searchText = searchField.value;
  searchField.value = "";
  bookViews.innerHTML = "";
  totalResult.innerHTML = "";
  invalidInput.innerText = "";
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())

    // check invalid inputs
    .then((data) => {
      if (data.numFound === 0) {
        invalidInput.innerText = "No Result Found";
        return;
      }

      // show results
      totalResult.innerText = `${data.numFound} Results Found`;

      bookDetails(data.docs);
    });
};

// Book Details

const bookDetails = (books) => {
  books.forEach((book) => {
    // check unavailable property
    if (
      book.hasOwnProperty("!book.publisher[0]") ||
      !book.publisher ||
      book.hasOwnProperty("!book.author_name[0]") ||
      !book.author_name
    ) {
      return;
    }

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <img
            id="book-image"
            src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
            class="card-img-top"
            style="height: 300px"
            alt="..."
        />
        <div class="card-body">
            <h4 class="fs-2 fw-bold">Book Name: <span class="fs-4 fw-normal">${
              book.title
            }</span></h4>
            <h5 class="fs-3 fw-bold">
            Author Name:
            <span class="fs-4 fw-normal">${
              book.author_name[0] ? book.author_name[0] : "Not Found"
            }</span>
            </h5>
            <p class="fs-4 fw-bold">Publisher: <span class="fw-normal">
            
            ${book.publisher[0] ? book.publisher[0] : "Not Found"}
            
            </span>
              </p>
            <p class="fs-4 fw-bold">First-Publish: <span class="fw-normal">${
              book.first_publish_year ? book.first_publish_year : "Not Found"
            }</span>
            </p>
        </div>
        </div>
        `;
    bookViews.appendChild(div);
  });
};
