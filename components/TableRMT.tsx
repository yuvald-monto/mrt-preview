import  {
  MaterialReactTable,
    MRT_ColumnDef,
    MRT_RowVirtualizer,
  } from "material-react-table";
  import * as React from "react";
  import { useEffect, useRef } from "react";
  import { useRouter } from "next/router";
  import { useSortingStore } from "../stores/TablesStore";
  
  export const TableRMT = ({
    data,
    columns,
    tableSortKey,
    isLoading,
    onRowClick,
    showCheckboxSelection = false,
    tableName,
  }: {
    data: any;
    columns: MRT_ColumnDef<any>[];
    tableSortKey: string;
    isLoading: boolean;
    onRowClick?: (row: any) => void;
    showCheckboxSelection?: boolean;
    tableName: string;
  }) => {
    const router = useRouter();
    const { useStore, setStore } = useSortingStore(tableSortKey);
    const rowVirtualizedInstanceRef =
      useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
    const {
      columnFilters,
      sorting,
      grouping,
      columnPinning,
      columnVisibility,
      scrollPosition,
      expanded,
      rowSelection,
      isFullScreen,
      searchValue,
      globalFilterChange,
      density,
    } = useStore();
  
    const onRowSelectionChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(rowSelection)
          : updaterOrValue;
  
      setStore({ rowSelection: value });
    };
  
    const onColumnFiltersChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      setStore({ columnFilters: value });
    };
  
    const onSortingChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(sorting)
          : updaterOrValue;
  
      setStore({ sorting: value });
    };
    const onGroupingChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(grouping)
          : updaterOrValue;
      setStore({ grouping: value });
    };
    const onExpandedChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(expanded)
          : updaterOrValue;
      setStore({ expanded: value });
    };
    const onColumnPinningChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnPinning)
          : updaterOrValue;
  
      setStore({ columnPinning: value });
    };
  
    const onColumnVisibilityChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnVisibility)
          : updaterOrValue;
  
      setStore({ columnVisibility: value });
    };
  
    const onIsFullScreenChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      setStore({ isFullScreen: value });
    };
  
    const onGlobalFilterChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      setStore({ searchValue: value });
    };
  
    const onShowGlobalFilterChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      setStore({ globalFilterChange: value });
    };
  
    const onDensityChange = (updaterOrValue: any) => {
      const value =
        updaterOrValue instanceof Function
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      setStore({ density: value });
    };
  
    const saveScrollPosition = (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollTop } = containerRefElement;
        setStore({ scrollPosition: scrollTop });
      }
    };
  
    useEffect(() => {
      rowVirtualizedInstanceRef.current?.scrollBy?.(scrollPosition);
    }, [router.isReady, rowVirtualizedInstanceRef.current, router.pathname]);
  
    return (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableStickyHeader
          enableColumnActions
          enableColumnFilters
          enableSorting
          manualPagination
          enablePagination
          enableBottomToolbar
          enableTopToolbar
          enableGrouping
          enablePinning
          enableColumnFilterModes
          enableColumnOrdering
          enableRowSelection={showCheckboxSelection}
          onRowSelectionChange={onRowSelectionChange}
          onColumnFiltersChange={onColumnFiltersChange}
          onSortingChange={onSortingChange}
          onGroupingChange={onGroupingChange}
          onColumnPinningChange={onColumnPinningChange}
          onColumnVisibilityChange={onColumnVisibilityChange}
          onExpandedChange={onExpandedChange}
          onGlobalFilterChange={onGlobalFilterChange}
          onShowGlobalFilterChange={onShowGlobalFilterChange}
          onDensityChange={onDensityChange}
          onIsFullScreenChange={onIsFullScreenChange}
          enableRowVirtualization
          rowVirtualizerInstanceRef={rowVirtualizedInstanceRef}
          // @ts-ignore
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => onRowClick && onRowClick(row),
            sx: { cursor: "pointer", fontSize: "0.875rem" },
          })}
          muiTableContainerProps={{
            sx: {
              maxHeight: "70vh",
              maxWidth: "85vw",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#f1f1f1",
              },
            },
            onScroll: (event: React.UIEvent<HTMLDivElement>) =>
              saveScrollPosition(event.target as HTMLDivElement),
          }}
          muiTableHeadCellProps={{
            sx: {
              fontFamily: "Roboto,  sans-serif",
              fontSize: "17px",
              fontWeight: 400,
              color: "#626264",
            },
          }}
          muiPaginationProps={{
            rowsPerPageOptions: [],
            // @ts-ignore
            rowsPerPage: -1,
            sx: {
              ".MuiTablePagination-actions": {
                display: "none",
              },
              ".MuiTablePagination-displayedRows": {
                marginRight: "2vw",
              },
            },
          }}
          muiTableBodyCellProps={{
            sx: { overflow: "visible" },
          }}
          state={{
            columnFilters,
            sorting,
            grouping,
            columnPinning,
            columnVisibility,
            expanded,
            isLoading,
            rowSelection,
            isFullScreen,
            globalFilter: searchValue,
            showGlobalFilter: globalFilterChange,
            density,
          }}
        />
    );
  };
  