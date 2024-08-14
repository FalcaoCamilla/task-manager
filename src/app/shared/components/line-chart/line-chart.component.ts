import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { chartData, SelectData } from '../../models';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() chartData: chartData[] = [];

  data: any = {};

  protected filterOptions: SelectData[] = [
    {id: 1, text: 'Hoje'},
    {id: 2, text: 'Últimos 7 dias'},
    {id: 3, text: 'Últimos 15 dias'},
  ];
  protected selectedOption: number = 3;

  constructor() {}

  ngOnInit(): void {
    this.setDataChart();
  }

  protected setDataChart() {
    let dates = this.chartData.map(data => data.data_conclusao);
    dates = [...new Set(dates)];

    const groupedData: { [key: string]: string[] } = {};
    this.chartData.forEach(task => {
      if (!groupedData[task.data_conclusao]) {
        groupedData[task.data_conclusao] = [];
      }
      groupedData[task.data_conclusao].push(task.nome);
    });

    const numberOfTasksPerDate = dates.map(date => groupedData[date].length);

    this.data = {
      data: {
        labels: dates,
        datasets: [{
          data: numberOfTasksPerDate,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
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
            }
          },
          datalabels: {
            display: false
          }
        }
      },
      plugins: [ChartDataLabels]
    };
  }
}
