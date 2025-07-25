export interface ITab {
  id: number;
  name: string;
}

export interface ITabsProps {
  tabs: ITab[];
  activeTab: ITab;
  setActiveTab: (value: ITab) => void;
}
