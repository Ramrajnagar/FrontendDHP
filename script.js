const apiUrl = "https://your-flask-api.onrender.com/data"; // Replace with your backend URL

async function fetchData() {
  const res = await fetch(apiUrl);
  const raw = await res.json();

  // Process the data: count technologies per date
  const dateCounts = {};
  raw.forEach(item => {
    const date = item.date;
    if (!dateCounts[date]) dateCounts[date] = 0;
    dateCounts[date]++;
  });

  const labels = Object.keys(dateCounts);
  const values = Object.values(dateCounts);

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
        label: 'Technology Count (Line)',
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
        label: 'Technology Count (Bar)',
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
