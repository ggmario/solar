import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  PaginationModule,
  RowSelectionModule,
  ColumnAutoSizeModule,
  type ColDef,
  RowDoubleClickedEvent,
  CellStyleModule,
  RowClickedEvent,
  CellClickedEvent,
  CellMouseOverEvent,
} from 'ag-grid-community';
import './ag-grid.component.scss';
import { Checkbox } from '@/components';

type RowDataType = Record<string, any>;

type PaginationRequest = {
  page: number;
  size: number;
};

type BaseAgGridProps<T extends PaginationRequest> = {
  rowData: RowDataType[]; // 외부에서 데이터 전달
  columnDefs: ColDef[]; // 외부에서 컬럼 정의 전달
  actions?: { label: string; onClick: () => void; color?: string }[]; // 사용자 정의 액션 버튼
  initialPageSize?: number; // 초기 페이지 크기
  requestData?: T;
  paginationData?: { totalCount: number; totalPage: number };
  onCellClicked?: (event: CellClickedEvent) => void; // 셀 클릭
  onRowClicked?: (event: RowClickedEvent) => void; // 단일 클릭
  onRowDoubleClicked?: (event: RowDoubleClickedEvent) => void; // 더블 클릭
  handlePageChange?: (pageNumber: number) => void;
  rowSelection?: any;
  onSelectionChanged?: (event: any) => void;
};


export const AgGridComponent = <T extends PaginationRequest>({
  rowData = [],
  columnDefs,
  actions = [],
  initialPageSize = 10,
  requestData,
  paginationData,
  onCellClicked,
  onRowClicked,
  onRowDoubleClicked,
  handlePageChange,
  rowSelection,
  onSelectionChanged,
}: BaseAgGridProps<T>) => {
  const gridRef = useRef<AgGridReact>(null);

  const onGridReady = () => {
    if (gridRef.current) {
      const api = gridRef.current.api;
      api.sizeColumnsToFit(); // 화면 크기에 맞게 열 크기 조정
      //화면 크기 변경 시 다시 조정
      window.addEventListener('resize', () => api.sizeColumnsToFit());
    }
  };

  // 말줄임표 셀에 마우스 오버 시 툴팁처럼 표시
  const handleCellMouseOver = (event: CellMouseOverEvent) => {
    const cellElement = event?.event?.target as HTMLElement;

    if (cellElement.scrollWidth > cellElement.clientWidth)
      return (cellElement.title = event.value || '');
    cellElement.title = '';
  };

  // 기본 열 정의 (모든 열에 적용)
  const defaultColDef = {
    resizable: true,
    minWidth: 80,
    initialWidth: 150,
    onCellMouseOver: handleCellMouseOver,
  };

  // Edge 브라우저 감지
  if (navigator.userAgent.indexOf('Edg/100') > -1) {
    document.documentElement.style.setProperty('--flex-direction', 'column');
  } else {
    document.documentElement.style.setProperty('--flex-direction', 'row');
  }

  return (
    <>
      {/* agGrid */}
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          modules={[
            ClientSideRowModelModule,
            RowSelectionModule,
            PaginationModule,
            ColumnAutoSizeModule,
            CellStyleModule,
          ]}
          pagination={true}
          paginationPageSize={initialPageSize}
          onRowClicked={onRowClicked}
          onRowDoubleClicked={onRowDoubleClicked}
          onGridReady={onGridReady}
          onCellClicked={onCellClicked}
          onCellMouseOver={handleCellMouseOver}
          //noRowsOverlayComponent={NoRowsOverlayComponent}
          suppressPaginationPanel={true}
          suppressMovableColumns={true}
          headerHeight={43}
          rowHeight={43}
          rowSelection={rowSelection}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </>
  );
};

export default AgGridComponent;
