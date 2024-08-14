export type DashboardData = {
  cardData: cardData,
  chartData: chartData[]
}

export type cardData = {
  total_pendentes: number,
  total_progresso: number,
  total_concluidas: number,
  total_atraso?: number
}

export type chartData = {
  data_conclusao: string,
  nome: string,
}