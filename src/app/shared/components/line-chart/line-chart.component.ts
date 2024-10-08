import { Component, effect, input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { chartData } from '../../models';
import ChartDataLabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  chartData = input<chartData[]>([]);

  data: any = {};

  constructor() {
    effect(() => {
      this.setDataChart()
    })
  }

  ngOnInit(): void {
    this.setDataChart();
  }

  protected setDataChart() {
    let dates = this.chartData().map(data => data.data_conclusao);
    dates = [...new Set(dates)];

    const groupedData: { [key: string]: string[] } = {};
    this.chartData().forEach(task => {
      if (!groupedData[task.data_conclusao]) {
        groupedData[task.data_conclusao] = [];
      }
      groupedData[task.data_conclusao].push(task.nome);
    });

    const numberOfTasksPerDate = dates.map(date => groupedData[date].length);

    const shadowPlugin = {
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const _stroke = ctx.stroke;
        ctx.stroke = function() {
          ctx.save();
          ctx.shadowColor = 'rgba(74, 216, 148, 0.4)'; 
          ctx.shadowBlur = 12; 
          ctx.shadowOffsetX = 0; 
          ctx.shadowOffsetY = 8; 
          _stroke.apply(this, arguments as any);
          ctx.restore();
        };
      }
    };

    this.data = {
      data: {
        labels: dates,
        datasets: [{
          data: numberOfTasksPerDate,
          borderColor: '#4ad894',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#4ad894',
          pointBorderColor: '#4ad894',
          pointBorderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: false
            },
            ticks: {
              font: {
                family: 'Poppins',
                size: 13
              }
            },
            grid: {
              display: false
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                family: 'Poppins',
                size: 13
              }
            },
            title: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const index = context.dataIndex;
                const date = context.chart.data.labels[index];
                const tasks = groupedData[date];

                return tasks ? `${tasks.join(', ')}` : '';
              }
            },
            displayColors: false, //remoção do colorbox
            backgroundColor: '#fff',
            titleColor: '#2d383e',
            bodyColor: '#2d383e',
            bodyFont: {
              family: 'Poppins',
              size: 12,
              wrap: 'wrap'
            },
            titleFont: {
              family: 'Poppins',
              size: 11,
              weight: 500
            },
          },
          datalabels: {
            display: false
          }
        }
      },
      plugins: [ChartDataLabels, shadowPlugin]
    };
  }
}
