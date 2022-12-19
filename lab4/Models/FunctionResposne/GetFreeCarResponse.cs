namespace lab4.Models.FunctionResposne
{
    //cars.carid  AS carid,
    //cars.mark AS mark,
    //cars.model AS model,
    //cars.price AS price,
    //cars.hostid AS host

    public class GetFreeCarResponse
    {
        public GetFreeCarResponse(int carId, string mark, string model, double price, int host)
        {
            CarId = carId;
            Mark = mark;
            Model = model;
            Price = price;
            Host = host;
        }

        public int CarId { get; private set; }
        public string Mark { get; private set; }
        public string Model { get; private set; }
        public double Price { get; private set; }
        public int Host { get; private set; }
    }
}
