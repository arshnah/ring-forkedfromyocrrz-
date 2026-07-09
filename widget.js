(async () => {
    const DATA_URL = "https://yocrrz.is-a.dev/ring/members.json";
    const HOME_URL = "https://yocrrz.is-a.dev/ring";

    if (document.getElementById("devring-widget")) return;

    try {
        const res = await fetch(DATA_URL);
        const members = await res.json();

        const host = location.hostname.replace(/^www\./, "");

        const index = members.findIndex(member => {
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
    left:50%;
    bottom:20px;
    transform:translateX(-50%);

    display:flex;
    align-items:center;
    gap:6px;

    padding:8px;

    background:rgba(22,22,22,.72);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);

    border:1px solid rgba(255,255,255,.08);
    border-radius:999px;

    box-shadow:
        0 10px 35px rgba(0,0,0,.35),
        inset 0 1px rgba(255,255,255,.05);

    z-index:999999;

    font-family:Inter,system-ui,sans-serif;
}

#devring-widget a{
    width:40px;
    height:40px;

    display:flex;
    align-items:center;
    justify-content:center;

    color:#fff;
    text-decoration:none;

    border-radius:12px;

    transition:
        transform .18s ease,
        background .18s ease;
}

#devring-widget a:hover{
    background:rgba(255,255,255,.08);
    transform:translateY(-6px) scale(1.15);
}

#devring-widget svg{
    width:20px;
    height:20px;

    stroke:currentColor;
    fill:none;
    stroke-width:2;
    stroke-linecap:round;
    stroke-linejoin:round;
}

#devring-widget .logo svg{
    fill:none;
    transition:transform .35s ease;
}

#devring-widget:hover .logo svg{
    transform:rotate(360deg);
}

#devring-widget .orbit{
    fill:currentColor;
}
`;

        document.head.appendChild(style);

        const widget = document.createElement("div");
        widget.id = "devring-widget";

        widget.innerHTML = `
<a href="${prev.url}" title="Previous">
<svg viewBox="0 0 24 24">
<path d="M15 18L9 12L15 6"/>
</svg>
</a>

<a class="logo" href="${HOME_URL}" title="DevRing">

<svg viewBox="0 0 24 24">

<circle
cx="12"
cy="12"
r="8"
/>

<circle class="orbit" cx="12" cy="4" r="1.4"/>

<circle class="orbit" cx="19" cy="15" r="1.4"/>

<circle class="orbit" cx="5" cy="15" r="1.4"/>

</svg>

</a>

<a href="${random.url}" title="Random">
<svg viewBox="0 0 24 24">
<path d="M16 3h5v5"/>
<path d="M4 20L21 3"/>
<path d="M21 16v5h-5"/>
<path d="M15 15l6 6"/>
<path d="M4 4l5 5"/>
</svg>
</a>

<a href="${next.url}" title="Next">
<svg viewBox="0 0 24 24">
<path d="M9 6L15 12L9 18"/>
</svg>
</a>
`;

        if (document.body) {
            document.body.appendChild(widget);
        } else {
            window.addEventListener("DOMContentLoaded", () => {
                document.body.appendChild(widget);
            });
        }

    } catch (err) {
        console.error("[DevRing]", err);
    }

})();
