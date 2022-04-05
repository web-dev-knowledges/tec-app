export enum TableRowType {
  Text = 'text',
  Tick = 'tick',
  Pricing = 'pricing',
}

export interface TableRowConfig {
  label: string;
  key: string;
  type: TableRowType;
}
