/*  

📘 ⁡⁣⁣⁢Reading Files with the fs Module⁡
===========================================

Node.js এ ফাইল পড়তে (read করতে) আমরা ব্যবহার করি fs (File System) মডিউল।
এই মডিউল দিয়ে যেকোনো ফাইল—TXT, JSON, HTML, ENV—সব পড়া যাবে।

🔥 fs Module Import (CommonJS)
-------------------------------------------
*/

const fs = require("fs");

/*
  ⁡⁣⁣⁢fs দিয়ে ফাইল পড়ার ৩টি জনপ্রিয় উপায় আছে:⁡ 

  ⁡⁢⁣⁡⁢⁣⁢আমদের class a এ শুধু ২ টা পড়িয়েছে ⁡

===========================================
✅ 1) ⁡⁣⁣⁢Synchronous file reading⁡ → fs.readFileSync()
===========================================

👉 এটি Blocking — মানে ফাইল না পড়া পর্যন্ত কোড থেমে থাকবে।
উদাহরণ:
*/

const dataSync = fs.readFileSync("text.txt", "utf-8");
console.log("📄 Sync Read:", dataSync);

/*
📝 ব্যাখ্যা:
"text.txt" → কোন ফাইল পড়বে
"utf-8" → Unicode string হিসেবে পড়বে
dataSync → পুরো ফাইলের কনটেন্ট
*/

/*
===========================================
✅ 2) ⁡⁣⁣⁢Asynchronous file reading ⁡→ fs.readFile()
===========================================

👉 এটি Non-blocking — অন্য কোড চলতে থাকে।
উদাহরণ:
*/

fs.readFile("text.txt", "utf-8", (err, dataAsync) => {
    if (err) {
        console.log("❌ Error reading file:", err);
        return;
    }
    console.log("📄 Async Read:", dataAsync);
});

/*
📝 ব্যাখ্যা:
err → কোনো ভুল থাকলে এখানে আসবে
dataAsync → ফাইল সঠিকভাবে পড়লে কনটেন্ট এখানে পাওয়া যাবে
*/

/*
===========================================
✅ 3) ⁡⁣⁣⁢Promise-based / async-await⁡ → fs.promises.readFile()
===========================================

👉 আধুনিক JavaScript এ সবচেয়ে clean ও বেশি ব্যবহৃত পদ্ধতি।
*/

const fsPromise = require("fs").promises;

async function readFile() {
    try {
        const data = await fsPromise.readFile("text.txt", "utf-8");
        console.log("📄 Promise Read:", data);
    } catch (error) {
        console.log("❌ Error:", error);
    }
}

readFile();

/*
===========================================
🎯 Summary — কী শিখলে?
===========================================

✔ fs মডিউল ফাইল পড়ার জন্য ব্যবহার হয়  
✔ ৩ভাবে ফাইল পড়া যায় — Sync, Async, Promise  
✔ "utf-8" দিলে ডাটা string হিসেবে পাওয়া যায়  
✔ বাস্তব প্রজেক্টে async-await সবচেয়ে বেশি ব্যবহৃত  
*/
