import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../services/dashboard.service';
import { cardData, chartData, User } from '../../shared/models';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalNewTaskComponent } from '../../shared/components/modal-task/modal-task.component';
import { UserService } from '../../services/user.service';
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
  private _userService = inject(UserService);

  protected loggedInUser: User | null = null;
  protected cardData: WritableSignal<cardData> = signal({
    total_concluidas: 0,
    total_pendentes: 0,
    total_progresso: 0
  })
  protected chartData: WritableSignal<chartData[]> = signal([]);
  protected overdueTasks: WritableSignal<number> = signal(0);

  protected showLineChart: WritableSignal<boolean> = signal(false);
  protected showModalNewTask: boolean = false;
  protected addIcon = faPlus;

  get cardEntries() {
    const cardDataWithoutAtraso: Partial<cardData> = { ...this.cardData() };
    delete cardDataWithoutAtraso.total_atraso;
    return Object.entries(cardDataWithoutAtraso as cardData);
  }

  ngOnInit(): void {
    this.getDashboardData();
    this.loggedInUser = this._userService.loggedInUser; //necessidade de usar behaviorSubject? to do
  }

  protected getDashboardData() {
    this._getCardData();
    this._getChartData();
  }

  private _getCardData() {
    this._dashboardservice.getCardData().subscribe({
      next: (data) => {
        this.cardData.set(data);
        this.overdueTasks.set(data.total_atraso || 0);
      },
      error: () => this._toastr.error('Falha na requisição')
    })
  }

  private _getChartData() {
    this._dashboardservice.getChartData().subscribe({
      next: (data) => {
        this.chartData.set(data);
        this.showLineChart.set(true)
      },
      error: () => this._toastr.error('Falha na requisição')
    })
  }
}
