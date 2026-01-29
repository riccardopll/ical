export interface Calendar {
  id: string;
  name: string;
  color: string;
}

export interface CalendarEvent {
  id: string;
  calendarId: string;
  calendarName: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  notes?: string;
  allDay: boolean;
}

export interface ListOptions {
  days?: number;
  from?: string;
  to?: string;
  calendar?: string;
}

export interface AddOptions {
  title: string;
  start: string;
  end?: string;
  calendar?: string;
  location?: string;
  notes?: string;
  allDay?: boolean;
}

export interface EditOptions {
  title?: string;
  start?: string;
  end?: string;
  location?: string;
  notes?: string;
}
