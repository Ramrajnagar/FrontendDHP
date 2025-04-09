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

// Function to fetch data automatically when the page loads
async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    const raw = await res.json();
    processData(raw);
  } catch (error) {
    console.log("API fetch failed, using fallback data:", error);
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
      tension: 0.1
    };
  });

  // Line Chart
  const lineChartContext = document.getElementById("lineChart").getContext("2d");
  new Chart(lineChartContext, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { text: "Year", display: true, color: "#c9d1d9" },
          ticks: { color: "#c9d1d9" }
        },
        y: {
          title: { text: "Count", display: true, color: "#c9d1d9" },
          ticks: { color: "#c9d1d9" }
        }
      }
    }
  });

  // Bar Chart
  const barChartContext = document.getElementById("barChart").getContext("2d");
  new Chart(barChartContext, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { text: "Year", display: true, color: "#c9d1d9" },
          ticks: { color: "#c9d1d9" }
        },
        y: {
          title: { text: "Count", display: true, color: "#c9d1d9" },
          ticks: { color: "#c9d1d9" }
        }
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

// Light/dark mode toggle
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  themeToggleBtn.textContent = isLightMode ? "🌙" : "☀️";
});

// Call the fetchData function on page load
window.onload = fetchData;
