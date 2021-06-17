import { SelectionFilter } from './filterModels';

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type HandleCompanySearchFunction = (event: OnChangeEvent) => void;

export type HandleCompanySelectFunction = (event: OnChangeEvent, value: SelectionFilter, label: string) => void;

