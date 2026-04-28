export type Calendar = {
  id: string;
  name: string;
  color: string;
  origin: string;
};

export type CalendarEvent = {
  id: string;
  calendarId: string;
  calendarName: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  notes?: string;
  allDay: boolean;
};

export type FormatOptions = {
  format?: string;
};

export type ListOptions = FormatOptions & {
  days?: number | string;
  from?: string;
  to?: string;
  calendar?: string;
};
