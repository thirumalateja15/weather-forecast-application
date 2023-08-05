const ctx = document.getElementById('myChart');

export let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [{
      label: 'Temperatures',
      data: [27, 28, 28, 30, 31, 32, 29, 28],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
      }
    }
  }
});