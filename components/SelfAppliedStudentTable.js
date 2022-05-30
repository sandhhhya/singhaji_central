import * as React from "react";
import { useState } from "react";

import Edit_icon from '../assests/image/Edit_icon.svg'
import Swal from 'sweetalert2'
import { GlobalFilter } from "./tableComponents/GlobalFilter";
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
import Loader from '../assests/common/Loader';
import { Fragment, useMemo } from "react";


import "./styles/Table.css";
import { fetchStudentTable } from "../../redux/actionDispatcher/superAdmin/studentTableDatadispatcher";
import SkeletonColor from "../../helpers/Skeletrone";
import Archived_icon from "../assests/image/Archived_icon.svg"
import { TableCheckbox } from "./tableComponents/TableCheckbox";
// import AddNewStudent from "./AddNewStudent";
import AllUrl from "../../redux/constants/url"
import updown_sort from '../assests/image/updown_sort.svg'
import { DeactivateButton } from "../assests/common/Color";
import Pagination from "../assests/common/Pagination";
import { useNavigate } from "react-router-dom";
import { Tooltip, Whisper } from "rsuite";
import NoDataFound from "../assests/common/NoDataFound";
import delete_icon from "../../components/assests/image/delete_Icon.svg"
import filtericon from "../../components/assests/image/AccountIcons/filter.svg";
import rightArrow from '../../components/assests/image/right_arrow_icon.svg'


import {
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CPopover,
} from "@coreui/react";


// import { baseUrl } from "../../redux/constants/url";

export const MultipleFilter = (rows, accessor, filterValue) => {
  const arr = [];
  rows.forEach((val) => {
    if (filterValue.includes(val.original[accessor])) arr.push(val);
  });
  return arr;
};


