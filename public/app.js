function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// =========================
// HAUSASMART AI
// =========================

async function sendAI() {
  const input = document.getElementById("aiInput");
  const chatBox = document.getElementById("chatBox");

  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `
    <div class="user-message">${escapeHTML(message)}</div>
  `;

  input.value = "";

  chatBox.innerHTML += `
    <div class="bot" id="thinking">Ana tunani... ⏳</div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    const thinking = document.getElementById("thinking");

    if (thinking) {
      thinking.remove();
    }

    if (data.success) {
      chatBox.innerHTML += `
        <div class="bot">${escapeHTML(data.answer)}</div>
      `;
    } else {
      chatBox.innerHTML += `
        <div class="bot">⚠️ ${escapeHTML(data.error || "An samu matsala.")}</div>
      `;
    }

  } catch (error) {
    const thinking = document.getElementById("thinking");

    if (thinking) {
      thinking.remove();
    }

    chatBox.innerHTML += `
      <div class="bot">
        ⚠️ Ba a iya haɗawa da AI yanzu ba.
      </div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


// =========================
// CV BUILDER
// =========================

function generateCV() {
  const name = document.getElementById("cvName").value.trim();
  const phone = document.getElementById("cvPhone").value.trim();
  const email = document.getElementById("cvEmail").value.trim();
  const address = document.getElementById("cvAddress").value.trim();
  const job = document.getElementById("cvJob").value.trim();

  if (!name) {
    alert("Da fatan saka cikakken suna.");
    return;
  }

  const preview = document.getElementById("cvPreview");

  preview.innerHTML = `
    <h2>${escapeHTML(name)}</h2>

    <p>
      ${escapeHTML(phone)}
      ${phone && email ? " • " : ""}
      ${escapeHTML(email)}
    </p>

    <p>${escapeHTML(address)}</p>

    <hr>

    <h3>Career Objective</h3>
    <p>
      Seeking a ${escapeHTML(job || "suitable position")}
      where I can use my skills and contribute positively to the organization.
    </p>

    <h3>Skills</h3>
    <ul>
      <li>Communication</li>
      <li>Time Management</li>
      <li>Computer Skills</li>
      <li>Teamwork</li>
    </ul>

    <br>

    <button onclick="window.print()">Print / Save CV</button>
  `;
}


// =========================
// SOCIAL MEDIA TOOLS
// =========================

function socialTool(type) {
  const result = document.getElementById("socialResult");

  const ideas = {
    caption: `
      <h3>Caption Generator</h3>
      <p>✨ Sabuwar rana, sabuwar dama. Ka ci gaba da ƙoƙari.</p>
    `,

    hook: `
      <h3>Hook Generator</h3>
      <p>🔥 “Kada ka wuce kafin ka ga abin da zan nuna maka...”</p>
    `,

    hashtags: `
      <h3>Hashtag Ideas</h3>
      <p>#HausaSmart #Hausa #Nigeria #TikTokNigeria #LearnHausa</p>
    `,

    tiktok: `
      <h3>TikTok Ideas</h3>
      <ol>
        <li>Darasin Turanci cikin Hausa</li>
        <li>HausaSmart AI tips</li>
        <li>Abubuwan da matasa za su koya</li>
        <li>Short Hausa motivation</li>
        <li>Tech tips cikin Hausa</li>
      </ol>
    `,

    facebook: `
      <h3>Facebook Post</h3>
      <p>
        Kana neman sabuwar hanya ta koyon abubuwa cikin Hausa?
        HausaSmart na taimaka maka ka koyi, ka rubuta,
        ka fassara kuma ka shirya abubuwa cikin sauƙi.
      </p>
    `,

    youtube: `
      <h3>YouTube Titles</h3>
      <ol>
        <li>Yadda AI zai taimaka maka cikin Hausa</li>
        <li>Abubuwa 5 da za ka iya yi da AI</li>
        <li>HausaSmart: Sabuwar hanyar koyon fasaha</li>
      </ol>
    `
  };

  result.innerHTML = ideas[type] || "<p>Babu result.</p>";
}


// =========================
// TRANSLATOR
// =========================

async function translateText() {
  const input = document.getElementById("translateInput");
  const result = document.getElementById("translateResult");

  const text = input.value.trim();

  if (!text) {
    result.innerHTML = "<p>Rubuta abin da kake son fassarawa.</p>";
    return;
  }

  result.innerHTML = "<p>Ana fassara... ⏳</p>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:
          "Translate this text accurately. If it is Hausa, translate to English. If it is English, translate to Hausa. Give only the translation:\n\n" +
          text
      })
    });

    const data = await response.json();

    if (data.success) {
      result.innerHTML = `
        <h3>Fassara</h3>
        <p>${escapeHTML(data.answer)}</p>
      `;
    } else {
      result.innerHTML = `<p>⚠️ ${escapeHTML(data.error)}</p>`;
    }

  } catch (error) {
    result.innerHTML =
      "<p>⚠️ An samu matsala wajen fassara.</p>";
  }
}


// =========================
// SCAM CHECKER
// =========================

async function checkScam() {
  const input = document.getElementById("scamInput");
  const result = document.getElementById("scamResult");

  const message = input.value.trim();

  if (!message) {
    result.innerHTML = "<p>Manna saƙon da kake son bincikawa.</p>";
    return;
  }

  result.innerHTML = "<p>Ana bincikawa... 🔎</p>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:
          "Analyze this message for possible scam or fraud warning signs. Explain the warning signs clearly in simple Hausa. Do not claim certainty if there is not enough evidence:\n\n" +
          message
      })
    });

    const data = await response.json();

    if (data.success) {
      result.innerHTML = `
        <h3>🔎 Sakamakon Bincike</h3>
        <p>${escapeHTML(data.answer)}</p>
      `;
    } else {
      result.innerHTML = `<p>⚠️ ${escapeHTML(data.error)}</p>`;
    }

  } catch (error) {
    result.innerHTML =
      "<p>⚠️ An samu matsala wajen binciken saƙon.</p>";
  }
}


// =========================
// SECURITY
// =========================

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// =========================
// ENTER KEY FOR AI
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("aiInput");

  if (input) {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        sendAI();
      }
    });
  }
});
