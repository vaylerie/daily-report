export interface DailyReport {
  id: string;
  userId?: string;
  activities?: string;
  progress?: string;
  problems?: string;
  solution?: string;
  planTomorrow?: string;
  status?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}
