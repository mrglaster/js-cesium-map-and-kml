function downloadBlob(filename, blob) { 
  // Save KML file
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}


Cesium.exportKml({
  entities: viewer.entities,
  kmz: true,
})
.then(function (result) { // returns kmz file
  downloadBlob("test_rect.kml", result.kmz); 
});
