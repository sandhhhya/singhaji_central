import React, { useState } from "react";
import { Fragment, useMemo } from "react";
import downloadPdf from "./PdfGeneratorDailyReport";
import downloadPdfStudentList from './PdfGeneratorStudentList'
import Avatar from '@mui/material/Avatar';
import {
    useTable,
    useFilters,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useAsyncDebounce,
} from "react-table";
import { TableCheckbox } from "../tableComponents/TableCheckbox";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CPopover,
} from "@coreui/react";
import filtericon from "../../assests/image/AccountIcons/filter.svg";
import { CSVLink } from "react-csv";
import DateRangePicker from "rsuite/DateRangePicker";
import { Tooltip, Whisper } from "rsuite";
import './Styles/StudentAccountTable.css';
import updown_sort from '../../assests/image/updown_sort.svg';

import allUrls from '../../../redux/constants/url'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "rsuite/dist/rsuite.min.css";
import AllUrl from '../../../redux/constants/url';
import { connect } from 'react-redux';
import { fetchStudentAccountData, getDailyReport, changeDailyReport, accountAction } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import SkeletonColor from '../../../helpers/Skeletrone';
import Pagination from "../../assests/common/Pagination";
import Loader from "../../assests/common/Loader";
import AvatarImg from '../../assests/image/Avtar.jpeg'
import rightArrow from '../../assests/image/right_arrow_icon.svg'
import dateIcon from '../../assests/image/AccountIcons/DateIcon.svg'
// import OfflinePage from '../../auth/OfflinePage';
import NoDataFound from "../../assests/common/NoDataFound";
// import CountUp from 'react-countup';
import { toast } from "react-toastify";



