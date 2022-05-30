import * as React from "react";
// import { useMemo } from "react";
import { GlobalFilter } from "./tableComponents/GlobalFilter";
// import Edit_icon from '../assests/image/Edit_icon.svg'
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
} from "react-table";
import axios from "axios";
// import MockData from './tableComponents/feesStructureTabledata.json'
// import FeesStructureHeader from "./tableComponents/FeesStructureHeader";
import "./styles/Table.css";
import { TableCheckbox } from "./tableComponents/TableCheckbox";
import { connect } from "react-redux";
import { fetchFeesTableData } from "../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";
import AllUrl from "../../redux/constants/url";
// import SkeletonColor from "../../helpers/Skeletrone";
import { toast, ToastContainer } from "react-toastify";
import updown_sort from '../assests/image/updown_sort.svg'
import Pagination from "../assests/common/Pagination";
import Loader from "../assests/common/Loader";
// import OfflinePage from "../auth/OfflinePage";
import NoDataFound from "../assests/common/NoDataFound";
import Swal from "sweetalert2";
import { ActivateButton, DeactivateButton } from "../assests/common/Color";
import { Tooltip, Whisper } from "rsuite";
import SkeletonColor from "../../helpers/Skeletrone";
import { useState } from "react";
// import ViewReceiptPopup from "./ViewReceiptPopup";

// import LoaderButton from "../../assests/common/LoaderButton";

function DeleteReceiptTable({ table_data, fetchFeesTable }) {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.reportReceipt,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        fetchFeesTable(config);
        // setTableData(table_data.table_data);
        // eslint-disable-next-line
    }, []);

    //   const columns = useMemo(() => FeesStructureHeader, []);
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
            accessor: "name",
        },
        {
            header: "Father's Name",
            accessor: "fathersName",
        },
        {
            header: "Date",
            accessor: "accountsReceiptDate",
        },
        {
            header: "Receipt No",
            accessor: "accountsReceiptNo",
        },
        {
            header: "Year",
            accessor: "year",

        },
        {
            header: "Cause",
            accessor: "reportRemark",
            width: 250,
            
        },
        {
            header: "Amount",
            accessor: "receivedAmount",
        },
        {
            header: "Reject",
            accessor: "reject",
            Cell: ({ row: { original } }) => (
                <button
                    className="table_btn_size"
                    style={DeactivateButton}
                    // disabled={original.reg_fees_status === "Paid"}
                    onClick={() => {
                        Swal.fire({
                            title: 'Reject Receipt',
                            html:
                                '<hr>' +
                                'Are you sure?' +
                                '<br>' +
                                'You want to Reject this Receipt ',
                            // icon: 'warning',
                            showCancelButton: true,
                            // showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonText: 'Reject',
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
                                setLoading(true)
                                var body = JSON.stringify({
                                    stdId: original.stdId,
                                    accountsReceiptNo: original.accountsReceiptNo,
                                    reportRemark: original.reportRemark,
                                    isReport: "false",


                                    // "stdId": "963734d3-0815-4d35-99f7-7c05cb4d71b6",
                                    // "accountsReceiptNo": "BCA164465564",
                                    // "reportRemark": "reported list list",
                                    // "isReport": "true"
                                });

                                var config = {
                                    method: 'post',
                                    url: `${AllUrl.rejectReceipt}`,
                                    headers: {
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                        'Content-Type': 'application/json'
                                    },
                                    data: body
                                };

                                const result = await axios(config)
                                if (result.status === 200) {
                                    toast.success('Receipt Rejected successfully', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    });
                                    let config = {
                                        method: "GET",
                                        url: AllUrl.reportReceipt,
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json",
                                        },
                                    };
                                    setLoading(false)
                                    var Show = true;
                                    fetchFeesTable(config, Show);
                                }
                                else if (result.status === 404) {
                                    setLoading(false)
                                    toast.warning('Something went wrong', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    });
                                }
                                else {
                                    setLoading(false)
                                    toast.warning('Something went wrong', {
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
                    Reject
                </button>)
        },
        {
            header: "Accept",
            accessor: "accept",
            Cell: ({ row: { original } }) => (
                <button
                    className="table_btn_size"
                    style={ActivateButton}
                    onClick={() => {
                        Swal.fire({
                            title: 'Payment Confirmation',
                            html:
                                '<hr>' +
                                'Are you sure?' +
                                '<br>' +
                                'You want to Accept this Receipt ',
                            // icon: 'warning',
                            showCancelButton: true,
                            // showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonText: 'Accept',
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
                                setLoading(true);
                                var body = JSON.stringify({
                                    stdId: original.stdId,
                                    accountsReceiptNo: original.accountsReceiptNo,
                                });

                                var config = {
                                    method: 'post',
                                    url: `${AllUrl.deleteReportedList}`,
                                    headers: {
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                        'Content-Type': 'application/json'
                                    },
                                    data: body
                                };

                                const result = await axios(config)
                                if (result.status === 200) {
                                    toast.success('Receipt accepted', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    });
                                    let config = {
                                        method: "GET",
                                        url: AllUrl.reportReceipt,
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json",
                                        },
                                    };
                                    var Show = true;
                                    fetchFeesTable(config, Show);
                                    setLoading(false)
                                }
                                else if (result.status === 404) {
                                    toast.warning('Somethingn went wrong !', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    });
                                    setLoading(false)
                                }
                                else {
                                    setLoading(false)
                                    toast.warning('Somethingn went wrong !', {
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
                    Approve
                </button>)
        },
        {
            header: 'Action',
            accessor: 'view',
            Cell: ({ row: { original, index } }) => {
                return (
                    // <div className="d-flex m-0 flex-column justify-content-start">
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                            View Receipt
                        </Tooltip>
                    }>
                        <a href={original.photo} rel="noreferrer" target='_blank'>
                            <button
                                style={{
                                    backgroundColor: "#F7922A",
                                    color: "white",
                                    outline: "none",
                                    border: "none",
                                    fontWeight: "bold",
                                    height: '31px',
                                    borderRadius: "3px"
                                }}

                            >
                                View
                            </button>


                        </a>
                    </Whisper>
                    // </div >
                )
            },
            Filter: "",
            filter: "",
        },
    ]);



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
    )
        : (
            <>
                {
                    loading && <Loader />
                }
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
                                        <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                        <tbody{...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td style={{ maxWidth: '250px' }} {...cell.getCellProps()}>{cell.render("Cell")} </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <NoDataFound rows={rows} />
                    <Pagination data={table_data.table_data}

                        rows={rows}
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
        fetchFeesTable: (data, Show) => dispatch(fetchFeesTableData(data, Show)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReceiptTable);




