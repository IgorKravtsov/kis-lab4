using lab4.Dtos;
using lab4.Models;
using lab4.Models.FunctionResposne;
using lab4.Models.ProcedureResponse;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace lab4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ModelContext modelContext;

        public CarController(ModelContext modelContext)
        {
            this.modelContext = modelContext;
        }

        [HttpPost("cancelreservation")]
        public async Task<IActionResult> CancelReservation([FromBody] CancelReservationRequest cancelReservationRequest)
        {
            var outputParam = new OracleParameter()
            {
                ParameterName = "successstatus",
                OracleDbType = OracleDbType.Char,
                Direction = ParameterDirection.Output
            };

            var inputParam = new OracleParameter()
            {
                ParameterName = "reservationid",
                OracleDbType = OracleDbType.Int32,
                Direction = ParameterDirection.Input,
                Value = cancelReservationRequest.ReservationId
            };

            var parameters = new[] {
                outputParam,
                inputParam
            };

            try
            {
                var storedProc = "BEGIN MY_TEMP_USER.carmanager.canclereservation(:reservationid, :successstatus); END;";
                var responses = await modelContext.Database.ExecuteSqlRawAsync(storedProc, parameters);
                var respo = outputParam.Value.ToString();
                if (respo != "")
                {
                    throw new Exception("Reservation cancelation failed");
                }
                return Ok(new { reservationOpResponse = "Reservation deleted" });
            }
            catch (OracleException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCars() 
        {
            var cars = await modelContext.Cars.ToListAsync();
            return Ok(cars);
        }

        [HttpPost("reserve")]
        public async Task<IActionResult> ReserveCar([FromBody] ReserveCarRequest reserveCarRequest)
        {
            var outputParam = new OracleParameter()
            {
                ParameterName = "mreservationid",
                OracleDbType = OracleDbType.Int32,
                Direction = ParameterDirection.Output
            };

            var parameters = new[] {
                new OracleParameter()
                {
                   ParameterName = "mcarid",
                   OracleDbType = OracleDbType.Int32,
                   Direction = ParameterDirection.Input,
                   Value = reserveCarRequest.CarId
                },
                new OracleParameter()
                {
                   ParameterName = "mcustomerid",
                   OracleDbType = OracleDbType.Int32,
                   Direction = ParameterDirection.Input,
                   Value = reserveCarRequest.CustomerId
                },
                new OracleParameter()
                {
                   ParameterName = "mreservationdate",
                   OracleDbType = OracleDbType.Date,
                   Direction = ParameterDirection.Input,
                   Value = reserveCarRequest.ReservationDate
                },
                new OracleParameter()
                {
                   ParameterName = "mperiodindays",
                   OracleDbType = OracleDbType.Int32,
                   Direction = ParameterDirection.Input,
                   Value = reserveCarRequest.PeriodInDays
                },
               outputParam
            };

            try
            {
                var storedProc = "BEGIN MY_TEMP_USER.carmanager.reservecar(:mcarid, :mcustomerid, :mreservationdate, :mperiodindays, :mreservationid); END;";
                var responses = await modelContext.Database.ExecuteSqlRawAsync(storedProc, parameters);

                var createdReservationId = decimal.Parse(outputParam.Value.ToString());
                if (createdReservationId == -2)
                {
                    throw new Exception("INSERT failed due to incorrect reservation date(no free dates are available");
                }
                return Ok(new { newReservations = createdReservationId });
            }
            catch (OracleException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("freecars")]
        public async Task<IActionResult> GetFreeCars(DateTime date)
        {
            using (var connection = modelContext.Database.GetDbConnection())
            {
                List<GetFreeCarResponse> result = new List<GetFreeCarResponse>();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "MY_TEMP_USER.GetAvailableCarsForDat";
                    command.CommandType = CommandType.StoredProcedure;

                    var rf_cursor = new OracleParameter("rf_cursor", OracleDbType.RefCursor, ParameterDirection.ReturnValue);
                    var inputDate = new OracleParameter("mDate", OracleDbType.Date, date, ParameterDirection.Input);

                    command.Parameters.Add(rf_cursor);
                    command.Parameters.Add(inputDate);

                    try
                    {
                        await connection.OpenAsync();
                        await command.ExecuteNonQueryAsync();
                        OracleDataReader dr = ((OracleRefCursor)rf_cursor.Value).GetDataReader();
                        while (dr.Read())
                        {
                            var carData = new GetFreeCarResponse(dr.GetInt32(0), dr.GetString(1), dr.GetString(2),
                                dr.GetDouble(3), dr.GetInt32(4));
                            result.Add(carData);
                        }
                        dr.Close();
                    }
                    catch (OracleException e)
                    {

                        foreach (OracleError err in e.Errors)
                        {
                            Console.WriteLine("Message:\n{0}\nSource:\n{1}\n", err.Message, err.Source);
                            System.Diagnostics.Debug.WriteLine("Message:\n{0}\nSource:\n{1}\n", err.Message, err.Source);
                        }
                        return BadRequest();
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                    finally 
                    {
                        await connection.CloseAsync();
                    }
                }
                return Ok(result);
            }
        }
    }
}
