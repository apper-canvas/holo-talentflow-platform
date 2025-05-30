export const getChartOptions = (type, data = {}) => {
  const baseOptions = {
    chart: { 
      toolbar: { show: false } 
    },
    colors: ['#2563eb']
  }

  switch (type) {
    case 'line':
      return {
        ...baseOptions,
        chart: { 
          type: 'line', 
          toolbar: { show: false } 
        },
        xaxis: { 
          categories: data.categories || [] 
        },
        stroke: { 
          curve: 'smooth' 
        }
      }

    case 'donut':
      return {
        ...baseOptions,
        chart: { 
          type: 'donut' 
        },
        labels: data.labels || [],
        colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      }

    case 'bar':
      return {
        ...baseOptions,
        chart: { 
          type: 'bar', 
          toolbar: { show: false } 
        },
        xaxis: { 
          categories: data.categories || [] 
        }
      }

    case 'horizontalBar':
      return {
        ...baseOptions,
        chart: { 
          type: 'bar', 
          toolbar: { show: false } 
        },
        xaxis: { 
          categories: data.labels || [] 
        },
        plotOptions: { 
          bar: { 
            horizontal: true 
          } 
        }
      }

    default:
      return baseOptions
  }
}