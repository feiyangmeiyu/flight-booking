import FlightInfoCard from '../components/FlightInfoCard';
import { Panel } from 'primereact/panel';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useEffect, useState } from 'react';
import { FlightInfo } from '../interfaces/Flight.interface';
import { Dialog } from 'primereact/dialog';

interface SearchResultProps {
  /** The list of flight information to display */
  flightInfos: FlightInfo[][];
  isSearching: boolean;
}

export default function SearchResult({
  flightInfos,
  isSearching,
}: SearchResultProps) {
  function handleBooking(flightInfo: FlightInfo[]) {
    setVisible(true);
    setBooking(flightInfo);
  }

  const panelHeader = `${flightInfos.length} flights match found`;
  // Pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const setInitialState = () => {
    setFirst(0);
    setRows(5);
  };
  useEffect(() => {
    setInitialState();
  }, [isSearching, flightInfos]);

  // Confirm booking dialog
  const [visible, setVisible] = useState(false);
  const [booking, setBooking] = useState<FlightInfo[]>([]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const renderedFlightInfoCards = flightInfos
    .slice(first, first + rows)
    .map((flightInfo: FlightInfo[], index) => {
      return (
        <>
          <FlightInfoCard
            flightInfo={flightInfo}
            key={flightInfo[0].id + index}
            onBook={handleBooking}
            showButton
          />
        </>
      );
    });

  return (
    <>
      <Panel header={panelHeader} className="mt-3">
        {flightInfos.length === 0 ? (
          <h4>No flights have been found.</h4>
        ) : (
          <>
            <Paginator
              className="mt-3"
              first={first}
              rows={rows}
              totalRecords={flightInfos.length}
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={onPageChange}
            />

            <div>{renderedFlightInfoCards}</div>
          </>
        )}
      </Panel>
      <Dialog
        header="Thank you for your booking"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <FlightInfoCard
          flightInfo={booking}
          onBook={handleBooking}
          showButton={false}
        />
      </Dialog>
    </>
  );
}
