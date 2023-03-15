import { app, PORT, initData } from "./app.js";

app.use("/liveSearchQuery", (req, res) => {
  const { queryType, queryValue } = req.body;
  let dataDisplay = [];

  try {
    initData.forEach((article) => {
      if (article[queryType].toLowerCase().includes(queryValue.toLowerCase())) {
        dataDisplay.push(article[queryType]);
      }
    });
  } catch (error) {
    return res.send(error);
  }

  console.log(dataDisplay);
  dataDisplay.length > 0 ? res.send(dataDisplay) : res.send("No Data");
});

app.get("/data", (req,res)=>{


  console.log("masuk")
  res.send(initData)
})


app.use("/", (req, res) => {
  res.send("HOME");
});
app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
