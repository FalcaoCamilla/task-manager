import { CardComponent } from "../../shared/components/card/card.component";
import { cardData, chartData, SelectData, User } from '../../shared/models';
import { CardModule } from 'primeng/card';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DropdownModule } from 'primeng/dropdown';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { ModalNewTaskComponent } from '../../shared/components/modal-task/modal-task.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ModalNewTaskComponent, CardComponent, CardModule, CommonModule, DropdownModule, FontAwesomeModule, FormsModule, LineChartComponent],
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

  protected filterOptions: SelectData[] = [
    {id: 1, text: 'Hoje'},
    {id: 2, text: 'Últimos 7 dias'},
    {id: 3, text: 'Últimos 15 dias'},
    {id: 4, text: 'Últimos 30 dias'},
  ];
  protected selectedOption: number = 4;

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
    this.getChartData();
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

  protected getChartData() {
    this._dashboardservice.getChartData(this.selectedOption).subscribe({
      next: (data) => {
        this.chartData.set(data);
        this.showLineChart.set(true)
      },
      error: () => this._toastr.error('Falha na requisição')
    })
  }
}
