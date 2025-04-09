<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const apiUrl = "https://dhp-backend-production.up.railway.app/data";

async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    const raw = await res.json();

    // Extract labels (years) and tag-wise values
    const labels = Object.keys(raw); // ["2023", "2024", "2025"]

    // Collect all unique tags across years
    const tagSet = new Set();
    labels.forEach(year => {
      raw[year].forEach(item => tagSet.add(item.tag));
    });

    const uniqueTags = Array.from(tagSet); // All tags that appeared in top 6 of any year

    // Build dataset for each tag
    const datasets = uniqueTags.map(tag => {
      return {
        label: tag,
        data: labels.map(year => {
          const tagData = raw[year].find(item => item.tag === tag);
          return tagData ? tagData.count : 0;
        }),
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor()
      };
    });

    renderLineChart(labels, datasets);
    renderBarChart(labels, datasets);
  } catch (error) {
    console.error("❌ Failed to fetch or process data:", error);
  }
}

function renderLineChart(labels, datasets) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: "#c9d1d9" } },
        y: { ticks: { color: "#c9d1d9" } }
      },
      plugins: {
        legend: {
          labels: { color: "#c9d1d9" }
        }
      }
    }
  });
}

function renderBarChart(labels, datasets) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      scales: {
        x: { stacked: true, ticks: { color: "#c9d1d9" } },
        y: { stacked: true, ticks: { color: "#c9d1d9" } }
      },
      plugins: {
        legend: {
          labels: { color: "#c9d1d9" }
        }
      }
    }
  });
}

// Generate random pastel colors
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
}

fetchData();
</script>
