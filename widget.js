(async () => {
    const DATA_URL = "";

    // Prevent duplicate widgets
    if (document.getElementById("devring-widget")) return;

    const res = await fetch(DATA_URL);
    const members = await res.json();

    // Current hostname
    const host = location.hostname.replace(/^www\./, "");

    // Find current member
    let index = members.findIndex(member => {
        const urlHost = new URL(member.url).hostname.replace(/^www\./, "");
        return urlHost === host;
    });

    if (index === -1) return;

    const prev = members[(index - 1 + members.length) % members.length];
    const next = members[(index + 1) % members.length];
    const random = members[Math.floor(Math.random() * members.length)];
    const style = document.createElement("style");

style.textContent = `
#devring-widget{
    position:fixed;
    bottom:20px;
    left:50%;
    transform:translateX(-50%);

    background:rgba(20,20,20,.75);
    backdrop-filter:blur(15px);

    color:white;

    padding:12px 18px;

    border-radius:16px;

    border:1px solid rgba(255,255,255,.15);

    font-family:system-ui;

    z-index:999999;
}

.dr-title{
    text-align:center;
    font-weight:bold;
    margin-bottom:8px;
}

.dr-links{
    display:flex;
    gap:18px;
}

.dr-links a{
    color:white;
    text-decoration:none;
}

.dr-links a:hover{
    opacity:.7;
}
`;

document.head.appendChild(style);
    const widget = document.createElement("div");
    widget.id = "devring-widget";

    widget.innerHTML = `
        <div class="dr-title">🌌 DevRing</div>

        <div class="dr-links">
            <a href="${prev.url}">← Prev</a>
            <a href="${random.url}">🎲 Random</a>
            <a href="${next.url}">Next →</a>
        </div>
    `;

    document.body.appendChild(widget);
})();