function SelfAppliedStudentTable({ table_data, fetchStudentTable }) {

  const [loading, setloading] = useState(false)
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const [columns] = React.useState([
    {
      header: "S.No",
      accessor: "Srno",
      Cell: ({ row: { original, index } }) => {
        return (index + 1)
      },
      Filter: "",
      filter: "",
    },
    {
      header: "Name",
      accessor: "firstName",
      Filter: "",
      filter: "",
    },
    {
      header: "Father's Name",
      accessor: "fathersName",
      Filter: "",
      filter: "",
    },
    {
      header: "Stream",
      accessor: "branch",
      Filter: SelectColumnFilter,
      filter: MultipleFilter,
    },
    {
      header: "Year",
      accessor: "year",
      Filter: SelectColumnFilter,
      filter: MultipleFilter,

    },
    {
      header: "Village",
      accessor: "village",
      Filter: SelectColumnFilter,
      filter: MultipleFilter,
    },
    {
      header: "Mobile",
      accessor: "mobile",
      Filter: "",
      filter: "",
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ row: { original, index } }) => {
        let word = original.createdAt;
        let words = word.split('T');
        return (words[0])
      }
    },
    {
      header: "STA",
      accessor: "STA",
      Filter: "",
      filter: "",
      Cell: ({ row: { original } }) => (
        <button
          className="table_btn_size"
          style={DeactivateButton}
          // disabled={true}
          onClick={() => {
            // setData(original.status)
            console.log(original.email)
            Swal.fire({
              title: 'Shift To Applied',
              html:
                '<hr>' +
                'Are you sure?' +
                '<br>' +
                `Do You want to shift ${original.firstName} ${original.lastName}  to  applied student`,
              // icon: 'warning',
              showCancelButton: true,
              // showCancelButton: true,
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Shift',
              showCloseButton: true,
              cancelButtonColor: 'gray',
              confirmButtonColor: "rgb(157 203 251)",
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
                let data = JSON.stringify({
                  stdId: original.id
                })
                setloading(true)
                // console.log('====================================');
                // console.log(data);
                // console.log('====================================');
                var config = {
                  method: "POST",
                  url: AllUrl.shiftToAppliedStudent,
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  data: data
                };
                var resultofverify;
                try {
                  resultofverify = await axios(config);
                  setloading(false)

                  console.log("resultofverify", resultofverify);
                  console.log("resultofverify", resultofverify.status);
                  if (resultofverify.status === 200) {
                    Swal.fire({
                      title: 'Shift To Applied Success',
                    })
                    var fetchStudentTableConfig = {
                      method: "GET",
                      url: AllUrl.selfRegisterStudents,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    };
                    fetchStudentTable(fetchStudentTableConfig, true);
                  } else if (resultofverify.status === 406) {
                    console.log("404 empty feild");
                    toast.error('Some field are empty please edit it', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                    });
                  } else if (resultofverify.status === 500) {
                    toast.error('Internal Server Error', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                    });
                  }
                } catch (error) {
                  setloading(false)

                  toast.warning('Please fill all detail', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                }
              }
            })
          }

          }>
          STA
        </button>
      )
    },
    {
      header: 'Edit',
      accessor: 'icon',
      Filter: "",
      filter: "",
      Cell: ({ row: { original } }) => (
        // <i onClick={() => {alert("hii")}} class="far fa-edit"></i>
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
          <Tooltip>
            Edit Student Info
          </Tooltip>
        }>
          <img src={Edit_icon} style={{ cursor: "pointer" }} alt="Edit" onClick={() => {
            navigate("/admin_dashboard/updateselfappliedstudentdetail");
            localStorage.setItem('SelfRegistrationEdit', JSON.stringify(original))
            // localStorage.setItem('editData', JSON.stringify(original))
          }} />
        </Whisper>

      )
    }
  ]);
  // async function getData(data,loginUrl) {
  //   var url = `${baseUrl}${loginUrl}`;
  //   console.log(url);
  //   try {
  //     var res = await axios.post(url,data);
  //     console.log("The response of dat is :: ",res);
  //     if(res.status === 200) {
  //       //here i change the return data so the response object coming from an api is directly return
  //       return res;
  //     }
  //     // Don't forget to return something
  //     return res;
  //   } catch(err) {
  //     return err;
  //   }
  // }
  // const columns = useMemo(() => StudentTableHeader, []);
  React.useEffect(() => {
    var config = {
      method: "GET",
      url: AllUrl.selfRegisterStudents,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetchStudentTable(config, false);
    // setTableData(table_data.table_data);
    // eslint-disable-next-line
  }, []);

  function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }

  function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id },
  }) {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    let offsetObj = [0, 0];

    if (id === 'branch') offsetObj = [76, 18]
    else if (id === 'trackName') offsetObj = [93, 18]
    else if (id === 'year') offsetObj = [33, 18]
    else if (id === 'joinBatch') offsetObj = [50, 18]
    else if (id === 'is_active') offsetObj = [33, 18]
    else if (id === 'gender') offsetObj = [33, 18]

    let name = id;

    // switch(id) {
    //   case 'is_active':
    //     name = 'Student Status';
    //     break;
    //   case 'year':
    //     name = 'Select Year';
    //     break;

    //   case 'branch':
    //     name = 'Select Class';
    //     break;

    //   case 'joinBatch':
    //     name = 'Select Session';
    //     break;
    //   case 'trackName':
    //     name = 'Select Track';
    //     break;
    //   case 'gender':
    //     name = 'Select Gender';
    //     break;


    //   default:
    //     break;
    // }

    return (
      <Fragment>
        <div className="d-flex justify-content-end">
          {/* <span className="block capitalize mb-4">{id}</span> */}
          <CPopover
            // trigger={['focus','click','hover']}
            offset={offsetObj}

            content={
              <div className="">
                {options.map((option, i) => {
                  let option_label = option;

                  if (id === 'is_active') {
                    if (option === 'true')
                      option_label = 'Active'
                    else
                      option_label = 'Deactive'
                  } else if (id === 'year') {
                    if (option === 'I')
                      option_label = 'I Year'
                    else if (option === 'II')
                      option_label = 'II Year'
                    else if (option === 'III')
                      option_label = 'III Year'
                  } else if (id === 'gender') {
                    if (option === 'female')
                      option_label = 'Female'
                    else if (option === 'male')
                      option_label = 'Male'

                  }

                  return (
                    <Fragment key={i}>
                      <div id={`${id}`} style={{ height: '30px', cursor: 'pointer' }} className="filter_btn_hover p-1 pt-2 my-1 d-flex align-items-center ">
                        <label
                          onClick={(e) => { e.stopPropagation() }}
                          className="font-medium text-gray-700 d-flex align-items-center cursor-pointer"
                          // onCLick={}
                          style={{ cursor: 'pointer' }}
                        >
                          <input
                            checked={filterValue.includes(option)}
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded mr-1"
                            id={option}
                            name={option}
                            value={option}
                            style={{ cursor: 'pointer' }}
                            onChange={(e) => {
                              setFilter(
                                setFilteredParams(filterValue, e.target.value)
                              );
                            }}
                            onClick={(e) => { e.stopPropagation() }}
                          >

                          </input>

                          {option_label}

                        </label>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            }
            placement="right"

          >
            <div className="btn-group filter_btn_hover">
              <button
                onClick={(e) => {
                  // document.getElementsByClassName('filter_btn').forEach(ele => ele.click())


                }}
                className="btn filter_btn"
              >
                {name}
              </button>
              <img src={rightArrow} alt=">" width="6px" style={{
                marginTop: "4px",
                marginRight: '10px'
              }} />
            </div>
          </CPopover>
        </div >
      </Fragment >
    );
  }




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
  var idData = [];
  // var exportCsv = [];

  const checkboxData = JSON.stringify(
    {
      selectedFlatRows: selectedFlatRows.forEach((row) => {
        let data = Object.assign({}, row.original);
        console.log("data", data);
        delete data.photo;

        idData.push(data.id)
        // console.log(selectedData);
        // exportCsv.push(data)
      })
    },
    null,
    2
  );
  console.log("checkboxData", checkboxData)
  console.log("idData", idData)

  function deleteSelfAppliedStudent() {
    Swal.fire({
      title: 'Delete',

      html:
        '<hr>' +
        'Are you sure?' +
        '<br>' +
        `Do You want to delete record`,
      // icon: 'warning',
      showCancelButton: true,
      // showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      showCloseButton: true,
      cancelButtonColor: 'gray',
      confirmButtonColor: "rgb(231 122 122)",
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
      // console.log("original values are ::",original)

      if (result.isConfirmed) {
        let data = JSON.stringify({
          id: idData
        })
        var config = {
          method: "POST",
          url: AllUrl.deleteSelfAppliedStudents,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data
        };
        const resultofverify = await axios(config);
        console.log(resultofverify);
        if (resultofverify.status === 200) {
          var fetchStudentTableConfig = {
            method: "GET",
            url: AllUrl.selfRegisterStudents,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          fetchStudentTable(fetchStudentTableConfig, true);
        }
        else if (resultofverify.status === 406) {
          toast.error('Some field are empty please edit it', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
        else if (resultofverify.status === 500) {
          toast.error('Internal Server Error', {
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


  }

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return table_data.loading ? (
    <SkeletonColor></SkeletonColor>
  )
    // : table_data.error ? (
    //   <h2>{table_data.error}</h2>
    // ) 
    : (
      <>
        {(table_data.secondLoading || loading) && (
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
              <div className='ms-4'>
                <button type="button" className="btn  fw-bold fees-structure-active-button ">Archive <img src={Archived_icon} alt="downloadIcon" /></button>
              </div>
              <div className='ms-4'>
                <button type="button" className="btn btn-primary  fw-bold ">Download </button>
              </div>
              <div className='ms-4'>
                <button onClick={deleteSelfAppliedStudent} type="button" className="btn " style={{ backgroundColor: "#f7c3c3" }}>
                  <img src={delete_icon} alt="delete_icon" /></button>
              </div>

              <div className='d-flex ml-auto me-1'>


                <div >
                  <CDropdown variant="nav-item" style={{ color: 'white' }}>
                    <CDropdownToggle
                      placement="bottom-end"
                      className="py-0"
                      caret={false}
                    >
                      <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                          Filter Data .
                        </Tooltip>
                      }>

                        <img
                          src={filtericon}
                          alt=""
                          style={{
                            height: "22px",
                            width: "35px",
                            marginTop: "-35px",
                            marginLeft: "-13px",
                          }}
                        /></Whisper>
                    </CDropdownToggle>

                    <CDropdownMenu
                      component={"div"}
                      className="pt-0 filter-dropdown-menu-student_account_table"
                      placement="bottom-end"

                    >
                      <div className="p-lg-2 pb-0">
                        {headerGroups.map((headerGroup) => (
                          <div
                            style={{ display: "flex flex-column" }}
                            {...headerGroup.getHeaderGroupProps()}
                          >
                            {headerGroup.headers.map((column, i) => (
                              <div
                                key={i}
                                style={{ display: "block", justifyContent: "center" }}
                              >
                                {column.canFilter ? column.render("Filter") : null}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
                <div className='me-4'>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                </div></div>
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
    table_data: state.studentTableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentTable: (data, isLoading) => dispatch(fetchStudentTable(data, isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfAppliedStudentTable);
