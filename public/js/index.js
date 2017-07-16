const snippetTable = document.querySelector(".snippetTable");
const snippetForm = document.querySelector(".snippetForm");

fetch("http://localhost:3000/snippets").then(function (response) {
  response.json().then(function (data) {
      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr"),
            newTitle = document.createElement("td"),
            newBody = document.createElement("td"),
            newNotes = document.createElement("td"),
            newLanguage = document.createElement("td"),
            newTags = document.createElement("td");

        newTitle.innerText = data[i].title;
        newBody.innerText = data[i].body;
        newNotes.innerText = data[i].notes;
        newLanguage.innerText = data[i].language;
        newTags.innerText = data[i].tags;

        newRow.appendChild(newTitle);
        newRow.appendChild(newBody);
        newRow.appendChild(newNotes);
        newRow.appendChild(newLanguage);
        newRow.appendChild(newTags);
        snippetTable.appendChild(newRow);
      }
  });
});

snippetForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let url = "/snippets";
  let snippets = {
    title: document.querySelector("input[name=title]").value,
    body: document.querySelector("textarea").value,
    notes: document.querySelector("input[name=notes]").value,
    language: document.querySelector("input[name=language]").value,
  };

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(snippets),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  fetch(request).then(function(res) {
    window.location.reload(false);
  });
});
