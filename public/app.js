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

  const objective =
    document.getElementById("cvObjective").value.trim();

  const education =
    document.getElementById("cvEducation").value.trim();

  const experience =
    document.getElementById("cvExperience").value.trim();

  const skills =
    document.getElementById("cvSkills").value.trim();

  const certificates =
    document.getElementById("cvCertificates").value.trim();

  if (!name) {
    alert("Da fatan saka cikakken suna.");
    return;
  }

  const preview = document.getElementById("cvPreview");

  const skillsList = skills
    ? skills
        .split(",")
        .map(skill => `<li>${escapeHTML(skill.trim())}</li>`)
        .join("")
    : `
        <li>Communication</li>
        <li>Time Management</li>
        <li>Computer Skills</li>
        <li>Teamwork</li>
      `;

  preview.innerHTML = `
    <div class="cv-document">

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
        ${
          escapeHTML(
            objective ||
            `Seeking a ${job || "suitable position"} where I can use my skills and contribute positively to the organization.`
          )
        }
      </p>

      ${
        education
          ? `
            <h3>Education</h3>
            <p>${formatText(education)}</p>
          `
          : ""
      }

      ${
        experience
          ? `
            <h3>Work Experience</h3>
            <p>${formatText(experience)}</p>
          `
          : ""
      }

      <h3>Skills</h3>
      <ul>
        ${skillsList}
      </ul>

      ${
        certificates
          ? `
            <h3>Certificates</h3>
            <p>${formatText(certificates)}</p>
          `
          : ""
      }

    </div>
  `;

  preview.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// =========================
// SOCIAL MEDIA TOOLS
// =========================

function socialTool(type) {
  const result = document.getElementById("socialResult");

  const ideas = {
    caption: `
      <h3>✍️ Caption Generator</h3>
      <p>Rayuwa tana buƙatar haƙuri, aiki tuƙuru da kuma dogaro ga Allah. 💚</p>
    `,

    hook: `
      <h3>🔥 Hook Generator</h3>
      <p>“Kada ka wuce wannan bidiyon kafin ka san wannan sirrin...”</p>
    `,

    hashtags: `
      <h3>#️⃣ Hashtag Ideas</h3>
      <p>#HausaSmart #Hausa #Nigeria #TikTokNigeria #LearnHausa #Motivation</p>
    `,

    tiktok: `
      <h3>📱 TikTok Ideas</h3>
      <p>1. Koyar da kalmar Hausa guda 5 a rana.</p>
      <p>2. Fassarar Hausa zuwa English.</p>
      <p>3. Tips na neman aiki.</p>
    `,

    facebook: `
      <h3>📘 Facebook Post</h3>
      <p>Assalamu alaikum! 🙌 HausaSmart na taimaka maka wajen Hausa, CV, jobs, translation da sauran abubuwa.</p>
    `,

    youtube: `
      <h3>▶️ YouTube Titles</h3>
      <p>“Yadda HausaSmart Zai Taimaka Maka Neman Aiki a 2026”</p>
    `
  };

  result.innerHTML =
    ideas[type] ||
    "<p>Babu wannan tool ɗin yanzu.</p>";
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

  result.innerHTML = "<p>Ana fassara... 🌐</p>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:
          "Translate this text between Hausa and English. If it is Hausa, translate to clear English. If it is English, translate to natural Hausa. Return only the translation:\n\n" +
          text
      })
    });

    const data = await response.json();

    if (data.success) {
      result.innerHTML = `
        <h3>🌐 Fassara</h3>
        <p>${escapeHTML(data.answer)}</p>
      `;
    } else {
      result.innerHTML = `
        <p>⚠️ ${escapeHTML(data.error || "An samu matsala.")}</p>
      `;
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
    result.innerHTML =
      "<p>Manna saƙon da kake son bincikawa.</p>";
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
      result.innerHTML = `
        <p>⚠️ ${escapeHTML(data.error || "An samu matsala.")}</p>
      `;
    }

  } catch (error) {
    result.innerHTML =
      "<p>⚠️ An samu matsala wajen binciken saƙon.</p>";
  }
}


// =========================
// TEXT FORMAT
// =========================

function formatText(value) {
  return escapeHTML(value)
    .replace(/\n/g, "<br>");
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
