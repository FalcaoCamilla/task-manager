import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../services/dashboard.service';
import { cardData, DashboardData } from '../../shared/models';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, CardModule, FontAwesomeModule, LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private _dashboardservice = inject(DashboardService);
  private _toastr = inject(ToastrService);

  protected dashboardData: WritableSignal<DashboardData> = signal({
    chartData: [], 
    cardData: {
      total_concluidas: 0,
      total_pendentes: 0,
      total_progresso: 0
    }
  });

  protected showLineChart: WritableSignal<boolean> = signal(false);
  protected addIcon = faPlus;

  get cardEntries() {
    return Object.entries(this.dashboardData().cardData as cardData)
  }

  ngOnInit(): void {
    this._dashboardservice.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.showLineChart.set(true)
      },
      error: () => this._toastr.error('Falha na requisição')
    })
  }

  // private filterTasksByDate(finishDate: Date | null | undefined, filter: 'last15' | 'last30' | 'today', today: Date): boolean {
  //   if (!finishDate) {
  //     return false;
  //   }
  
  //   const finishDateObject = new Date(finishDate);
  
  //   switch (filter) {
  //     case 'last15':
  //       return finishDateObject >= new Date(today.setDate(today.getDate() - 15));
  //     case 'last30':
  //       return finishDateObject >= new Date(today.setDate(today.getDate() - 30));
  //     case 'today':
  //       return finishDateObject.getFullYear() === today.getFullYear() &&
  //              finishDateObject.getMonth() === today.getMonth() &&
  //              finishDateObject.getDate() === today.getDate();
  //   }
  
  //   return false;
  // }
}
