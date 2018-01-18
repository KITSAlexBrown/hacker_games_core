
// Base model interface
export interface IResponse  {
  message: string;
  reason?: string;
  stack?: any,
  status: number,
  timestamp: Date
}

