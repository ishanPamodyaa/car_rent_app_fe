export interface Booking {
  bookId?: number;
  fromDate: string;
  toDate: string;
  days: number;
  amount: number;
  bookCarStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: number;
  carId: number;
}
