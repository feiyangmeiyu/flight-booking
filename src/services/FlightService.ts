import { FlightInfo } from '../interfaces/Flight.interface';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

class FlightService {
  private flightInfos;
  constructor(flightInfos: FlightInfo[]) {
    this.flightInfos = flightInfos;
  }

  private isBeforeByMinute(fromDate: string, toDate: string) {
    return dayjs(fromDate, 'YYYYMMDDHHmm').isBefore(
      dayjs(toDate, 'YYYYMMDDHHmm'),
      'minute',
    );
  }

  public getAvailableFlights(
    isRoundTrip: boolean,
    fromCity: string,
    toCity: string,
    fromDate: Date,
    toDate: Date,
  ) {
    if (isRoundTrip) {
      const takeOffFlights = this.getAvailableSingleFlights(
        isRoundTrip,
        fromCity,
        toCity,
        fromDate,
      );
      const returnFlights = this.getAvailableSingleFlights(
        isRoundTrip,
        toCity,
        fromCity,
        toDate,
      );

      const availableFlights = [];
      for (const takeOffFlight of takeOffFlights) {
        for (const returnFlight of returnFlights) {
          if (
            this.isBeforeByMinute(
              takeOffFlight.ScheduledTimeFull,
              returnFlight.ScheduledTimeFull,
            )
          ) {
            availableFlights.push([takeOffFlight, returnFlight]);
          }
        }
      }

      return availableFlights;
    } else {
      return this.getAvailableSingleFlights(
        isRoundTrip,
        fromCity,
        toCity,
        fromDate,
      );
    }
  }

  public getAvailableSingleFlights(
    isRoundTrip: boolean,
    fromCity: string,
    toCity: string,
    fromDate: Date,
  ) {
    const flights = this.flightInfos.filter((flightInfo: FlightInfo) => {
      return (
        flightInfo.FromAirportName === fromCity &&
        flightInfo.ToAirportName === toCity &&
        dayjs(flightInfo.ScheduledTimeFull, 'YYYYMMDDHHmm').isSame(
          fromDate,
          'day',
        )
      );
    });
    if (isRoundTrip) {
      return flights;
    } else {
      return flights.map((flightInfo: FlightInfo) => {
        return [flightInfo];
      });
    }
  }
}
export default FlightService;
