import jsPDF from 'jspdf';
import ssismLogo from '../../assests/image/logoimage.png'
import './Poppins-Bold-bold'
import './Poppins-SemiBold-normal'

const downloadPdf = (data) => {


    console.log(data.slice(0,10))
    function chunk(array, count) {
        if (count == null || count < 1) return [];
        var result = [];
        var i = 0, length = array.length;
        while (i < length) {
            result.push(Array.prototype.slice.call(array, i, i += count));
        }
        return result;
    };
    var newList = chunk(data, 10);
    // console.log(newList)
    const date = new Date()


    var doc = new jsPDF('landscape', 'px', [1366, 768]);
    var width = doc.internal.pageSize.getWidth()
    // var height = doc.internal.pageSize.getHeight()
    doc.setFillColor('#F4F7FC');
    doc.rect(0, 0, width, 94, 'F')
    doc.addImage(ssismLogo, 20, 23, 150, 48)
    doc.setFontSize(26);
    doc.setFont('Poppins', 'bold')
    doc.text('Student List', (width / 2) - 42, (94 / 2) - 11 )
    doc.setFontSize(17);
    doc.text(`Session -   ${' ' + date.getFullYear()}-${(date.getFullYear() + 1) - 2000}`,(width / 2) - 42,(94 / 2) + 17)

    doc.setFontSize(18);
    doc.setFont('Poppins-SemiBold', 'normal');
    doc.text(`Print Date ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, (width) - 200, (94 / 2) - 11)
    doc.text(`Number of Student - ${data?.length}`, (width) - 200, (94 / 2) + 17)

    doc.setFillColor('#F4F7FC');
    doc.rect(0, 107, width, 57, 'F');

    const xPosition = 0;
    doc.setFont('Poppins-SemiBold', 'normal');
    doc.setFontSize(20);
    console.log(doc.getFontList())
    doc.text('S.No', xPosition + 48, 140)
    doc.text('Name', xPosition + 125, 140)
    doc.text('Father Name', xPosition + 285, 140)
    doc.text('Stream', xPosition + 492, 140)
    doc.text('Village', xPosition + 659, 140)
    doc.text('Mobile Number', xPosition + 798, 140)
    doc.text('Received Amount', xPosition + 1002, 140)
    doc.text('Pending Amount', xPosition + 1197, 140)


    doc.setFontSize(18);
    doc.setTextColor('#595F7E')



    let yPosition = 200;
    let H = 60;
    let footerHeight = 250;
    let ReceivedAmount = 0;
    let RemainAmount = 0;




    let count = 1;
    newList.forEach((data, pageNO) => {



        if ((pageNO + 1) > 1) {
            doc.addPage();
            yPosition = 115;
            H = 60;
            footerHeight = 120;

        }

        data.forEach((ele, i) => {
            footerHeight += H;
            ReceivedAmount += parseInt(ele.receivedAmount);
            RemainAmount += parseInt(ele.remainAmount)
            doc.text((count++).toString(), xPosition + 48 + 3, yPosition + (i * H))
            doc.text((ele.name)?.toString(), xPosition + 125, yPosition + (i * H))
            doc.text(ele.fathersName, xPosition + 285, yPosition + (i * H))
            doc.text(`${ele.branch}( ${ele.year} )`, xPosition + 492, yPosition + (i * H))
            doc.text(ele.village, xPosition + 659, yPosition + (i * H))
            doc.text((ele.mobile)?.toString(), xPosition + 817, yPosition + (i * H))
            doc.text((ele.receivedAmount)?.toString(), xPosition + 1054, yPosition + (i * H))
            doc.text((ele.remainAmount)?.toString(), xPosition + 1247, yPosition + (i * H))
            // doc.text('-', xPosition + 1238, yPosition + (i * H))


        });
    })

    doc.setFillColor('#F4F7FC');
    doc.rect(0, footerHeight - 56, width, 56, 'F')
    doc.text('Total / --',xPosition + 48,  footerHeight - 23)
    doc.text(ReceivedAmount.toString(), xPosition + 1054, footerHeight - 23)
    doc.text(RemainAmount.toString(), xPosition + 1247, footerHeight - 23)

    doc.output('pdfobjectnewwindow');



}

export default downloadPdf;