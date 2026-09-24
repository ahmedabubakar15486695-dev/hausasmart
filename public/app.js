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

chatBox.innerHTML += "<div class="user-message">${escapeHTML(message)}</div>";

input.value = "";

chatBox.innerHTML += "<div class="bot" id="thinking">Ana tunani... ⏳</div>";

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
    <div class="bot">
      ⚠️ ${escapeHTML(data.error || "An samu matsala.")}
    </div>
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
// PROFESSIONAL CV BUILDER
// =========================

function generateCV() {
const name = getValue("cvName");
const phone = getValue("cvPhone");
const email = getValue("cvEmail");
const address = getValue("cvAddress");
const job = getValue("cvJob");

const summary = getValue("cvSummary");
const objective = getValue("cvObjective");
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

// =========================
// JOB TITLE
// =========================

const finalJob =
job || "Driver / Heavy-Duty Truck Driver";

// =========================
// PROFESSIONAL SUMMARY
// =========================

let finalSummary = summary;

if (!finalSummary) {
finalSummary =
"Reliable and responsible ${finalJob} with a strong commitment to road safety, vehicle care, punctuality, and professional conduct. Able to handle demanding driving duties, follow safety procedures, and communicate effectively with team members.";
}

// =========================
// CAREER OBJECTIVE
// =========================

let finalObjective = objective;

if (!finalObjective) {

let article = "a";

if (/^[aeiou]/i.test(finalJob)) {
  article = "an";
}

finalObjective =
  `Seeking ${article} ${finalJob} position where I can use my driving skills, experience, and dedication to contribute positively to the organization while maintaining high standards of safety and professionalism.`;

}

// =========================
// SKILLS
// =========================

let skillsHTML = "";

if (skills) {

const skillsArray = skills
  .split(",")
  .map(skill => skill.trim())
  .filter(skill => skill.length > 0);

if (skillsArray.length > 0) {

  skillsHTML = skillsArray
    .map(skill => `
      <li>${escapeHTML(skill)}</li>
    `)
    .join("");
}

}

// Default professional driver skills

if (!skillsHTML) {

skillsHTML = `
  <li>Heavy-Duty Truck Driving</li>
  <li>Defensive Driving</li>
  <li>Road Safety Awareness</li>
  <li>Vehicle Inspection</li>
  <li>Basic Vehicle Maintenance</li>
  <li>Time Management</li>
  <li>Communication</li>
  <li>Teamwork</li>
`;

}

// =========================
// CV OUTPUT
// =========================

preview.innerHTML = `

<div class="cv-document">

  <header class="cv-header">

    <h2>
      ${escapeHTML(name)}
    </h2>

    <h3 class="cv-job-title">
      ${escapeHTML(finalJob)}
    </h3>

    <p class="cv-contact">

      ${phone ? escapeHTML(phone) : ""}

      ${
        phone && email
          ? " • "
          : ""
      }

      ${email ? escapeHTML(email) : ""}

      ${
        address
          ? `
            <br>
            ${escapeHTML(address)}
          `
          : ""
      }

    </p>

  </header>


  <hr>


  <section>

    <h3>
      Professional Summary
    </h3>

    <p>
      ${formatText(finalSummary)}
    </p>

  </section>


  <section>

    <h3>
      Career Objective
    </h3>

    <p>
      ${formatText(finalObjective)}
    </p>

  </section>


  ${
    experience
      ? `

        <section>

          <h3>
            Work Experience
          </h3>

          <p>
            ${formatText(experience)}
          </p>

        </section>

      `
      : ""
  }


  ${
    education
      ? `

        <section>

          <h3>
            Education
          </h3>

          <p>
            ${formatText(education)}
          </p>

        </section>

      `
      : ""
  }


  <section>

    <h3>
      Key Skills
    </h3>

    <ul>
      ${skillsHTML}
    </ul>

  </section>


  ${
    certificates
      ? `

        <section>

          <h3>
            Licences & Certificates
          </h3>

          <p>
            ${formatText(certificates)}
          </p>

        </section>

      `
      : ""
  }


  ${
    references
      ? `

        <section>

          <h3>
            References
          </h3>

          <p>
            ${formatText(references)}
          </p>

        </section>

      `
      : `

        <section>

          <h3>
            References
          </h3>

          <p>
            References available upon request.
          </p>

        </section>

      `
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

const result =
document.getElementById("socialResult");

if (!result) return;

const ideas = {

caption: `
  <h3>✍️ Caption Generator</h3>

  <p>
    Rayuwa tana buƙatar haƙuri,
    aiki tuƙuru da kuma dogaro ga Allah. 💚
  </p>
`,

hook: `
  <h3>🔥 Hook Generator</h3>

  <p>
    “Kada ka wuce wannan bidiyon
    kafin ka san wannan sirrin...”
  </p>
`,

hashtags: `
  <h3>#️⃣ Hashtag Ideas</h3>

  <p>
    #HausaSmart #Hausa #Nigeria
    #TikTokNigeria #LearnHausa #Motivation
  </p>
`,

tiktok: `
  <h3>📱 TikTok Ideas</h3>

  <p>
    1. Koyar da kalmar Hausa guda 5 a rana.
  </p>

  <p>
    2. Fassarar Hausa zuwa English.
  </p>

  <p>
    3. Tips na neman aiki.
  </p>
`,

facebook: `
  <h3>📘 Facebook Post</h3>

  <p>
    Assalamu alaikum! 🙌
    HausaSmart na taimaka maka wajen Hausa,
    CV, jobs, translation da sauran abubuwa.
  </p>
`,

youtube: `
  <h3>▶️ YouTube Titles</h3>

  <p>
    “Yadda HausaSmart Zai Taimaka Maka
    Neman Aiki a 2026”
  </p>
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

const input =
document.getElementById("translateInput");

const result =
document.getElementById("translateResult");

if (!input || !result) return;

const text =
input.value.trim();

if (!text) {

result.innerHTML =
  "<p>Rubuta abin da kake son fassarawa.</p>";

return;

}

result.innerHTML =
"<p>Ana fassara... 🌐</p>";

try {

const response =
  await fetch("/api/chat", {

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


const data =
  await response.json();


if (data.success) {

  result.innerHTML = `

    <h3>🌐 Fassara</h3>

    <p>
      ${escapeHTML(data.answer)}
    </p>

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

const input =
document.getElementById("scamInput");

const result =
document.getElementById("scamResult");

if (!input || !result) return;

const message =
input.value.trim();

if (!message) {

result.innerHTML =
  "<p>Manna saƙon da kake son bincikawa.</p>";

return;

}

result.innerHTML =
"<p>Ana bincikawa... 🔎</p>";

try {

const response =
  await fetch("/api/chat", {

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


const data =
  await response.json();


if (data.success) {

  result.innerHTML = `

    <h3>
      🔎 Sakamakon Bincike
    </h3>

    <p>
      ${escapeHTML(data.answer)}
    </p>

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

const element =
document.getElementById(id);

if (!element) {
return "";
}

return element.value.trim();
}

function formatText(value) {

return escapeHTML(value)
.replace(/\n/g, "<br>");
}

function escapeHTML(value) {

return String(value)

.replaceAll(
  "&",
  "&amp;"
)

.replaceAll(
  "<",
  "&lt;"
)

.replaceAll(
  ">",
  "&gt;"
)

.replaceAll(
  '"',
  "&quot;"
)

.replaceAll(
  "'",
  "&#039;"
);

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


**Yanzu:** goge tsohon `app.js` gaba ɗaya → manna wannan → **Commit changes**.

Bayan ka gama ka ce **Angama**.
