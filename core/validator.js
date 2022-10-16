let keyDataArray = [];

const getLocalFile = (localFile) => {
  let reader = new FileReader();
  reader.readAsText(localFile.files[0]);

  reader.onloadstart = () => {
    alert("Reader lifecycle - Started!");
  };
  reader.onloadend = () => {
    toJsonArray(reader.result);
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

let valid = [];

const validate = () => {
  keyDataArray.map((item) => {
    let count = 0;
    for (let m of item.password) {
      if (item.char.includes(m)) {
        count++;
      }
    }
    if (count >= item.range[0] && count <= item.range[1]) {
      valid.push(item);
    }
  });
  console.log(valid);
};
