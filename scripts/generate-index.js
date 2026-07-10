const fs = require("fs");
const path = require("path");

const membersDir = path.join(__dirname, "..", "members");

const files = fs.readdirSync(membersDir)
    .filter(file =>
        file.endsWith(".json") &&
        file !== "index.json"
    )
    .sort();

const members = [];
const domains = new Set();

for (const file of files) {
    const full = path.join(membersDir, file);

    const member = JSON.parse(
        fs.readFileSync(full, "utf8")
    );

    const required = [
        "name",
        "url",
        "github",
        "description",
        "avatar",
        "tags"
    ];

    for (const key of required) {
        if (!(key in member)) {
            throw new Error(`${file}: Missing '${key}'`);
        }
    }

    if (!member.url.startsWith("https://")) {
        throw new Error(`${file}: URL must use HTTPS`);
    }

    const host = new URL(member.url).hostname;

    if (domains.has(host)) {
        throw new Error(`${file}: Duplicate domain`);
    }

    domains.add(host);

    members.push(file);
}

fs.writeFileSync(
    path.join(membersDir, "index.json"),
    JSON.stringify(members, null, 2)
);

console.log(`Indexed ${members.length} members.`);
