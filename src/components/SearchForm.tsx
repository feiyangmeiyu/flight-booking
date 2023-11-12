import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Tooltip } from 'primereact/tooltip';
import { Fieldset } from 'primereact/fieldset';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';
import DateSelector from '../components/DateSelector';
import * as dayjs from 'dayjs';
import { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (
    isRoundTrip: boolean,
    fromCity: string,
    toCity: string,
    fromDate: Date,
    toDate: Date,
  ) => void;
  onClear: () => void;
}

export default function SearchForm({ onSearch, onClear }: SearchFormProps) {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const [fromDate, setFromDate] = useState<Date | null>(
    dayjs('2023-09-01', 'YYYY-MM-DD').toDate(),
  );
  const [toDate, setToDate] = useState<Date | null>(
    dayjs('2023-09-04', 'YYYY-MM-DD').toDate(),
  );
  const cities = ['Oslo', 'Copenhagen', 'Stockholm'];
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

  useEffect(() => {
    if (
      [fromCity, toCity, fromDate].some((val) => val === '' || val === null)
    ) {
      setIsValid(false);
      setErrorMessage('Please fullfill all the fields');
    } else if (isRoundTrip && !toDate) {
      setIsValid(false);
      setErrorMessage('Please fullfill return date');
    } else if (fromDate && toDate && fromDate > toDate) {
      setIsValid(false);
      setErrorMessage('Return date must be later than take-off date');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [isRoundTrip, fromCity, toCity, fromDate, toDate]);

  useEffect(() => {
    setToDate(null);
  }, [isRoundTrip]);

  const handleSearchFlight = () => {
    onSearch(isRoundTrip, fromCity, toCity, fromDate, toDate);
  };
  const handleSearchCity = (event: AutoCompleteCompleteEvent) => {
    setSearchedCities(
      cities.filter((city: string) => {
        return city.includes(event.query);
      }),
    );
  };

  const handleClearSearch = () => {
    setIsRoundTrip(false);
    setFromCity('');
    setToCity('');
    setFromDate(dayjs('2023-09-01', 'YYYY-MM-DD').toDate());
    setToDate(null);
    onClear();
  };

  const flightIcon = () => {
    if (isRoundTrip) {
      return (
        <i
          className="pi pi-arrow-right-arrow-left"
          style={{ color: 'slateblue' }}
        ></i>
      );
    } else {
      return (
        <i
          className="pi pi-arrow-right align-items-center"
          style={{ color: 'slateblue' }}
        ></i>
      );
    }
  };

  return (
    <div>
      <Fieldset legend="Plan your next trip">
        <div className="flex align-content-center flex-wrap mb-4">
          <InputSwitch
            className="flex mr-2"
            inputId="roundTrip"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.value)}
          />
          <label className="flex align-items-center" htmlFor="roundTrip">
            Round Trip
          </label>
        </div>
        <div className="flex flex-column md:flex-row gap-3 align-content-center">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <AutoComplete
              forceSelection
              placeholder="From city"
              value={fromCity}
              suggestions={cities}
              completeMethod={handleSearchCity}
              onChange={(e) => setFromCity(e.value)}
              inputId="fromCity"
              emptyMessage="No cities found."
              required
              dropdown
            />
          </div>

          <div className="flex align-self-center">{flightIcon()}</div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <AutoComplete
              forceSelection
              placeholder="To city"
              value={toCity}
              suggestions={cities}
              completeMethod={handleSearchCity}
              onChange={(e) => setToCity(e.value)}
              inputId="toCity"
              emptyMessage="No cities found."
              required
              dropdown
            />
          </div>

          <DateSelector
            date={fromDate}
            placeholder="Select take off date"
            onSelectDate={setFromDate}
          ></DateSelector>
          {isRoundTrip ? (
            <DateSelector
              date={toDate}
              placeholder="Select return date"
              onSelectDate={setToDate}
            ></DateSelector>
          ) : null}
          <Button
            icon="pi pi-search"
            label="Search"
            disabled={!isValid}
            onClick={handleSearchFlight}
            tooltip={errorMessage ? errorMessage : undefined}
            tooltipOptions={{ showOnDisabled: true }}
          />
          <Button
            label="Clear Search"
            icon="pi-times"
            outlined
            onClick={handleClearSearch}
          />
        </div>
      </Fieldset>
    </div>
  );
}
