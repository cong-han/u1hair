function style() {
  return /* HTML */ `<style>
    p {
      font-size: 20px;
      background-color: red;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  </style>`;
}

function card() {
  return /* HTML */ `<div>
    <img
      src="https://placehold.co/100x100"
      width="100"
      height="100"
      alt="grey"
    />
  </div>`;
}

export function render() {
  const n = Math.floor(Math.random() * 100) + 1;
  const cards = Array.from({ length: n }, () => card()).join("");
  return /* HTML */ `
    ${style()}
    <div class="cards">${cards}</div>
  `;
}

export function afterRender() {
  // 暂无交互
}
