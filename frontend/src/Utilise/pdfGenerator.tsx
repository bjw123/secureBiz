import jsPDF from 'jspdf';
import 'jspdf-autotable';

// define a generatePDF function that accepts a tickets argument

interface column {
  //@ts-ignore
  [key: any]: string;
}
[];

interface row extends column {}

interface data {
  column: column;
  row: row;
}

const generatePDF = (data: data) => {
  // initialize jsPDF
  const doc = new jsPDF();
  const totalPagesExp = '{total_pages_count_string}';

  //@ts-ignore
  doc.autoTable({
    head: data.column,
    body: data.row,
    styles: { cellPadding: 1, fontSize: 9 },
    columnStyles: {
      Question: { cellWidth: 50, cellPadding: 2 },
      Response: { cellWidth: 20, cellPadding: 2 },
      Mitigation: { cellPadding: 2 },
    },
    didDrawPage: function () {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      //   if (base64Img) {
      //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
      //   }
      doc.text('ASD ESSENTIAL EIGHT - Presented by Securebiz', 14, 15);
      doc.setFontSize(10);
      doc.text(
        'The following report demonstrates your current maturity level with respect to industry standard and the',
        15,
        22
      );
      doc.text('ASDEssential Eight Cyber Security Principals.', 14, 27);

      // Footer
      //@ts-ignore
      var str = 'Page ' + doc.internal.getNumberOfPages();

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, 10, pageHeight - 10);
    },
    margin: { top: 30 },
  });

  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  // we define the name of our PDF file.
  doc.save(`securebiz_${dateStr}.pdf`);
};

export default generatePDF;
