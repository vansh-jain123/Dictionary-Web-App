const result = document.getElementById("result");
const toggle = document.getElementById("toggleDark");
const fontSelect = document.getElementById("fontSelect");

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.title === "No Definitions Found") {
        result.innerHTML = `<p>Word not found. Try another one.</p>`;
        return;
      }

      const item = data[0];
      const phonetic = item.phonetic || "";
      const meanings = item.meanings
        .map((meaning) => {
          const defs = meaning.definitions
            .map(
              (def) =>
                `<li>${def.definition}${
                  def.example ? `<br><i>"${def.example}"</i>` : ""
                }</li>`
            )
            .join("");
          return `<h4>${meaning.partOfSpeech}</h4><ul>${defs}</ul>`;
        })
        .join("");

      result.innerHTML = `
        <h2>${item.word}</h2>
        <div class="phonetic">${phonetic}</div>
        ${meanings}
        <p><b>Source:</b> <a href="${item.sourceUrls?.[0]}" target="_blank">${item.sourceUrls?.[0]}</a></p>
      `;
    })
    .catch((err) => {
      result.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    });
}

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Font selector
fontSelect.addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});
