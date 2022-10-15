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
      range: conditionPasword[1],
      password: conditionPasword[2],
    });
  });
};

const validate = () => {
  keyDataArray.map((item) => {
    console.log(item);
  });
};
