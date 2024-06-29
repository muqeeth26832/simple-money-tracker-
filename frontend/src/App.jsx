import { useEffect, useState } from "react";
import "./App.css";
const url = import.meta.env.VITE_API_URL;

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, [getTransactions]);

  async function getTransactions() {
    const turl = url + "/transactions";
    const response = await fetch(turl);
    const json = await response.json();
    return json;
  }

  function addNewTransaction(e) {
    // this should take all the states(data) and send it to the backend usign API
    // e.preventDefault();

    e.preventDefault();
    const turl = url + "/transaction";
    console.log(turl);
    console.log("called to api");
    // always hide api urls in a .env file
    const price = name.split(" ")[0];
    fetch(turl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      // this is what Axios does better
      response.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log(description);
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  balance = balance.toFixed(2);

  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
const formattedBalance = (() => {
    const numericBalance = parseFloat(balance.split(".")[0]);
    if (numericBalance < 0) {
      return `-$${Math.abs(numericBalance)}`;
    } else {
      return `$${numericBalance}`;
    }
  })();

  return (
    <main>
      <h1>
        {formattedBalance}
        <span> {fraction} </span>
      </h1>
      <form onSubmit={(e) => addNewTransaction(e)}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="My expenses"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div
          className="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
          <input type="text" name="" id="" placeholder="description" />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      {/* transaction */}
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => {
            return (
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name} </div>
                  <div className="description">{transaction.description} </div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}{" "}
                  </div>
                  <div className="datetime">2024-6-18 18:09</div>
                </div>
              </div>
            );
          })}
      </div>
      {/* end of transactions */}
    </main>
  );
}

export default App;
