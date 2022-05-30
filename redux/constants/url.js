//main url in the application
// export const baseUrl = "https://singaji-central-server.herokuapp.com";
export const baseUrl = "https://singaji-central-server-new-db.herokuapp.com";
// export const baseUrl = "http://localhost:5000";



export const loginUrl = "/api/login";
 
export const forgetPass = "/api/resetPasswordEmail";

const AllUrl = {         
    // Register New student url
    newRegistraionUrl: `${baseUrl}/api/register`,

    // Fess structure related url 
    updateSchema: `${baseUrl}/api/update_schema`,
    createSchema: `${baseUrl}/api/create_schema`,
    allSchemaList: `${baseUrl}/api/list_schema`,
    activeMultipleSchema: `${baseUrl}/api/active_schema_multiple_selections`,
    activeSchema: `${baseUrl}/api/active_schema`,
    //_____________________________________

    //Admin related url
    createNewAdmin: `${baseUrl}/api/createNewAdmin`,
    infoAllAdmin: `${baseUrl}/api/infoOfAdmins`,
    allActiveStudent: `${baseUrl}/api/infoOfAllActiveStudents`,
    showFees: `${baseUrl}/api/show_fees/`,
    adminStatusChange: `${baseUrl}/api/deactive_or_activate_admin`,
    roleList: `${baseUrl}/api/role_list`,
    //_____________________________________


    //Student related url
    allRegistratedStudent: `${baseUrl}/api/registrated_student`,
    allRegistratedStudentAccountList: `${baseUrl}/api/info_Of_All_Registered_Student_Account`,
    deleteStudent: `${baseUrl}/api/delete_cancel_student`,
    verifyStudent: `${baseUrl}/api/varify_student`,
    verifyStudentPaidUnpaid: `${baseUrl}/api/reg_fees_status`,
    verifyStudentAccountPaidUnpaid: `${baseUrl}/api/acc_reg_fees_status`,
    addNewStudent: `${baseUrl}/api/register`,
    updateRegisterStudentInfo: `${baseUrl}/api/update_registrated_students`,
    updatePersonalInformation: `${baseUrl}/api/update_personal_info`,// update the personal information of a particular student 
    updateAccountInformation: `${baseUrl}/api/update_account_info`,// update the Account information of a particular student 
    allInfoOfActiveStudent: `${baseUrl}/api/all_info_of_active_student`,// get the all data about student related
    pendingFeesReport: `${baseUrl}/api/get_scholarship_pending_list`,// pending fees report
    GetDocumentsOfStudents: `${baseUrl}/api/get_documents`, // get documents of particular student
    UploadDocument: `${baseUrl}/api/upload_document`, // get documents of particular student
    accountStudent: `${baseUrl}/api/get_students_account_list`,
    selfRegisterStudents: `${baseUrl}/api/self_registrated_student`,
    shiftToAppliedStudent: `${baseUrl}/api/shift_to_applied_students`,
    deleteSelfAppliedStudents: `${baseUrl}/api/delete_self_applied_students`,

    //_____________________________________

    //landing pages urls 
    login: `${baseUrl}/api/login`,
    registerNewStudent: `${baseUrl}/api/register`,
    forgotPassword: `${baseUrl}/api/resetPasswordLink/`, //new password
    resetPassword: `${baseUrl}/api/resetPasswordEmail`, //only email send
    selfRegistration: `${baseUrl}/api/self_registration`,
    //_____________________________________

    // helpers related url
    receiptGenerate: `${baseUrl}/api/generatingFeesRashid`,
    trackList: `${baseUrl}/api/track_list`,
    branchList: `${baseUrl}/api/list_branch`,
    villageNameList: `${baseUrl}/api/village_name`,
    villageNameById: `${baseUrl}/api//track_name/3`, // where 3 is an id of track
    uploadFile: `${baseUrl}/api/uploadFile`,
    reportReceipt: `${baseUrl}/api/list_of_reported_receipt`,
    deleteReportedList: `${baseUrl}/api/delete_reported_receipt`,
    rejectReceipt: `${baseUrl}/api/report_receipt`,//to deactivate a student fees receipt reject

    //_____________________________________

    //Account admin tables url 

    dailyReport: `${baseUrl}/api/daily_account_report/`,// these are date
    pendingScholarship: `${baseUrl}/api/get_scholarship_pending_list`,
    feesReceiptTable: `${baseUrl}/api/fees_receipt_list/1&100`,// 3&2 are dynamic
    generateReciept: `${baseUrl}/api/generate_reciept`,

    // Fees Receipt delete api

    deletereciept: `${baseUrl}/api/report_receipt`,

    // personal profile settings 

    settingApi: `${baseUrl}/api/edit_profile`
}
export default AllUrl



