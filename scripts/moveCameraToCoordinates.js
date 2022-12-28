//Initialize API TOKEN
Cesium.Ion.defaultAccessToken = "USE YOUR OWN";

//Image for SweetAlert PopUp
const INPUT_IMAGE_URL = "./images/telescope.png";

//Limits for origins
const LONGITUDE_MIN = -180;
const LONGITUDE_MAX = 180;
const LATTITUDE_MIN = -90;
const LATTITUDE_MAX = 90;


//Name of div class for Cesium
const CESIUM_CONTAINER_DIVNAME = 'cesiumContainer';

/**Turns string win N spaces into array*/
function parseResultLine(line) {
  console.log(`Got line: ${line}`)
  let result = line.replace(/[^0-9.-]/g, ' ').trim().split(/\s+/);
  return result;
}

/**Validates parameters from PopUp window*/
function checkInputParams(inputLine) {
  let newInput = inputLine.replace(/[^0-9.-]/g, ' ');
  let resultArray = parseResultLine(newInput);
  if (resultArray.length != 3) {
    return `Requred 3 arguments! Got: ${resultArray.length} `;
  }
  const _longitude = resultArray[0];
  const _latitude = resultArray[1];
  const _height = resultArray[2];

  if (isNaN(_longitude) || isNaN(_latitude) || isNaN(_height)) {
    return "Input value should be numeric!";
  }

  if (_longitude < LONGITUDE_MIN || _longitude > LONGITUDE_MAX) {
    return "Longitude should be in range [-180; 180]";
  }

  if (_latitude < LATTITUDE_MIN || _latitude > LATTITUDE_MAX) {
    return "Latitude should be in range [-90; 90]";
  }
}

/**Moves camera to  origins we got from PopUp */
function processCesiumMap(originsArray){
    const longitude = originsArray[0];
    const latitude = originsArray[1];
    const height = originsArray[2];
    document.getElementById("blocker").remove();
    const viewer = new Cesium.Viewer(CESIUM_CONTAINER_DIVNAME, {
        terrainProvider: Cesium.createWorldTerrain()
    });    
    viewer.camera.flyTo({
       destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    });
}


(async () => {
  const { value: originsLine } = await Swal.fire({
    title: "Write here coordinates for the camera!",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    text: "Three values separated by space required: longitude, latitude and height",
    imageUrl: INPUT_IMAGE_URL,
    imageWidth: 200,
    imageHeight: 200,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) return "You need to write origins!";
      let checkedResult = checkInputParams(value);
      if (checkedResult) return checkedResult;
    },
  });
  if (originsLine) return originsLine;
})().then((result) => {
    const resultArray = parseResultLine(result).map(Number);
    console.log(resultArray)
    processCesiumMap(resultArray);
});
