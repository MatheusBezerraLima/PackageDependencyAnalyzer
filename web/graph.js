const form = document.querySelector('#uploadForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const res = await fetch('/analyze', {
    method: 'POST',
    body: formData
  });

  const graphData = await res.json();
  renderGraph(graphData); // função que plota o grafo
});
