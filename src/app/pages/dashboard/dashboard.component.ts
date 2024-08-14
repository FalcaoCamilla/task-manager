import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../services/dashboard.service';
import { cardData, DashboardData } from '../../shared/models';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalNewTaskComponent } from '../../shared/components/modal-new-task/modal-new-task.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ModalNewTaskComponent, CardComponent, CardModule, FontAwesomeModule, LineChartComponent],
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
  protected overdueTasks: WritableSignal<number> = signal(0);

  protected showLineChart: WritableSignal<boolean> = signal(false);
  protected showModalNewTask: boolean = false;
  protected addIcon = faPlus;

  get cardEntries() {
    const cardDataWithoutAtraso: Partial<cardData> = { ...this.dashboardData().cardData };
    delete cardDataWithoutAtraso.total_atraso;
    return Object.entries(cardDataWithoutAtraso as cardData);
  }

  ngOnInit(): void {
    this._dashboardservice.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.overdueTasks.set(data.cardData.total_atraso || 0);
        this.showLineChart.set(true)
      },
      error: () => this._toastr.error('Falha na requisição')
    })
  }
}
