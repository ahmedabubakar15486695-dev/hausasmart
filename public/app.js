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

  if (!input || !chatBox) return;

  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `
    <div class="user-message">${escapeHTML(message)}</div>
  `;

  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "bot";
  thinking.id = "thinking";
  thinking.textContent = "Ana tunani... ⏳";

  chatBox.appendChild(thinking);
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

    if (thinking) {
      thinking.remove();
    }

    if (data.success) {
      chatBox.innerHTML += `
        <div class="bot">
          ${escapeHTML(data.answer)}
        </div>
      `;
    } else {
      chatBox.innerHTML += `
        <div class="bot">
          ⚠️ ${escapeHTML(
            data.error || "An samu matsala wajen haɗawa da AI."
          )}
        </div>
      `;
    }

  } catch (error) {
    if (thinking) {
      thinking.remove();
    }

    chatBox.innerHTML += `
      <div class="bot">
        ⚠️ AI bai dawo da amsa ba. Da fatan sake gwadawa.
      </div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


// =========================
// PROFESSIONAL CV BUILDER
// =========================

function generateCV() {
  const name = getValue("cvName");
  const phone = getValue("cvPhone");
  const email = getValue("cvEmail");
  const address = getValue("cvAddress");
  const job = getValue("cvJob");

  const experience = getValue("cvExperience");
  const education = getValue("cvEducation");
  const skills = getValue("cvSkills");
  const certificates = getValue("cvCertificates");
  const references = getValue("cvReferences");

  if (!name) {
    alert("Da fatan saka cikakken suna.");
    return;
  }

  const preview = document.getElementById("cvPreview");

  if (!preview) return;

  const finalJob = job || "Heavy-Duty Truck Driver";

const professionalSummary =
  "Experienced and responsible Heavy-Duty Truck Driver with practical experience in long-distance transportation, vehicle inspection and road safety. Committed to safe driving, punctuality, proper vehicle care and professional conduct.";

const careerObjective =
  "To obtain a Heavy-Duty Truck Driver position where I can apply my driving experience, road safety knowledge and vehicle-handling skills to support the organization and deliver reliable transportation services.";

  let skillsHTML = "";

  if (skills) {
    skillsHTML = skills
      .split(",")
      .map(skill => skill.trim())
      .filter(skill => skill)
      .map(skill => `<li>${escapeHTML(skill)}</li>`)
      .join("");
  }

  if (!skillsHTML) {
    skillsHTML = `
      <li>Heavy-Duty Truck Driving</li>
      <li>Defensive Driving</li>
      <li>Vehicle Inspection</li>
      <li>Road Safety</li>
      <li>Basic Vehicle Maintenance</li>
      <li>Communication</li>
      <li>Teamwork</li>
    `;
  }

  preview.innerHTML = `
    <div class="cv-document">

      <h2>${escapeHTML(name)}</h2>

      <p>
        <strong>${escapeHTML(finalJob)}</strong>
      </p>

      <p>
        ${escapeHTML(phone)}
        ${phone && email ? " • " : ""}
        ${escapeHTML(email)}
        ${
          address
            ? `<br>${escapeHTML(address)}`
            : ""
        }
      </p>

      <hr>

      <h3>Professional Summary</h3>

      <p>
       ${escapeHTML(professionalSummary)}
      </p>

      <h3>Career Objective</h3>

      <p>
  ${escapeHTML(careerObjective)}
</p>

     <h3>Work Experience</h3>

<p> 
  ${
    experience
      ? formatText(experience)
      : "Experienced in safe vehicle operation, long-distance transportation, vehicle inspection and responsible delivery of goods while maintaining road safety and professional conduct."
  }
</p>  
    
      }

      ${
        education
          ? `
            <h3>Education</h3>
            <p>${formatText(education)}</p>
          `
          : ""
      }

      <h3>Key Skills</h3>

      <ul>
        ${skillsHTML}
      </ul>

      ${
        certificates
          ? `
            <h3>Licences & Certificates</h3>
            <p>${formatText(certificates)}</p>
          `
          : ""
      }

      <h3>References</h3>
      
      <p>
        ${
          references
            ? formatText(references)
            : "References available upon request."
        }
      </p>

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

  if (!result) return;

  const ideas = {
    caption:
      "Rayuwa tana buƙatar haƙuri, aiki tuƙuru da dogaro ga Allah. 💚",

    hook:
      "Kada ka wuce wannan bidiyon kafin ka san wannan sirrin...",

    hashtags:
      "#HausaSmart #Hausa #Nigeria #TikTokNigeria #LearnHausa",

    tiktok:
      "Koyar da kalmar Hausa guda 5 a rana.",

    facebook:
      "Assalamu alaikum! HausaSmart na taimaka maka da Hausa, CV, jobs da translation.",

    youtube:
      "Yadda HausaSmart Zai Taimaka Maka Neman Aiki"
  };

  result.innerHTML = `
    <h3>Result</h3>
    <p>${escapeHTML(
      ideas[type] || "Babu wannan tool ɗin yanzu."
    )}</p>
  `;
}


// =========================
// TRANSLATOR
// =========================

async function translateText() {
  const input = document.getElementById("translateInput");
  const result = document.getElementById("translateResult");

  if (!input || !result) return;

  const text = input.value.trim();

  if (!text) {
    result.innerHTML =
      "<p>Rubuta abin da kake son fassarawa.</p>";
    return;
  }

  result.innerHTML =
    "<p>Ana fassara... 🌐</p>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:
          "Translate this text between Hausa and English. If it is Hausa, translate it to clear English. If it is English, translate it to natural Hausa. Return only the translation:\n\n" +
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
        <p>
          ⚠️ ${escapeHTML(
            data.error || "An samu matsala."
          )}
        </p>
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

  if (!input || !result) return;

  const message = input.value.trim();

  if (!message) {
    result.innerHTML =
      "<p>Manna saƙon da kake son bincikawa.</p>";
    return;
  }

  result.innerHTML =
    "<p>Ana bincikawa... 🔎</p>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:
          "Analyze this message for possible scam warning signs. Explain clearly in simple Hausa. Do not claim certainty if there is not enough evidence:\n\n" +
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
        <p>
          ⚠️ ${escapeHTML(
            data.error || "An samu matsala."
          )}
        </p>
      `;
    }

  } catch (error) {
    result.innerHTML =
      "<p>⚠️ An samu matsala wajen binciken saƙon.</p>";
  }
}


// =========================
// HELPERS
// =========================

function getValue(id) {
  const element = document.getElementById(id);

  if (!element) return "";

  return element.value.trim();
}


function formatText(value) {
  return escapeHTML(value)
    .replace(/\n/g, "<br>");
}


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

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input =
      document.getElementById("aiInput");

    if (input) {
      input.addEventListener(
        "keydown",
        event => {
          if (event.key === "Enter") {
            sendAI();
          }
        }
      );
    }
  }
);
