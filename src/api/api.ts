import { $api } from "./config";

export interface ReserveCarRequest {
  mcarId: number;
  mcustomerId: number;
  mreservationdate: Date;
  mperiodindays: number;
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
    const { data } = await $api.post("/car/reservecar", req);
    return data;
  }
}

export const api = new Api();
