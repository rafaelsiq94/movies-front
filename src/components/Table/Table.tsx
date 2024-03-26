import "./Table.css";

interface Column {
  name: string;
  label: string;
  filterKey?: string;
  filterType?: string;
  type?: string;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: Column[];
  page?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  filters?: { [key: string]: string | boolean | null };
  onFilterChange?: (filterKey: string, value: string | boolean | null) => void;
}

function Table(props: Readonly<Props>): JSX.Element {
  const { data, columns, page = 0, totalPages = 0, onPageChange, onFilterChange, filters } = props;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name}>
                <div>{column.label}</div>
                {column.filterType === "year" && filters && onFilterChange && (
                  <input
                    type="text"
                    onChange={(event) => onFilterChange(column.filterKey ?? "", event.target.value)}
                    value={filters[column.filterKey ?? ""]?.toString() ?? ""}
                    placeholder="Filter by year"
                  />
                )}
                {column.filterType === "boolean" && filters && onFilterChange && (
                  <select
                    onChange={(event) => onFilterChange(column.filterKey ?? "", event.target.value)}
                    value={filters[column.filterKey ?? ""]?.toString() ?? ""}
                  >
                    <option value="">Yes/No</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={String(row.id || rowIndex)}>
              {columns.map((column) => {
                let cellValue;
                if (column.type === "boolean") {
                  cellValue = row[column.name] ? "Yes" : "No";
                } else {
                  cellValue = row[column.name];
                }
                return <td key={column.name}>{cellValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {!!totalPages && (
        <div className="pagination-container">
          <button onClick={() => onPageChange && onPageChange(0)} disabled={page === 0}>
            {"|<"}
          </button>
          <button onClick={() => onPageChange && onPageChange(page - 1)} disabled={page === 0}>
            {"<"}
          </button>
          {Array.from(Array(totalPages).keys()).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange && onPageChange(pageNum)}
              className={pageNum === page ? "active" : ""}
            >
              {pageNum + 1}
            </button>
          ))}
          <button onClick={() => onPageChange && onPageChange(page + 1)} disabled={page === totalPages - 1}>
            {">"}
          </button>
          <button onClick={() => onPageChange && onPageChange(totalPages - 1)} disabled={page === totalPages - 1}>
            {">|"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
