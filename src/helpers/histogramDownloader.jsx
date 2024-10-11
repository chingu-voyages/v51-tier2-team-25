import jsPDF from "jspdf";

const histogramDownloader = (chartRef, group = null) => {
 
  const downloadGroupPDF = async () => {
    const chart = chartRef.current;
    if (chart) {
      const pdf = new jsPDF();
      const imageUrl = chart.toBase64Image();
      pdf.addImage(imageUrl, "PNG", 10, 10, 180, 90);
      pdf.save("histogram.pdf");
    } else {
      console.error("Chart reference is not valid.");
    }
  };
  
const downloadParticipantPDF = async () => {
  const chart = chartRef.current;
  if (chart) {
    const pdf = new jsPDF();
    const imageUrl = chart.toBase64Image();
    pdf.addImage(imageUrl, "PNG", 10, 10, 180, 90);
    // console.log(pdf.getFontList());
    pdf.setFont("Helvetica");
    pdf.setTextColor("#464646");
    pdf.setFontSize(10);
    pdf.text(`Group: ${group.name}`, 10, 105);
    pdf.setFontSize(8);
    let yPosition = 115;
    
    group.expenses.forEach((expense, index) => {
      pdf.text(`Expense ${index + 1}: ${expense.description || 'N/A'}`, 10, yPosition);
      yPosition += 5;
      pdf.text("Participants:", 15, yPosition);
      yPosition += 5;
      
      expense.participants.forEach((participant) => {
        pdf.text(`- ${participant.name}: $${participant.amountToPay}`, 20, yPosition);
        yPosition += 5;
      });
      
      yPosition += 5;
    });
    
    pdf.save("histogram.pdf");
  } else {
    console.error("Chart reference is not valid.");
  }
};

  return {downloadGroupPDF, downloadParticipantPDF };
};

export default histogramDownloader;