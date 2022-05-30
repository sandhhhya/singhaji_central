import * as React from "react";
import { useMemo } from "react";
import { GlobalFilter } from "./tableComponents/GlobalFilter";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
// import MockData from './tableComponents/feesStructureTabledata.json'
import FeesStructureHeader from "./tableComponents/FeesStructureHeader";
import "./styles/Table.css";
import { TableCheckbox } from "./tableComponents/TableCheckbox";
import { connect } from "react-redux";
import { fetchFeesTableData } from "../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";
import AllUrl from "../../redux/constants/url";
import SkeletonColor from "../../helpers/Skeletrone";
import { ToastContainer } from "react-toastify";
import updown_sort from '../assests/image/updown_sort.svg'
import Pagination from "../assests/common/Pagination";
import Loader from "../assests/common/Loader";
import OfflinePage from "../auth/OfflinePage";
import NoDataFound from "../assests/common/NoDataFound";

// import LoaderButton from "../../assests/common/LoaderButton";

function FeesStructure({ table_data, fetchFeesTable }) {
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    var config = {
      method: "GET",
      url: AllUrl.allSchemaList,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchFeesTable(config);
    // setTableData(table_data.table_data);
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => FeesStructureHeader, []);

  // const tableData =
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    pageOptions,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    rows,
    setPageSize,
    selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: table_data.table_data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            header: ({ getToggleAllRowsSelectedProps }) => (
              < TableCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // console.log("rows number :::", page.length);
  const { globalFilter } = state;
  const { pageIndex, pageSize, selectedRowIds } = state;

  const checkboxData = JSON.stringify(
    {
      selectedRowIds: selectedRowIds,
      "selectedFlatRows[].original": selectedFlatRows.map((d) => d.original),
    },
    null,
    2
  );
  console.log(checkboxData);
  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  ) : table_data.error ? (
    <OfflinePage />
  ) : (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {table_data.second_loading && (
        <Loader />
      )}
      <div style={{ backgroundColor: "#F4F7FC", height: "auto", width: "auto" }}>
        <div style={{ position: 'sticky', top: '80px', width: '100%', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#f4f7fc', zIndex: '5' }}>


          <div className="d-flex" >
            <div className="">
              <select 
                className="form-select table_select_row_options"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option value={pageSize} key={pageSize}>Show Entries {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex ml-auto me-1">
              <div className="me-4">
                <button type="button" className="btn  fw-bold fees-structure-active-button ">
                  Active
                </button>
              </div>
              <div className="me-4">
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                ></GlobalFilter>
              </div>
            </div>
          </div>
        </div>
        <table {...getTableProps()} id="customers" className="table table-sm">
          <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i style={{ transform: 'scale(0.6)' }} className="fas fa-chevron-down"></i>
                        ) : (
                          <i style={{ transform: 'scale(0.6)' }} className="fas fa-chevron-up"></i>
                          // <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />
                        )
                      ) : (

                        column.id !== 'Srno' && column.id !== 'selection' && <img src={updown_sort} style={{ marginLeft: "5px" }} alt="" />


                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <NoDataFound rows={rows} />
        <Pagination data={table_data.table_data} rows={rows}
          page={page}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    table_data: state.feesStructTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeesTable: (data) => dispatch(fetchFeesTableData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeesStructure);
