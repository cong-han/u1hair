import { getHello } from "../api/index.js";

export async function render() {
  const response = await fetch("../../data/vocab_result.json");
  const words = await response.json();

  const wordsByTopic = {};
  words.forEach((word) => {
    const topic = word.topic;
    if (!wordsByTopic[topic]) wordsByTopic[topic] = [];
    wordsByTopic[topic].push(word);
  });

  const topic_options = Object.keys(wordsByTopic);

  const options = topic_options
    .map((cat) => /* HTML */ `<option value="${cat}">${cat}</option>`)
    .join("");

  window.__wordsByTopic = wordsByTopic;
  return /* HTML */ `<select id="topicSelect">
      ${options}
    </select>
    <div id="displayArea"></div>`;
  // return /* HTML */ `
  //   <h1>首页</h1>
  //   <p>这是一个手搓的原生 SPA，没有使用任何框架。</p>
  //   <button id="fetchBtn">调用模拟 API</button>
  //   <p id="apiResult"></p>
  //   ${wordlist()}
  // `;
}

export function afterRender() {
  const select = document.getElementById("topicSelect");
  const display = document.getElementById("displayArea");
  const wordsByTopic = window.__wordsByTopic;
  function showWords(topic) {
    if (!topic) {
      display.innerHTML = "";
      return;
    }
    const words = wordsByTopic[topic] || [];
    const words_line = words.map((p) => p.base_word).join(", ");
    display.innerHTML = `<h3>${topic}<br></h3><p>${words_line}</p>`;
  }
  select.addEventListener("change", () => {
    showWords(select.value);
  });
  // const btn = document.getElementById("fetchBtn");
  // const result = document.getElementById("apiResult");
  // if (btn) {
  //   btn.addEventListener("click", async () => {
  //     const data = await getHello();
  //     result.textContent = data.message;
  //   });
  // }
}
