const outputElem = document.getElementById("result");
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
      console.log(`Please enter a correct data.\n${error}`);
      alert(
        `Make sure the file format is .txt and you can \nalso check the sequence of data in the file.\nExample of a valid string:\nx 2-4: example`
      );
    }
  };
  reader.onerror = () => {
    console.log("Reader error : " + reader.error);
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
      valid.push(item);
    }
  });
  renderResult(valid);
};

const renderResult = (item) => {
  console.log(item);
  outputElem.innerHTML += `<span><b>Total:</b> ${item.length} passwords!</span><br/>`;
  outputElem.innerHTML += "<span><b>Successful:<b/></span><br/>";

  for (let i = 0; i < item.length; i++) {
    const pass = item[i].password;
    outputElem.innerHTML += `<li>${item[i].char} ${
      item[i].range[0] + "-" + item[i].range[1]
    }: ${pass}</li>`;
  }
  outputElem.innerHTML += `<br/><hr/><br/>`;
};
