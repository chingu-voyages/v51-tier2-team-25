import jsPDF from "jspdf";

const histogramDownloader = (chartRef) => {
  const downloadImage = async () => {
    const chart = chartRef.current;
    if (chart) {
      const imageUrl = chart.toBase64Image();
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "histogram.png";
      link.click();
    } else {
      console.error("Chart reference is not valid.");
    }
  };
  
  const downloadPDF = async () => {
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

  return { downloadImage, downloadPDF };
};

export default histogramDownloader;