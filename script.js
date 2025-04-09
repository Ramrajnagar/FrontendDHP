// Set your API URL
const apiUrl = "https://dhp-backend-production.up.railway.app/data";

// Fallback data in case the API is unavailable
const fallbackData = {
  "2023": [
    { "count": 266, "tag": "python" },
    { "count": 176, "tag": "javascript" },
    { "count": 112, "tag": "reactjs" },
    { "count": 92, "tag": "java" },
    { "count": 73, "tag": "c#" },
    { "count": 73, "tag": "typescript" }
  ],
  "2024": [
    { "count": 688, "tag": "python" },
    { "count": 409, "tag": "javascript" },
    { "count": 268, "tag": "c#" },
    { "count": 252, "tag": "reactjs" },
    { "count": 251, "tag": "android" },
    { "count": 224, "tag": "java" }
  ],
  "2025": [
    { "count": 870, "tag": "python" },
    { "count": 476, "tag": "javascript" },
    { "count": 381, "tag": "java" },
    { "count": 321, "tag": "c#" },
    { "count": 299, "tag": "c++" },
    { "count": 292, "tag": "reactjs" }
  ]
};

// Function to fetch data
async function fetchData() {
  try {
    // Attempt to fetch data from the API
    const res = await fetch(apiUrl);
    const raw = await res.json();

    // Process the data
    processData(raw);
  } catch (error) {
    console.log("API fetch failed, using fallback data:", error);
    // If API fetch fails, use the fallback data
    processData(fallbackData);
  }
}

// Function to process the data and render charts
function processData(data) {
  const labels = Object.keys(data); // ["2023", "2024", "2025"]

  // Get unique tags across all years
  const tagSet = new Set();
  labels.forEach(year => {
    data[year].forEach(item => tagSet.add(item.tag));
  });
  const uniqueTags = Array.from(tagSet);

  // Prepare datasets for the line chart and bar chart
  const datasets = uniqueTags.map(tag => {
    return {
      label: tag,
      data: labels.map(year => {
        const found = data[year].find(item => item.tag === tag);
        return found ? found.count : 0;
      }),
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
      fill: false,
      tension: 0.3
    };
  });

  // Render the charts
  renderLineChart(labels, datasets);
  renderBarChart(labels, datasets);
}

// Function to render the line chart
function renderLineChart(labels, datasets) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#c9d1d9" }
        }
      },
      scales: {
        x: { ticks: { color: "#c9d1d9" } },
        y: { ticks: { color: "#c9d1d9" } }
      }
    }
  });
}

// Function to render the bar chart
function renderBarChart(labels, datasets) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#c9d1d9" }
        }
      },
      scales: {
        x: { stacked: true, ticks: { color: "#c9d1d9" } },
        y: { stacked: true, ticks: { color: "#c9d1d9" } }
      }
    }
  });
}

// Helper function to generate random color
function getRandomColor() {
  return 'rgba(' + Math.floor(Math.random() * 256) + ',' +
                   Math.floor(Math.random() * 256) + ',' +
                   Math.floor(Math.random() * 256) + ', 0.6)';
}

// Toggle theme between dark and light mode
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Handle fetch button click
document.getElementById("fetch-btn").addEventListener("click", function() {
  fetchData();
  document.getElementById("chartSection").style.display = "block";
});

// Love Button Toggle
document.getElementById("love-btn").addEventListener("click", function() {
  const btn = document.getElementById("love-btn");
  if (btn.innerHTML === "❤️") {
    btn.innerHTML = "💖";
  } else {
    btn.innerHTML = "❤️";
  }
});
