
export interface TimesheetEntry {
    id: string;
    date: string;
    minutes: number;
    description: string;
    activity: string;
    status: string;
}

export interface TimesheetSummary {
    downloadLink: string;
    timesheetEntries: TimesheetEntry[];
}

export interface Company {
    name: string;
}

export interface Timesheet {
    id: string;
    date: string;
    minutes: number;
    description: string;
    activity: string;
    status: string;
}

export interface Contract {
    company: Company;
    timesheets: Timesheet[];
}

export interface DailyTimesheets {
    contracts: Contract[];
}

export interface Company {
    name: string;
}

export interface Activity {
    name: string;
}

export interface Contract {
    id: string;
    company: Company;
    activities: Activity[];
    disabled: boolean;
}

export interface TimesheetReferenceData {
    contracts: Contract[];
}

export interface TimesheetSummaryQuery {
    startDate: string;
    endDate: string;
}

export interface ClientContract {
    contractId: string;
    contractorName: string;
}

export interface ClientContractList {
    clientContracts: ClientContract[];
}

export interface SubmittedTimesheets{
    timesheetEntries: TimesheetEntry[];
}

export interface ContractorSummary {
    contractorName: string;
    totalMinutes: number;
}

export interface ContractorBillingSummary {
    contractorSummary: ContractorSummary[];
}

export interface Activity {
    name: string;
}

export interface Entry {
    date: string;
    minutes: number;
}

export interface ActivityAggregate {
    activity: Activity;
    entries: Entry[];
}

export interface ContractorRow {
    activityAggregate: ActivityAggregate[];
    contractorName: string;
    
}

export interface ContractorTimesheetWeekView {
    startDate: string;
    endDate: string;
    rows: ContractorRow[];
}

export interface ClientRow {
    activityAggregate: ActivityAggregate[];
    companyName: string;
}

export interface ClientTimesheetWeekView {
    startDate: string;
    endDate: string;
    rows: ClientRow[];
}