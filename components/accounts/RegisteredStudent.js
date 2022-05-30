import * as React from "react";
// import { useMemo } from "react";

// import Edit_icon from '../../assests/image/Edit_icon.svg'
import Swal from 'sweetalert2'
import { GlobalFilter } from "../../components/tableComponents/GlobalFilter";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { connect } from "react-redux";
import Loader from '../../assests/common/Loader';


import "../../components/styles/Table.css";
import { fetchStudentTable } from "../../../redux/actionDispatcher/superAdmin/studentTableDatadispatcher";
import SkeletonColor from "../../../helpers/Skeletrone";
import Archived_icon from "../../assests/image/Archived_icon.svg"
import { TableCheckbox } from "../tableComponents/TableCheckbox";
import { VerifyStudent } from "../../../redux/actionDispatcher/superAdmin/studentVerifyTableDataDispatcher";
// import AddNewStudent from "./AddNewStudent";
import AllUrl from "../../../redux/constants/url"
import updown_sort from '../../assests/image/updown_sort.svg'
import { DeactivateButton, PendingButton, RecievedButton } from "../../assests/common/Color";
import Pagination from "../../assests/common/Pagination";
// import { useNavigate } from "react-router-dom";
// import { Tooltip, Whisper } from "rsuite";
import NoDataFound from "../../assests/common/NoDataFound";
import { CSVLink } from "react-csv";
import downloadPdfStudentList from './PdfGeneratorStudentList'

// import { baseUrl } from "../../redux/constants/url";


