import { Calendar } from 'primereact/calendar';

interface DateSelectorProps {
  placeholder: string;
  date: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function DateSelector({
  placeholder,
  date,
  onSelectDate,
}: DateSelectorProps) {
  return (
    <div className="p-inputgroup flex-1">
      <span className="p-inputgroup-addon">
        <i className="pi pi-calendar"></i>
      </span>
      <Calendar
        inputId="flightDate"
        value={date}
        onChange={(e) => onSelectDate(e.value as Date)}
        dateFormat="yy-mm-dd"
        placeholder={placeholder}
      />
    </div>
  );
}
