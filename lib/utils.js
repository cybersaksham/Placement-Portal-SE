const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const downloadPdf = (pdf, fileName) => {
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
};

export { capitalize, downloadPdf };