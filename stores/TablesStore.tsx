import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  MRT_ColumnFiltersState,
  MRT_ColumnPinningState,
  MRT_DensityState,
  MRT_ExpandedState,
  MRT_GroupingState,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_VisibilityState,
} from "material-react-table";

export interface TableSortingConfig {
  columnFilters: MRT_ColumnFiltersState;
  sorting: MRT_SortingState;
  grouping: MRT_GroupingState;
  columnPinning: MRT_ColumnPinningState;
  columnVisibility: MRT_VisibilityState;
  scrollPosition: number;
  expanded: MRT_ExpandedState;
  rowSelection?: MRT_RowSelectionState;
  selectedSupplier?: string;
  isFullScreen?: boolean;
  searchValue?: string;
  globalFilterChange?: boolean;
  density?: MRT_DensityState;
}

const isInvoiceTableKey = (key: string) => key.includes("InvoiceTable");

const createSortingStore = (name: string) =>
  create<TableSortingConfig, [["zustand/persist", TableSortingConfig]]>(
    persist(
      (set, get) => ({
        columnFilters: [],
        sorting: isInvoiceTableKey(name)
          ? [
              {
                id: "date",
                desc: true,
              },
            ]
          : [],
        grouping: [],
        expanded: {},
        columnPinning: {
          left: [],
          right: [],
        },
        columnVisibility: {},
        scrollPosition: 0,
        rowSelection: {},
        isFullScreen: false,
        searchValue: "",
        globalFilterChange: false,
        density: "comfortable",
      }),
      {
        // this will be the key in localStorage
        name,
      }
    )
  );

export const useSortingStore = (key: string) => {
  const store = createSortingStore(key);
  return {
    useStore: store,
    setStore: store.setState,
  };
};
