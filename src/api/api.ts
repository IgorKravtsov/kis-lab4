import { $api } from "./config";

// public int CarId { get; set; }
// public int CustomerId { get; set; }
// public DateTime ReservationDate { get; set; }
// public int PeriodInDays { get; set; }

export interface ReserveCarRequest {
  carId: number;
  customerId: number;
  reservationDate: Date;
  periodInDays: number;
}

class Api {
  // async getOrders() {
  //   const { data } = await $api.get<Task1Rows[]>("/order/all");
  //   return data;
  // }

  async cancelReservation(reservationId: number) {
    const { data } = await $api.post("/car/cancelreservation", {
      reservationId,
    });
    return data;
  }

  async reserveCar(req: ReserveCarRequest) {
    const { data } = await $api.post("/car/reserve", req);
    return data;
  }

  async getFreeCars(date: Date | null) {
    if (!date) return;
    const { data } = await $api.get("/car/freecars", { params: { date } });
    return data;
  }
}

export const api = new Api();
