import htmlToPdfmake from 'html-to-pdfmake';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';

export const generatePDF = (text: string): void => {
  // const htmlContent: string = marked(text);
  // const doc = new jsPDF();
  // const margin = 10;
  // const lineHeight = 6;
  // let yPosition = 20;
  // const renderHeading = (text: string, level: number): void => {
  //   let fontSize = 16;
  //   if (level === 1) fontSize = 16;
  //   else if (level === 2) fontSize = 14;
  //   else if (level === 3) fontSize = 13;
  //   doc.setFontSize(fontSize);
  //   doc.setFont('Helvetica', 'bold');
  //   doc.text(text, margin, yPosition);
  //   yPosition += lineHeight * 2;
  // };
  // const renderParagraph = (text: string): void => {
  //   doc.setFontSize(10);
  //   doc.setFont('Helvetica', 'normal');
  //   doc.text(text, margin, yPosition, {
  //     maxWidth: doc.internal.pageSize.getWidth() - margin * 2,
  //   });
  //   yPosition += lineHeight * 1.5;
  // };
  // const renderList = (node: Element): void => {
  //   const items = Array.from(node.getElementsByTagName('li'));
  //   items.forEach((item) => {
  //     doc.setFontSize(10);
  //     doc.setFont('Helvetica', 'normal');
  //     doc.text(`- ${item.textContent || ''}`, margin, yPosition);
  //     yPosition += lineHeight * 1.5;
  //   });
  // };
  // const parser = new DOMParser();
  // const docElement = parser.parseFromString(htmlContent, 'text/html');
  // const bodyContent = docElement.body;
  // Array.from(bodyContent.childNodes).forEach((node) => {
  //   if (node.nodeName === 'H1') {
  //     renderHeading(node.textContent || '', 1);
  //   } else if (node.nodeName === 'H2') {
  //     renderHeading(node.textContent || '', 2);
  //   } else if (node.nodeName === 'H3') {
  //     renderHeading(node.textContent || '', 3);
  //   } else if (node.nodeName === 'P') {
  //     renderParagraph(node.textContent || '');
  //   } else if (node.nodeName === 'UL' || node.nodeName === 'OL') {
  //     renderList(node as Element);
  //   }
  //   if (yPosition >= doc.internal.pageSize.getHeight() - margin) {
  //     doc.addPage();
  //     yPosition = margin;
  //   }
  // });
  // doc.save('output.pdf');

  const htmlContent: string = marked(text);
  const pdfmakeContent = htmlToPdfmake(htmlContent);
  console.log(pdfmakeContent);
  const doc = new jsPDF('p', 'pt', 'a4');
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.html(htmlContent, {
    callback: (doc) => {
      doc.save('output.pdf');
    },
    x: 10,
    y: 10,
    width: 800,
    windowWidth: 1000,
  });
  // doc.text(htmlContent, 10, 10);
  // doc.save('out.pdf');
};
