//Token set up
const TOKEN = "USE YOUR OWN"
Cesium.Ion.defaultAccessToken = TOKEN;

//Image for SweetAlert PopUp
const LOAD_IMAGE_URL = "./images/browse_files.png";
const CESIUM_CONTAINER = "cesiumContainer";

var filesCoordinatesContainer = [];
var fileNames = [];

const POLYGON_POINTS_LIMIT = 100;



function chunkify(a, n, balanced) {
  if (a.length < n) return [a];
  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
}

/**Add area based on array of points*/
function addMapArea(viewer, areaData) {
  let splitedData = chunkify(areaData, POLYGON_POINTS_LIMIT, true)
  var resultArea; 
  let currentColor = Cesium.Color.fromRandom();
  for (let i = 0; i < splitedData.length; i++){
    let currentPart = splitedData[i].flat(splitedData[i].length);
    resultArea = viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(currentPart),
          material: currentColor,
          outline: true,
          outlineWidth: 1000000.0, 
          outlineColor: currentColor,
        },
      });
  }
  viewer.zoomTo(resultArea);
}

/**Gets data from single text file */
function readFileAsText(file) {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();
    fr.onload = function () {
      resolve(fr.result);
    };
    fr.onerror = function () {
      reject(fr);
    };
    fr.readAsText(file);
  });
}

/**Builds custom alert with SweetAlert */
function buildCustomErrorMessage(title, text) {
  const wrapper = document.createElement("div");
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    content: wrapper,
  });
}

/**Builds Cesium map with created fields */
function showCesiumMap() {
  document.getElementById("blocker").remove();
  const viewer = new Cesium.Viewer(CESIUM_CONTAINER, {
    terrainProvider: Cesium.createWorldTerrain(),
  });
  for (let i = 0; i < filesCoordinatesContainer.length; i++) {
    console.log(`Processing file: ${fileNames[i]} `);
    try {
      addMapArea(
        viewer,
        filesCoordinatesContainer[i]);
    } catch {
      let errorMessage = `Unable to read data from file ${fileNames[i]}. Check, if data inside the file is correct`;
      buildCustomErrorMessage("Error!", errorMessage);
    }
  }
}

/**Gets data from ALL the text files the user uploaded */
function readTextData(files) {
  let readers = [];
  for (let i = 0; i < files.length; i++) {
    fileNames.push(files[i].name);
    readers.push(readFileAsText(files[i]));
  }
  return Promise.all(readers).then((values) => {
    for (let i = 0; i < values.length; i++) {
      var preparedFileData = [];
      var currentFile = values[i].split("\n").slice(1);
      for (let j = 0; j < currentFile.length; j++) {
        let currentRow = currentFile[j];
        currentRow = currentRow.replace("\t", " ");
        preparedFileData.push(
          currentRow
            .replace(/[^0-9.-]/g, " ")
            .trim()
            .split(/\s+/)
            .map(Number)
        );
      }
      filesCoordinatesContainer.push(preparedFileData);
    }
  });
}

/**The main function. What a nightmare! */
function main() {
  (async () => {
    const { value: fileArray } = await Swal.fire({
      title: "Attach files with coordinates",
      input: "file",
      inputAttributes: {
        accept: ".csv, .txt, .dat, .data",
        multiple: "multiple",
      },
      text: "Upload here text files containing information about points in format: header and after longitude, latitude, height",
      imageUrl: LOAD_IMAGE_URL,
      imageWidth: 200,
      imageHeight: 200,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value || value.length == 0) return "You must attach data file(s)!";
      },
    });
    if (fileArray) return fileArray;
  })().then((result) => {
    let preparedData = readTextData(result);
    preparedData.then(() => {
      showCesiumMap();
    });
  });
}

main();