export const MultipleFilter = (rows, accessor, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
        if (filterValue.includes(val.original[accessor])) arr.push(val);
    });
    return arr;
};

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
    else if (id === 'isActive') offsetObj = [33, 18]
    else if (id === 'gender') offsetObj = [33, 18]

    let name = id;

    switch (id) {
        case 'isActive':
            name = 'Student Status';
            break;
        case 'year':
            name = 'Select Year';
            break;

        case 'branch':
            name = 'Select Class';
            break;

        case 'joinBatch':
            name = 'Select Session';
            break;
        case 'trackName':
            name = 'Select Track';
            break;
        case 'gender':
            name = 'Select Gender';
            break;


        default:
            break;
    }

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

                                if (id === 'isActive') {
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

// Define a default UI for filtering
function GlobalFilter({ filter, setFilter, preGlobalFilteredRows }) {
    // const count = preGlobalFilteredRows.length;
    // const [value, setValue] = React.useState(filter);
    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1);

    return (
        <>
            <input
                style={{
                    width: "270px",
                    height: "41px",
                    outline: "none",
                    border: "1px solid #7979792b",
                    padding: "5px",
                    borderRadius: "4px",
                    paddingLeft: '12px'
                }}
                type="search"
                value={filter || ""}
                onChange={(e) => {
                    // setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder="Search..."
            />
            <i
                style={{ marginLeft: "-31px", alignSelf: 'center', marginBottom: '7px', color: "rgb(90, 96, 127,0.7)" }}
                className="fas fa-search"
            ></i>
        </>
    );
}

function StudentAccountTable({ backOriginal, getReport, fetchUsers, studentData, accountAction }) {
    const [is_dailyReport, set_is_dailyReport] = useState(false)
    const [MoneyCount, setMoneyCount] = useState({ TStudent: 0, TAmount: 0, TpaidAmount: 0, RAmount: 0, WaiveOff: 0, TpaidAmountByDailyReport: 0,LateFees:0 });

    React.useEffect(() => {
        var config = {
            method: "GET",
            url: AllUrl.accountStudent,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        fetchUsers(config);
        // settable_data(table_data.table_data);
        // eslint-disable-next-line
    }, []);



    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");
    const [date, setDate] = useState({ a: new Date(), b: new Date() })


    ////////////////////////////
    const getAllInfoOfStudent = (original, is_reciptBtn) => {
        setLoading(true)
        let data = JSON.stringify({
            "stdId": original.stdId,
        });

        let config = {
            method: 'post',
            url: allUrls.allInfoOfActiveStudent,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        // const response = await axios(config)
        accountAction(config, navigate, is_reciptBtn, setLoading);

    }
    /////////////////////////////////////
    /////////////////////////////////////

    // const data = React.useMemo(() => tableData, []);
    /// for color hex code for any name 
    // function stringToColor(string) {
    //     let hash = 0;
    //     let i;

    //     /* eslint-disable no-bitwise */
    //     for (i = 0; i < string.length; i += 1) {
    //       hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //     }

    //     let color = '#';

    //     for (i = 0; i < 3; i += 1) {
    //       const value = (hash >> (i * 8)) & 0xff;
    //       color += `00${value.toString(16)}`.substr(-2);
    //     }
    //     /* eslint-enable no-bitwise */

    //     return color;
    //   }
    const mainColoumns = [
        {
            header: "S.No",
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return index + 1;
            },
            Filter: "",
            filter: "",
        },
        {
            header: "Profile",
            accessor: "photo",

            Cell: ({ row: { original, index } }) =>
            // console.log("original.photo",original.photo)
            (
                <div className="d-flex m-0 flex-column justify-content-start">
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                            View Profile .
                        </Tooltip>
                    }>
                        {original.photo ?
                            <Avatar src={original.photo}
                                alt="profile"
                                style={{ cursor: "pointer", borderRadius: '50%', width: "50px", height: "50px" }}
                                onClick={() => {
                                    getAllInfoOfStudent(original, false)
                                }}
                                className="mx-auto"

                            >{original.name?.slice(0, 1)}</Avatar>
                            //  <img
                            // alt="profile"
                            // style={{ cursor: "pointer", borderRadius: '50%', width: "50px", height: "50px" }}
                            // onClick={() => {
                            //     getAllInfoOfStudent(original, false)
                            // }}
                            // className="mx-auto"
                            //     src={original.photo}




                            // /> 
                            :
                            <img
                                alt="profile"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    getAllInfoOfStudent(original, false)
                                }}
                                className="mx-auto"
                                src={AvatarImg}
                                width={50}

                                text="Image"
                            />}
                    </Whisper>
                </div >
            ),
            Filter: "",
            filter: "",
        },
        {
            header: 'Name',
            accessor: 'name',
            Filter: "",
            Cell: ({ row: { original, index } }) =>
            // console.log("original.photo",original.photo)
            (
                <div className="d-flex m-0 flex-column justify-content-start">
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                            View Profile .
                        </Tooltip>
                    }>
                        {
                            <span
                                alt="profile"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    getAllInfoOfStudent(original, false)
                                }}
                                className="mx-auto"
                            >
                                {original.name}

                            </span>

                        }
                    </Whisper>
                </div >
            ),
            filter: "",
        },
        {
            header: "Father's Name",
            accessor: 'fathersName',
            Filter: "",
            filter: "",
        }, {
            header: () => <span style={{ display: 'none', width: '0px' }}></span>,
            accessor: "isActive",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
            Cell: ({ row: { original } }) => (
                <>
                </>
            ),
            width: 0

        },

        {
            header: "Stream",
            accessor: "branch",
            Cell: ({ row: { original } }) => (
                <span className='' >
                    {`${original.branch}( ${original.year} )`}
                </span>
            ),
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
        },
        {
            header: () => <span style={{ display: 'none', width: '0px' }}></span>,
            accessor: "joinBatch",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
            Cell: ({ row: { original } }) => (
                <>
                    {/* <span>{original.joinBatch}</span> */}
                </>
            ),
            width: 0

        },
        {
            header: "Mobile No",
            accessor: "mobile",
            Filter: "",
            filter: "",
        }
        ,
        {
            header: () => <span style={{ display: 'none', width: '0px' }}></span>,
            accessor: "gender",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
            Cell: ({ row: { original } }) => (
                <>
                </>
            ),
            width: 0

        },
        {
            header: 'Village',
            accessor: 'village',
            Filter: "",
            filter: "",
        },
        {
            header: () => <span style={{ display: 'none', width: '0px' }}></span>,
            accessor: "trackName",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
            Cell: ({ row: { original } }) => (
                <>
                </>
            ),
            width: 0

        },
        {
            header: 'Received Fees',
            accessor: 'receivedAmount',
            Cell: ({ row: { original } }) => (
                <div className='circle-main align-items-center'>
                    <div className="d-flex align-items-center">
                        <span className='recieved-fee-circle' style={{ backgroundColor: "#56F000", marginRight: "10px", marginLeft: "17px" }}></span>
                        {original.receivedAmount}
                    </div>
                </div>
            ),
            Filter: "",
            filter: "",
        },
        {
            header: () => <span style={{ display: 'none', width: '0px' }}></span>,
            accessor: "year",
            Filter: SelectColumnFilter,
            filter: MultipleFilter,
            Cell: ({ row: { original } }) => (
                <>
                </>
            ),
            width: 0

        },

        {
            header: 'Pending Fees',
            accessor: 'remainAmount',
            Cell: ({ row: { original } }) => (
                <div className='circle-main align-items-center'>
                    <div className="d-flex align-items-center">
                        <span className='recieved-fee-circle' style={{ backgroundColor: "#FCE83A", marginRight: "10px", marginLeft: "15px" }}></span>
                        {original.remainAmount}
                    </div>
                </div>
            ),
            Filter: "",
            filter: "",
        },
        {
            header: 'Action',
            accessor: 'accesory',
            Cell: ({ row: { original, index } }) => {
                return (
                    // <div className="d-flex m-0 flex-column justify-content-start">
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                            generate Receipt .
                        </Tooltip>
                    }>
                        <button className="table_btn_size" onClick={() => {
                            getAllInfoOfStudent(original, true)
                        }} style={{ backgroundColor: "#F99300", fontWeight: 'bold', color: 'white', borderRadius: '5px' }} >Receipt</button>
                    </Whisper>
                    // </div >
                )
            },
            Filter: "",
            filter: "",
        },
    ];



    const dailyReportColumn = [
        {
            header: 'S.no',
            accessor: "Srno",
            Cell: ({ row: { original, index } }) => {
                return (index + 1)
            },
            Filter: "",
            filter: "",
        },
        {
            header: "Name",
            accessor: "name",
            Filter: "",
            filter: "",
        },
        {
            header: 'Father name',
            accessor: 'fathersName',
            Filter: "",
            filter: "",
        },
        {
            header: 'Stream',
            accessor: 'stream(year)',
            Filter: "",
            filter: "",
        },
        {
            header: 'Village',
            accessor: 'village',
            Filter: "",
            filter: "",
        },
        {
            header: 'Date',
            accessor: 'accountsReceiptDate',
            Filter: "",
            filter: "",
        },
        {
            header: 'Received amount',
            accessor: 'receivedAmount',
            Filter: "",
            filter: "",
        },
        {
            header: 'Waive Off amount',
            accessor: 'waiveOff',
            Filter: "",
            filter: "",
        }

    ]


    const [columns, setColoumns] = useState(mainColoumns);

    // function to show daily report
    const showDailyReport = async () => {
        setLoading(true)
        function convert(str) {
            console.log(str)
            var date = new Date(str)
            console.log(date)
            let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
            let day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        }

        var first = convert(date.a)
        var last = convert(date.b)

        console.log(first)
        console.log(last)
        var config = {
            method: "GET",
            url: `${AllUrl.dailyReport}${first}&${last}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const result = await axios(config)
            setLoading(false)
            if (result.status === 200) {
                getReport(result.data)
                setColoumns(dailyReportColumn)
                set_is_dailyReport(true)
            } else {
                setColoumns(dailyReportColumn)
                set_is_dailyReport(true)
                setLoading(true)
                toast.warning('Data not found !', {
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
            setLoading(false)
            setColoumns(dailyReportColumn)
            getReport([])
            set_is_dailyReport(true)
            // toast.warning('Data Not Found !', {
            //     position: "top-center",
            //     autoClose: 2000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            // });
        }
        //if the data is getting successfully than they set the data to upcoming data
    }



    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        nextPage,
        previousPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        canNextPage,
        setPageSize,
        pageOptions,
        selectedFlatRows,
        state,
        setGlobalFilter,
        // exportData,
        preGlobalFilteredRows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: studentData.table_data,
            // getExportFileBlob,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        // useExportData,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        header: ({ getToggleAllRowsSelectedProps }) => (
                            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
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

    const { globalFilter, pageSize, pageIndex, } = state;


    var exportData = [];
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
                exportData.push(data)
                // console.log(selectedData);
                exportCsv.push(data)
            })
        },
        null,
        2
    );
    console.log(checkboxData)
    //  for download pdf
    ////

    //// for 5 title data feed

    React.useEffect(() => {
        let data = rows;
        console.log(data)

        let RAmount = 0;
        let TAmount = 0;
        let TpaidAmount = 0;
        let WaiveOff = 0;
        let TpaidAmountByDailyReport = 0;
        let LateFees = 0;
        data.forEach((ele) => {
            ele = ele.original
            RAmount += ele?.remainAmount
            TAmount += ele?.totalFees
            LateFees += ele?.lateFees
            TpaidAmount += ele?.receivedAmount;
            TpaidAmountByDailyReport += ele?.receivedAmount
            WaiveOff += ele?.waiveOff;
        })

        setMoneyCount((val) => {
            return {

                'TStudent': data.length,
                RAmount,
                TAmount,
                TpaidAmount,
                WaiveOff,
                TpaidAmountByDailyReport,
                LateFees

            }
        })


        // console.log(MoneyCount)


    }, [rows]);

    const getBackPosition = () => {
        backOriginal()
        setColoumns(mainColoumns)
    }

    // const AnimateNum = ({ num }) => {


    //     return (
    //         <>
    //             <CountUp

    //                 start={30000}
    //                 end={num}
    //                 duration={0.5}
    //                 separator=","
    //                 easingF={function (x, t, b, c, d) { return -c * (t /= d) * (t - 2) + b; }}
    //                 prefix="₹ "
    //                 startOnMount={false}

    //             >

    //             </CountUp>
    //         </>

    //     )
    // }

    const CIcon = () => {

        return (<>
            <img style={{ marginLeft: "-110px" }} src={dateIcon} alt='date' />
        </>);
    };

    return studentData.loading ? (
        <SkeletonColor></SkeletonColor>
    ) :
        // studentData.error ? (
        //     <OfflinePage />) : 
        (
            <Fragment>
                {loading && (
                    <Loader />
                )}

                <div className="container-fluid">
                    {/* for the header section   */}
                    <div style={{ position: 'sticky', top: '80px', backgroundColor: '#f4f7fc', zIndex: '6', paddingBottom: '10px', width: '100%' }}>
                        <div className="d-flex row Stu-Acc-info " style={{ color: "rgb(90, 96, 127)", margin: "Auto", height: "70px" }} >
                            <div className="col info-col m-2"  >
                                <h5 style={{ marginTop: "12px" }}> {MoneyCount.TStudent} <br /> <p >Total Students</p> </h5>
                            </div>
                            <div className="col info-col m-2" >
                                <h5 style={{ marginTop: "12px" }}>{MoneyCount.TAmount ? MoneyCount.TAmount.toLocaleString('en-IN') : '-'} <br /> <p>{is_dailyReport ? '-' : 'Total Amount'}</p> </h5>
                            </div>
                            <div className="col info-col m-2" >
                                <h5 style={{ marginTop: "12px" }}>{is_dailyReport ? MoneyCount.TpaidAmountByDailyReport.toLocaleString('en-IN') : MoneyCount.TpaidAmount.toLocaleString('en-IN')} <br /> <p >{is_dailyReport ? 'T. Received Amount' : 'Total Paid Amount'}</p> </h5>
                            </div>
                            <div className="col info-col m-2" >
                                <h5 style={{ marginTop: "12px" }}>{MoneyCount.RAmount ? MoneyCount.RAmount.toLocaleString('en-IN') : '-'} <br /> <p >{is_dailyReport ? '-' : 'Remaining Amount'}</p> </h5>
                            </div>
                            <div className="col info-col m-2">
                                <h5 style={{ marginTop: "12px" }}>{MoneyCount.WaiveOff ? MoneyCount.WaiveOff.toLocaleString('en-IN') : '0'}<br /> <p >Waive Off</p> </h5>
                            </div>
                            <div className="col info-col m-2">
                                <h5 style={{ marginTop: "12px" }}>{MoneyCount.LateFees ? MoneyCount.LateFees.toLocaleString('en-IN') : '0'}<br /> <p >Late Fees</p> </h5>
                            </div>
                        </div>
                        <div className="row  mx-0 mt-3" >
                            <div className="d-flex">
                                <div style={{ marginLeft: '-12px' }}>
                                    <select
                                        className="form-select table_select_row_options"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                    >
                                        {[10, 25, 50, 100].map((pageSize) => (
                                            <option value={pageSize} key={pageSize}>
                                                Show Entries {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="d-flex  ml-3">
                                    <DateRangePicker
                                        caretAs={CIcon}

                                        onClean={(e) => {

                                            e.preventDefault();
                                            getBackPosition()
                                            set_is_dailyReport(false)
                                        }}

                                        onChange={(value) => {

                                            if (!value) {

                                                return;
                                            }
                                            var a = value[0]
                                            var b = value[1]
                                            console.log(value)
                                            setDate({
                                                a, b
                                            })
                                        }}

                                        appearance="default" className='stu-acc-table' placeholder="TO" style={{ width: 230 }} />
                                    <button onClick={showDailyReport} className='date-range-button'>Daily Report</button>
                                </div>
                                <div className="btn-group  ml-3">
                                    <button className="btn  btn-sm download-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Download
                                    </button>
                                    <div class="dropdown-menu mt-1">
                                        <div >
                                            <div ><CSVLink className="dropdown-item" style={{ fontWeight: 'bold' }} data={exportCsv}>Excel</CSVLink></div>                                    </div>
                                        {is_dailyReport ?
                                            <div className="dropdown-item" onClick={() => { downloadPdf(exportCsv) }}><b>Pdf</b></div>
                                            :
                                            <div className="dropdown-item" onClick={() => { downloadPdfStudentList(exportCsv) }}><b>Pdf</b></div>
                                        }

                                    </div>
                                </div>


                                <div className="d-flex ml-auto me-3">
                                    <div className="d-flex mr-2" style={{ height: '40px', width: '42px', backgroundColor: '#fff', borderRadius: '3px', border: "1px solid #EDEDED" }}>

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
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        filter={globalFilter}
                                        setFilter={setGlobalFilter}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* for the body section  */}
                    {/* <div style={{ width: '100%', height: '70%', paddingBottom: '4%' }}> */}
                    <table {...getTableProps()} id="customers">

                        <thead style={{ position: 'sticky', top: '212px', width: '100%', backgroundColor: '#f4f7fc', zIndex: '5' }}>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("header")}
                                            {/* {console.log(column)} */}
                                            {column.id !== 'year' && column.id !== 'trackName' ?

                                                <span>
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <img
                                                                src={updown_sort}
                                                                style={{ marginLeft: "5px" }}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                src={updown_sort}
                                                                style={{ marginLeft: "5px" }}
                                                                alt=""
                                                            />
                                                        )
                                                    ) : (
                                                        ""
                                                    )}
                                                    {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}
                                                </span>

                                                : ''}



                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()} stle={{ width: "100%" }} >

                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <NoDataFound rows={rows} />
                    {/* for the pagination section */}

                    <Pagination data={studentData.table_data} rows={rows}
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
            </Fragment >
        );
}

const mapStateToProps = (state) => {
    return {
        studentData: state.accountStudentTableData,
    };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (data) => dispatch(fetchStudentAccountData(data)),
        getReport: (data) => dispatch(getDailyReport(data)),
        backOriginal: () => dispatch(changeDailyReport()),
        accountAction: (config, navigate, is_reciptBtn, setLoading) => dispatch(accountAction(config, navigate, is_reciptBtn, setLoading)),
    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountTable);

