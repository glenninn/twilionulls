const fs = require("fs");
const readline = require("readline");
const { pathToFileURL } = require("url");


const src = "./jnj.json";
const oname= "./nsq.json";
const fname = "./one.json";

let first = true;

function processLine(line) {
    let rec = null;
    let message= null;
    let msg2 = [];
    try {
        rec = JSON.parse(line);
        const resultstr = rec.result["_raw"]; // ["_raw"].message;
        const result = JSON.parse(resultstr);
         message = result.message;
        message.hospitalName = " *** ";
        
    } catch(e) {
        console.log(`Error parsing line: ${e}`)
        process.exit();
    }
    const msgStr =  JSON.stringify(message,null,1);
     msg2 = msgStr.split('\n').map( L => L.trim() );
    console.log(`Line: ${msg2.length}`)
    process.exit()
}



async function byLine() {
    const fileStream = fs.createReadStream(src);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    let histo = [];

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      histo.push( processLine(line) );
    }



  }
  const ClrEOL = `\u001b[2K`

  console.log(ClrEOL)
  byLine();