function StudentTable({ table_data, fetchStudentTable, VerifyStudent }) {
  const token = localStorage.getItem("token");
  // const navigate = useNavigate()

  const [columns] = React.useState([
    {
      header: "S.No",
      accessor: "Srno",
      Cell: ({ row: { original, index } }) => {
        return (index + 1)
      }
    },
    {
      header: "Name",
      accessor: "firstName",
    },
    {
      header: "Father's Name",
      accessor: "fathersName",
    },
    {
      header: "Branch",
      accessor: "branch",
    },
    {
      header: "Year",
      accessor: "year",

    },
    {
      header: "Village",
      accessor: "village",
    },
    {
      header: "Mobile",
      accessor: "mobile",
    },
    {
      header: "Receiver",
      accessor: "receiver",
    },
    {
      header: "Pay status",
      accessor: "accRegFeesStatus",
      Cell: ({ row: { original } }) => (
        <button
          className="table_btn_size"
          style={
            original.accRegFeesStatus === "Paid"
              ? RecievedButton : PendingButton}
          disabled={original.accRegFeesStatus === "Paid"}
          onClick={() => {
            Swal.fire({
              title: 'Payment Confirmation',

              html:
                '<hr>' +
                'have you received the payment ',
              // icon: 'warning',
              showCancelButton: true,
              // showCancelButton: true,
              cancelButtonText: 'Cancel',
              confirmButtonText: "<h8 style='color:rgb(5, 106, 12);font-size: 18px'>Yes</h8>",
              showCloseButton: true,
              cancelButtonColor: 'gray',
              confirmButtonColor: "rgb(164, 230, 177)",
              confirmButtonTextColor: "black",
              reverseButtons: true,
              showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
                icon: ''                       // disable icon animation
              },
              hideClass: {
                popup: '',                     // disable popup fade-out animation
              }


            }).then(async (result) => {
              if (result.isConfirmed) {
                var body = JSON.stringify({
                  email: original.email
                });

                var config = {
                  method: 'post',
                  url: `${AllUrl.verifyStudentAccountPaidUnpaid}`,
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                  },
                  data: body
                };

                const result = await axios(config)
                // console.log("_____________________________________", result);
                if (result.status === 200) {
                  toast.success('Registration Fees Paid SuccessFull', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                  var con = {
                    method: "GET",
                    url: AllUrl.allRegistratedStudentAccountList,
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  };
                  fetchStudentTable(con, true);
                }
                else if (result.status === 404) {
                  toast.warning('User Not Found', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                }
              }
            })
          }}>
          {original.accRegFeesStatus === "Paid" ? "Received" : "Pending"}

        </button>)
    },
    {
      header: "Action",
      accessor: "status",
      Cell: ({ row: { original } }) => (
        <button
          className="table_btn_size"
          style={DeactivateButton}
          onClick={() => {
            // setData(original.status)
            if (original.accRegFeesStatus === "Paid") {
              console.log(original.email)
              Swal.fire({
                title: 'Shift to account',

                html:
                  '<hr>' +
                  'do you want to shift' +
                  '<br>' +
                  ` ${original.firstName} ${original.lastName} ?`,
                // icon: 'warning',
                showCancelButton: true,
                // showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                showCloseButton: true,
                cancelButtonColor: 'gray',
                confirmButtonColor: "#4f83df",
                reverseButtons: true,
                showClass: {
                  backdrop: 'swal2-noanimation', // disable backdrop animation
                  popup: '',                     // disable popup animation
                  icon: ''                       // disable icon animation
                },
                hideClass: {
                  popup: '',                     // disable popup fade-out animation
                }

              }).then(async (result) => {
                if (result.isConfirmed) {
                  const resultofverify = await VerifyStudent(original);
                  // console.log(resultofverify);
                  if (resultofverify === 200) {
                    var config = {
                      method: "GET",
                      url: AllUrl.allRegistratedStudentAccountList,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    };
                    fetchStudentTable(config, true);
                  }
                }
              })
              // alert("Do you want to change this   : " + original.email)
              // VerifyStudent(original.email);
            }
            else {
              toast.warning('Firstly Pay Registration Fees', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
              });
            }
          }}>
          Shift
        </button>
      )
    },
    // {
    //   header: 'Edit',
    //   accessor: 'icon',
    //   Cell: ({ row: { original } }) => (
    //     // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
    //     <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
    //       <Tooltip>
    //         Edit Student Info
    //       </Tooltip>
    //     }>
    //       <img src={Edit_icon} style={{ cursor: "pointer" }} alt="Edit" onClick={() => {
    //         navigate("/admin_dashboard/addnewstudent");
    //         localStorage.setItem('RegistrationEdit', JSON.stringify(original))
    //       }} />

    //     </Whisper>

    //   )
    // }
  ]);

  React.useEffect(() => {
    var config = {
      method: "GET",
      url: AllUrl.allRegistratedStudentAccountList,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchStudentTable(config, false);
    // setTableData(table_data.table_data);
    // eslint-disable-next-line
  }, []);




  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    page,
    nextPage,
    rows,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
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
            id: 'selection',
            header: ({ getToggleAllRowsSelectedProps }) => (
              <TableCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ]
      })
    }
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  // var exportData = [];
  var exportCsv = [];

  const checkboxData = JSON.stringify(
    {
      selectedFlatRows: selectedFlatRows.forEach((row) => {
        let data = Object.assign({}, row.original);
        console.log(data);
        delete data.photo;
        if (data?.receivedAmount)
          data.receivedAmount = (data?.receivedAmount)?.toString();
        console.log(data);
        // exportData.push(data)
        // console.log(selectedData);
        exportCsv.push(data)
      })
    },
    null,
    2
  );
  console.log(checkboxData);
  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  )
    // : table_data.error ? (
    //   <h2>{table_data.error}</h2>
    // ) 
    : (

      <>
        {table_data.secondLoading && (
          <Loader />
        )}
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
        <div style={{ backgroundColor: "#F4F7FC", height: "auto", width: "auto" }}>
          <div style={{ position: 'sticky', top: '80px', width: '100%', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#f4f7fc', zIndex: '5' }}>
            <div className="d-flex">

              <div className=''>
                <select className="form-select table_select_row_options" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                  {
                    [10, 25, 50, 100].map(pageSize => (
                      <option value={pageSize} key={pageSize}>Show Entries {pageSize}</option>
                    ))
                  }
                </select>

              </div>

              {/* ===========  Archived button ============= */}
              <div className=' ml-4 '>
                <button type="button" className="btn  fw-bold fees-structure-active-button ">Archive <img src={Archived_icon} alt="downloadIcon" /></button>
              </div>

              {/* =================== Download to pdf or excel ================ */}
              <div className="btn-group  ml-3" style={{ position: 'sticky', zIndex: '10' }}>
                <button className="btn  btn-sm download-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Download
                </button>
                <div class="dropdown-menu mt-1">
                  <div >
                    <div ><CSVLink className="dropdown-item" style={{ fontWeight: 'bold' }} data={exportCsv}>Excel</CSVLink></div>                                    </div>

                  {/* <div className="dropdown-item" onClick={() => { downloadPdf(exportCsv) }}><b>Pdf</b></div> */}

                  <div className="dropdown-item " style={{ cursor: "pointer" }} onClick={() => { downloadPdfStudentList(exportCsv) }}><b>Pdf</b></div>


                </div>
              </div>


              <div className='d-flex ml-auto me-1'>


                {/* <div className='me-4'>
              <button type="button" class="btn btn-outline-primary fw-bold ">Active</button>
            </div> */}
                <div className='me-4'>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                </div></div>
            </div>
          </div>
          <table {...getTableProps()} id="customers" className="table table-sm">
            {/* <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}> */}
            <thead style={{ position: 'sticky', top: '135px', width: '100%', backgroundColor: '#f4f7fc' }}>
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
    table_data: state.studentTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentTable: (data, isLoading) => dispatch(fetchStudentTable(data, isLoading)),
    VerifyStudent: (data) => dispatch(VerifyStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);
