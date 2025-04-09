const apiUrl = "https://dhp-backend-production.up.railway.app/data";

async function fetchData() {
  const res = await fetch(apiUrl);
  const raw = await res.json();

  // Count total tags per date
  const dateTagCount = {};

  raw.forEach(item => {
    const date = item.date;
    const tagCount = item.tags.length;

    if (!dateTagCount[date]) {
      dateTagCount[date] = 0;
    }

    dateTagCount[date] += tagCount;
  });

  const labels = Object.keys(dateTagCount);
  const values = Object.values(dateTagCount);

  renderLineChart(labels, values);
  renderBarChart(labels, values);
}

function renderLineChart(labels, values) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Total Tags per Date (Line)',
        data: values,
        borderColor: '#58a6ff',
        backgroundColor: '#58a6ff44',
        tension: 0.3,
        fill: true
      }]
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

function renderBarChart(labels, values) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total Tags per Date (Bar)',
        data: values,
        backgroundColor: '#238636'
      }]
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

fetchData();
