const LOAD_IMAGE_URL = "./images/browse_files.png";

const beginning = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>ИРНР_lines.kml</name>
	<open>1</open>
	<StyleMap id="msn_shaded_dot">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_shaded_dot</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_shaded_dot</styleUrl>
		</Pair>
	</StyleMap>
	<StyleMap id="msn_track">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_track</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_track</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="sn_Antenna_400_ico">
		<IconStyle>
			<scale>3</scale>
			<Icon>
			</Icon>
		</IconStyle>
	</Style>
	<StyleMap id="msn_AZT">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_AZT</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_AZT</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="sh_shaded_dot">
		<IconStyle>
			<scale>1.4</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/shaded_dot.png</href>
			</Icon>
		</IconStyle>
	</Style>
	<StyleMap id="msn_noicon">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_noicon</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_ylw-pushpin</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="default5">
		<IconStyle>
			<Icon>
			</Icon>
		</IconStyle>
	</Style>
	<Style id="sh_ylw-pushpin">
		<LineStyle>
			<color>9900ff00</color>
		</LineStyle>
	</Style>
	<Style id="sn_noicon">
		<IconStyle>
			<Icon>
			</Icon>
		</IconStyle>
		<LineStyle>
			<color>9900ff00</color>
		</LineStyle>
	</Style>
	<Style id="sn_shaded_dot">
		<IconStyle>
			<scale>1.2</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/shaded_dot.png</href>
			</Icon>
		</IconStyle>
	</Style>
	<Style id="sh_Antenna_400_ico">
		<IconStyle>
			<scale>3.54545</scale>
			<Icon>
				<href>Antenna_400_ico.png</href>
			</Icon>
		</IconStyle>
	</Style>
	<Style id="sn_AZT">
		<IconStyle>
			<scale>2</scale>
			<Icon>
				<href>D:/Shared/Datas/32263/KML/AZT.png</href>
			</Icon>
		</IconStyle>
		<ListStyle>
		</ListStyle>
	</Style>
	<Style id="sn_track">
		<IconStyle>
			<scale>2</scale>
			<Icon>
			</Icon>
			<hotSpot x="32" y="1" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<ListStyle>
		</ListStyle>
		<LineStyle>
			<color>9900ff00</color>
			<width>6</width>
		</LineStyle>
	</Style>
	<StyleMap id="msn_Antenna_400_ico">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_Antenna_400_ico</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_Antenna_400_ico</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="sh_AZT">
		<IconStyle>
			<scale>2.33333</scale>
			<Icon>
				<href>D:/Shared/Datas/32263/KML/AZT.png</href>
			</Icon>
		</IconStyle>
		<ListStyle>
		</ListStyle>
	</Style>
	<StyleMap id="multiTrack0">
		<Pair>
			<key>normal</key>
			<styleUrl>#multiTrack_n0</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#multiTrack_h0</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="multiTrack_h0">
		<IconStyle>
			<scale>1.2</scale>
			<Icon>
				<href>http://earth.google.com/images/kml-icons/track-directional/track-0.png</href>
			</Icon>
		</IconStyle>
		<LineStyle>
			<color>99ffac59</color>
			<width>8</width>
		</LineStyle>
	</Style>
	<StyleMap id="default">
		<Pair>
			<key>normal</key>
			<styleUrl>#default5</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#hl1</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="multiTrack_n0">
		<IconStyle>
			<Icon>
				<href>http://earth.google.com/images/kml-icons/track-directional/track-0.png</href>
			</Icon>
		</IconStyle>
		<LineStyle>
			<color>99ffac59</color>
			<width>6</width>
		</LineStyle>
	</Style>
	<Style id="sh_track">
		<IconStyle>
			<scale>2.33333</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/track.png</href>
			</Icon>
			<hotSpot x="32" y="32" xunits="pixels" yunits="pixels"/>
		</IconStyle>
		<ListStyle>
		</ListStyle>
		<LineStyle>
			<color>99ffaa55</color>
			<width>8</width>
		</LineStyle>
	</Style>
    <Folder><name>EH_max</name>
`

const end = `</Folder></Document></kml>`

const coords_beginning = `<Placemark>
<styleUrl>#msn_track</styleUrl>
<gx:Track>
    <altitudeMode>relativeToGround</altitudeMode>`

const coords_ending = `</gx:Track></Placemark>`

var filesCoordinatesContainer = [];
var fileNames = [];
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

/**The main function. */
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
            exportKml()
        });
    });
}

const POINTS_LIMIT = 1000
function exportKml() {
    let kml_result = beginning
    for (let i = 0; i < filesCoordinatesContainer.length; i++) {
        let coord_block = ''
        for (let j = 0; j < filesCoordinatesContainer[i].length; j++) {
            let coords = filesCoordinatesContainer[i][j]
            coord_block += `<gx:coord> ${coords[0]} ${coords[1]} ${coords[2]}</gx:coord>`
            if (j % POINTS_LIMIT === 0 || (j + 1) >= filesCoordinatesContainer[i].length) {
                kml_result += coords_beginning + coord_block + coords_ending
                coord_block = ''
            }
        }
    }
    kml_result += end
    downloadBlob('test.kml', new Blob([kml_result]))
}


/**
 * download kml file
 * @param {string} filename 
 * @param {Blob} blob 
*/
function downloadBlob(filename, blob) {
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

main()
