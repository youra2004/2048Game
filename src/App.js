import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

function App() {
  const [render, setRender] = useState(false);
  let [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  document.onkeypress = (e) => {
    console.log(e);
  };

  let totalScore = 0;

  const initialize = () => {
    let newGrid = cloneDeep(data);

    addNumber(newGrid);
    console.log(newGrid);
    addNumber(newGrid);
    console.log(newGrid);

    setData(newGrid);
  };

  document.onkeyup = (e) => {
    if (e.key === "ArrowLeft") {
      swipeLeft();
    } else if (e.key === "ArrowRight") {
      swipeRight();
    } else if (e.key === "ArrowUp") {
      swipeUp();
    } else if (e.key === "ArrowDown") {
      swipeDown();
    }
  };

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;

    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);

      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const swipeLeft = (e) => {
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (data[i][b] === data[i][b + 1] && data[i][b] !== 0) {
          data[i][b] = data[i][b] * 2;
          data[i][b + 1] = 0;
        } else if (
          data[i][b] === data[i][b + 2] &&
          data[i][b] !== 0 &&
          data[i][b + 1] === 0
        ) {
          data[i][b] = data[i][b] * 2;
          data[i][b + 2] = 0;
        } else if (
          data[i][b] === data[i][b + 3] &&
          data[i][b] !== 0 &&
          data[i][b + 1] === 0 &&
          data[i][b + 2] === 0
        ) {
          data[i][b] = data[i][b] * 2;
          data[i][b + 3] = 0;
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (data[i][b] === 0 && data[i][b + 1]) {
          data[i][b] = data[i][b + 1];
          data[i][b + 1] = 0;
          if (data[i][b - 1] === 0 && data[i][b]) {
            data[i][b - 1] = data[i][b];
            data[i][b] = 0;
            if (data[i][b - 2] === 0 && data[i][b - 1]) {
              data[i][b - 2] = data[i][b - 1];
              data[i][b - 1] = 0;
            }
          }
        }
      }
    }
    console.log(data);
    setRender(!render);
    initialize();
  };

  const swipeRight = (e) => {
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (data[i][b] === data[i][b - 1] && data[i][b] !== 0) {
          data[i][b] = data[i][b] * 2;
          data[i][b - 1] = 0;
        } else if (
          data[i][b] === data[i][b - 2] &&
          data[i][b] !== 0 &&
          data[i][b - 1] === 0
        ) {
          data[i][b] = data[i][b] * 2;
          data[i][b - 2] = 0;
        } else if (
          data[i][b] === data[i][b - 3] &&
          data[i][b] !== 0 &&
          data[i][b - 1] === 0 &&
          data[i][b - 2] === 0
        ) {
          data[i][b] = data[i][b] * 2;
          data[i][b - 3] = 0;
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (data[i][b] === 0 && data[i][b - 1]) {
          data[i][b] = data[i][b - 1];
          data[i][b - 1] = 0;
          if (data[i][b + 1] === 0 && data[i][b]) {
            data[i][b + 1] = data[i][b];
            data[i][b] = 0;
            if (data[i][b + 2] === 0 && data[i][b + 1]) {
              data[i][b + 2] = data[i][b + 1];
              data[i][b + 1] = 0;
            }
          }
        }
      }
    }
    console.log(data);
    setRender(!render);
    initialize();
  };

  const swipeUp = (e) => {
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (i > 0) {
          if (data[i][b] === data[i - 1][b] && data[i][b] !== 0) {
            data[i][b] = data[i][b] * 2;
            data[i - 1][b] = 0;
          }
        } else if (i > 1) {
          if (
            data[i][b] === data[i - 2][b] &&
            data[i][b] !== 0 &&
            data[i - 1][b] === 0
          ) {
            data[i][b] = data[i][b] * 2;
            data[i - 2][b] = 0;
          }
        } else if (i > 2) {
          if (
            data[i][b] === data[i - 3][b] &&
            data[i][b] !== 0 &&
            data[i - 1][b] === 0 &&
            data[i - 2][b] === 0
          ) {
            data[i][b] = data[i][b] * 2;
            data[i - 3][b] = 0;
          }
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (i !== 3) {
          if (data[i][b] === 0 && data[i + 1][b]) {
            data[i][b] = data[i + 1][b];
            data[i + 1][b] = 0;
            if (i > 0) {
              if (data[i - 1][b] === 0 && data[i][b]) {
                data[i - 1][b] = data[i][b];
                data[i][b] = 0;
                if (i > 1) {
                  if (data[i - 2][b] === 0 && data[i - 1][b]) {
                    data[i - 2][b] = data[i - 1][b];
                    data[i - 1][b] = 0;
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(data);
    setRender(!render);
    initialize();
  };
  const swipeDown = (e) => {
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (i !== 3) {
          if (data[i][b] === data[i + 1][b] && data[i][b] !== 0) {
            data[i][b] = data[i][b] * 2;
            data[i + 1][b] = 0;
          }
        } else if (i < 2) {
          if (
            data[i][b] === data[i + 2][b] &&
            data[i][b] !== 0 &&
            data[i + 1][b] === 0
          ) {
            data[i][b] = data[i][b] * 2;
            data[i + 2][b] = 0;
          }
        } else if (i < 1) {
          if (
            data[i][b] === data[i + 3][b] &&
            data[i][b] !== 0 &&
            data[i + 1][b] === 0 &&
            data[i + 2][b] === 0
          ) {
            data[i][b] = data[i][b] * 2;
            data[i + 3][b] = 0;
          }
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let b = 0; b < 4; b++) {
        if (i > 0) {
          if (data[i][b] === 0 && data[i - 1][b]) {
            data[i][b] = data[i - 1][b];
            data[i - 1][b] = 0;
            if (i !== 3) {
              if (data[i + 1][b] === 0 && data[i][b]) {
                data[i + 1][b] = data[i][b];
                data[i][b] = 0;
                if (i !== 2) {
                  if (data[i + 2][b] === 0 && data[i + 1][b]) {
                    data[i + 2][b] = data[i + 1][b];
                    data[i + 1][b] = 0;
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(data);
    setRender(!render);
    initialize();
  };
  let fullGrid = 0;
  for (let i = 0; i < 4; i++) {
    for (let b = 0; b < 4; b++) {
      if (data[i][b] !== 0) {
        fullGrid++;
      }
    }
  }
  const setTotalScore = () => {
    if (
      Math.max(...data[0]) > Math.max(...data[1]) &&
      Math.max(...data[0]) > totalScore
    ) {
      totalScore = Math.max(...data[0]);
    }
    if (
      Math.max(...data[1]) > Math.max(...data[2]) &&
      Math.max(...data[1]) > totalScore
    ) {
      totalScore = Math.max(...data[1]);
    }
    if (
      Math.max(...data[2]) > Math.max(...data[3]) &&
      Math.max(...data[2]) > totalScore
    ) {
      totalScore = Math.max(...data[2]);
    }
    if (
      Math.max(...data[3]) > Math.max(...data[0]) &&
      Math.max(...data[3]) > totalScore
    ) {
      totalScore = Math.max(...data[3]);
    }
    if (totalScore) console.log(totalScore);
  };

  setTotalScore();
  const reseatGame = () => {
    data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    initialize();
  };
  if (totalScore === 2048) {
    alert("win");
    reseatGame();
  }
  if (fullGrid === 16) {
    alert("game over");
    reseatGame();
  }
  return (
    <div>
      <div
        style={{
          width: "max-content",
          margin: "auto",
          padding: 5,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        {totalScore}
      </div>
      <div
        style={{
          background: "#AD9D8F",
          width: "max-content",
          margin: "auto",
          padding: 5,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        {data.map((row, oneIndex) => {
          return (
            <div style={{ display: "flex" }} key={oneIndex}>
              {row.map((digit, index) => (
                <Block num={digit} key={index} />
              ))}
            </div>
          );
        })}
        <button
          onClick={reseatGame}
          style={{
            background: "#AD9D8F",
            width: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          reseat game
        </button>
      </div>
    </div>
  );
}

const Block = ({ num, totalScore }) => {
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        color: "white",
        backgroundColor:
          num === 2
            ? "grey"
            : num === 4
            ? "TURQUOISE"
            : num === 8
            ? "BROWN"
            : num === 16
            ? "MAGENTA"
            : num === 32
            ? "YELLOW"
            : num === 64
            ? "CYAN"
            : num === 128
            ? "GREEN"
            : num === 256
            ? "ORANGE"
            : num === 512
            ? "LIME"
            : num === 1028
            ? "NAVY"
            : num === 2048
            ? "PINKY"
            : "white",
      }}
    >
      {num === 0 ? "" : num}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
};
export default App;
