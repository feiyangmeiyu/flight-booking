import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

import { Divider } from 'primereact/divider';
import { FlightInfo } from '../interfaces/Flight.interface';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

interface FlightIndoCardProps {
  flightInfo: FlightInfo[];
  onBook: (flightInfo: FlightInfo[]) => void;
  showButton: boolean;
}

export default function FlightInfoCard({
  flightInfo,
  onBook,
  showButton,
}: FlightIndoCardProps) {
  const renderedCards = flightInfo.map((info: FlightInfo) => {
    return (
      <>
        <Card
          title={info.FlightId}
          subTitle={info.AirlineName + ' Airline'}
          className="m-2"
          key={info.FlightId + info.ScheduledTimeFull}
        >
          <p>
            <i className="pi pi-car mr-2" style={{ fontSize: '1rem' }}></i>{' '}
            {info.FromAirport} ({info.FromAirportName}) - {info.ToAirport} (
            {info.ToAirportName})
          </p>
          <p className="m-0">
            <i
              className="pi pi-calendar-times mr-2"
              style={{ fontSize: '1rem' }}
            ></i>
            {dayjs(info.ScheduledTimeFull, 'YYYYMMDDHHmm').format('lll')}
          </p>
        </Card>
      </>
    );
  });

  const footer = (
    <div className="flex justify-content-center">
      <Button
        label="Book"
        onClick={() => {
          onBook(flightInfo);
        }}
        icon="pi pi-check"
      />
    </div>
  );

  return (
    <div>
      <div className="mb-4 card flex justify-content-center">
        {renderedCards}
      </div>
      {showButton ? footer : null}
      <Divider />
    </div>
  );
}
