import html2pdf from "html2pdf.js"

export const exportResumeToPDF = (resumeElement: HTMLElement, fileName = "resume.pdf") => {
  const options = {
    margin: 10,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
  }

  html2pdf().set(options).from(resumeElement).save()
}
