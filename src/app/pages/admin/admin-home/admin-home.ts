import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { combineLatest, map, Observable } from 'rxjs';
import { AdminCardService } from '../../../services/admin-card.service';
import { UserService, UserWithCards } from '../../../services/user.service';

interface DashboardVM {
  totalUsers: number;
  totalCards: number;
  activeCards: number;
  averageCardsPerUser: number;
  topUser?: {
    nome: string;
    totalCards: number;
  };
}

type BarChartOptions = {
  colors: string[];
  fill: any;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'admin-home',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('300ms ease-out'),
      ]),
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query(
          '.card',
          [
            style({ opacity: 0, transform: 'translateY(12px)' }),
            stagger(80, animate('300ms ease-out')),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AdminHome implements OnInit {
  dashboard$!: Observable<DashboardVM>;
  latestCards$!: Observable<any[]>;

  // 🔒 SEM Partial
  barChartOptions: BarChartOptions = {
    series: [
      {
        name: 'Cartões',
        data: [],
      },
    ],
    colors: ['#59c1a9'],
    chart: {
      type: 'bar', // 🔥 DEFINE O TIPO IMEDIATAMENTE
      height: 280,
      toolbar: { show: false },
      foreColor: '#ffffff',
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: '#ffffff',
          fontSize: '12px',
        },
      },
      axisBorder: {
        color: 'rgba(255,255,255,0.25)',
      },
      axisTicks: {
        color: 'rgba(255,255,255,0.25)',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.15)',
      strokeDashArray: 4,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `${val} cartões`,
      },
    },
    fill: {
      opacity: 0.9,
    },
  };

  constructor(private userService: UserService, private cardService: AdminCardService) {}

  ngOnInit(): void {
    this.latestCards$ = this.cardService
      .getAll()
      .pipe(map((cards) => cards.slice().reverse().slice(0, 5)));

    this.dashboard$ = combineLatest({
      users: this.userService.searchUsers(),
      cards: this.cardService.getAll(),
      usersWithCards: this.userService.getUsersWithCards(),
    }).pipe(
      map(({ users, cards, usersWithCards }) => {
        // ✅ ATUALIZA APENAS OS DADOS
        this.barChartOptions.series[0].data = usersWithCards.map((u) => u.totalCards);

        this.barChartOptions.xaxis.categories = usersWithCards.map((u) => u.nome);

        const totalUsers = users.length;
        const totalCards = cards.length;
        const activeCards = cards.filter((c) => c.status).length;
        const averageCardsPerUser = totalUsers ? totalCards / totalUsers : 0;

        const topUser = usersWithCards.reduce<UserWithCards | undefined>(
          (prev, curr) => (!prev || curr.totalCards > prev.totalCards ? curr : prev),
          undefined
        );

        return {
          totalUsers,
          totalCards,
          activeCards,
          averageCardsPerUser: Number(averageCardsPerUser.toFixed(1)),
          topUser: topUser ? { nome: topUser.nome, totalCards: topUser.totalCards } : undefined,
        };
      })
    );
  }
}
