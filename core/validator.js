const outputElem = document.getElementById("result");
let outputLine = 0;
let keyDataArray = [];

const getLocalFile = (localFile) => {
  let reader = new FileReader();
  reader.readAsText(localFile.files[0]);

  reader.onloadstart = () => {
    console.debug("Reader lifecycle - Started!");
    outputElem.innerHTML = "";
  };
  reader.onloadend = () => {
    try {
      toJsonArray(reader.result);
    } catch (error) {
      console.log("Please enter a correct data.\n" + error);
      alert(`Make sure the file format is .txt and you can
also check the sequence of data in the file.

Example of a valid string:
x 2-4: example`);
    }
  };
  reader.onerror = () => {
    console.log("Reader error : ", reader.error);
  };
};

const toJsonArray = (data) => {
  data.split(/\r\n|\n/).map((line) => {
    let conditionPasword = line.split(/ |: /);
    keyDataArray.push({
      char: conditionPasword[0],
      range: conditionPasword[1].split("-"),
      password: conditionPasword[2],
    });
  });

  console.log(keyDataArray);
};

const validate = () => {
  let valid = [];
  keyDataArray.map((item) => {
    let count = 0;
    for (let m of item.password) {
      if (item.char.includes(m)) {
        count++;
      }
    }
    if (count >= item.range[0] && count <= item.range[1]) {
      valid.push(item.password);
    }
  });

  let result = `Valid - ${valid.length};      Wrong - ${
    keyDataArray.length - valid.length
  };\n`;

  outputElem.innerHTML +=
    result +
    `<br />-------------------------------------------------<br /> Passwords : ${valid} <br />`;
  console.log(result + `Passwords : ${valid}`);
};
