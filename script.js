const apiUrl = "https://dhp-backend-production.up.railway.app/data"; // ✅ Make sure this is reachable

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    const raw = await res.json();

    const labels = Object.keys(raw); // ["2023", "2024", "2025"]

    // Get unique tags
    const tagSet = new Set();
    labels.forEach(year => {
      raw[year].forEach(item => tagSet.add(item.tag));
    });
    const uniqueTags = Array.from(tagSet);

    const datasets = uniqueTags.map(tag => {
      return {
        label: tag,
        data: labels.map(year => {
          const found = raw[year].find(item => item.tag === tag);
          return found ? found.count : 0;
        }),
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(),
        fill: false,
        tension: 0.3
      };
    });

    renderLineChart(labels, datasets);
    renderBarChart(labels, datasets);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

function renderLineChart(labels, datasets) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#c9d1d9" } }
      },
      scales: {
        x: { ticks: { color: "#c9d1d9" } },
        y: { ticks: { color: "#c9d1d9" } }
      }
    }
  });
}

function renderBarChart(labels, datasets) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#c9d1d9" } }
      },
      scales: {
        x: { stacked: true, ticks: { color: "#c9d1d9" } },
        y: { stacked: true, ticks: { color: "#c9d1d9" } }
      }
    }
  });
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
}

fetchData();
