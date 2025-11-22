/*  1.fs.unlink() 2.fs.unlinkSync() 3.fs.existsSync()
===========================================
Deleting Files with the fs Module (Node.js)
===========================================

Node.js এ fs মডিউল দিয়ে ফাইল ডিলিট করা খুব সহজ।  
ফাইল ডিলিট করার জন্য মূলত ২টি মেথড আছে:

✔ ১) fs.unlink() → Asynchronous (non-blocking)  
✔ ২) fs.unlinkSync() → Synchronous (blocking)
*/

/*  
===========================================
  ১) fs.unlink() — Asynchronous File Delete
===========================================

Non-blocking → Node.js অন্য কাজ চালিয়ে যেতে পারবে।  
প্রয়োগ করা ভালো যখন performance matter করে
*/

const fs = require("fs");

fs.unlink("data.txt", (err) => {
    if (err) {
        console.log(" File delete hoini");
        return;
    }
    console.log("✅ File successfully deleted!");
});

/*
  ব্যাখ্যা:
- "data.txt" ফাইল ডিলিট হবে
- ফাইল না থাকলে → error আসবে
- ফাইল থাকলে → ডিলিট হয়ে যাবে
*/

/*  
===========================================
২) fs.unlinkSync() — Synchronous File Delete
===========================================

Blocking → Node.js অপেক্ষা করবে ফাইল ডিলিট হওয়া পর্যন্ত।  
সাধারণত ছোট স্ক্রিপ্ট বা টেস্টের জন্য ব্যবহার করা হয়
*/

try {
    fs.unlinkSync("data.txt");
    console.log(" File successfully deleted!");
} catch (err) {
    console.log(" File delete hoini");
}

/*  
===========================================
কোনটা কখন ব্যবহার করবে?
===========================================
| Method         | কাজের ধরন       | কখন ব্যবহার করা উচিত           |
|----------------|-----------------|-------------------------------|
| fs.unlink()    | Asynchronous    | সবসময় — performance ভালো      |
| fs.unlinkSync()| Synchronous     | ছোট স্ক্রিপ্ট বা টেস্ট         |
*/

/*  
===========================================
  Important Notes
===========================================
- ফাইল না থাকলে error → "ENOENT"  
- ফোল্ডার ডিলিট করতে → fs.rmdir() বা fs.rm()  
- fs.unlink() শুধুমাত্র file ডিলিট করে, folder না
*/

/*  
===========================================
আগে ফাইল exists কিনা চেক করে delete
===========================================
*/

if (fs.existsSync("test.txt")) {
    fs.unlink("test.txt", (err) => {
        if (err) {
            console.log(" Delete korte problem holo");
            return;
        }
        console.log(" File deleted successfully!");
    });
} else {
    console.log("ℹ File ei nai!");
}

//⁡⁣⁣⁢ ****   নিচের গুলো optional কেননা এগুলো class এ পড়ায়নি⁡
/*  
===========================================
⭐ 1) Renaming Files (ফাইলের নাম পরিবর্তন)
===========================================

Node.js এ ফাইলের নাম পরিবর্তনের জন্য মূলত দুটি মেথড আছে:
✔ fs.rename() → Asynchronous (Non-blocking)
✔ fs.renameSync() → Synchronous (Blocking)
*/

/*  
===========================================
🟦 ১.1 Asynchronous — fs.rename()
===========================================

Non-blocking → অন্য কোড চলতে থাকবে, ফাইল rename হলে callback চলবে
*/

const fs = require("fs");

// data.txt নামের ফাইলকে newData.txt নামেও rename করা
fs.rename("data.txt", "newData.txt", (err) => {
    if (err) {
        console.log("❌ File rename korte problem holo", err);
        return;
    }
    console.log("✅ File renamed successfully!");
});

/*
📌 ব্যাখ্যা:
- "data.txt" → পুরনো নাম
- "newData.txt" → নতুন নাম
- ফাইল না থাকলে → error
- ফাইল থাকলে → নাম পরিবর্তন হয়ে যাবে
*/

/*  
===========================================
🟦 ১.2 Synchronous — fs.renameSync()
===========================================

Blocking → Node.js অপেক্ষা করবে ফাইল rename হওয়া পর্যন্ত
*/

try {
    fs.renameSync("newData.txt", "finalData.txt");
    console.log("✅ File renamed successfully!");
} catch (err) {
    console.log("❌ File rename korte problem holo", err);
}

/*  
===========================================
⭐ 2) Creating Folders (ফোল্ডার তৈরি করা)
===========================================

Node.js এ ফোল্ডার তৈরি করার জন্য দুটি মেথড আছে:
✔ fs.mkdir() → Asynchronous
✔ fs.mkdirSync() → Synchronous
*/

/*  
===========================================
🟦 ২.1 Asynchronous — fs.mkdir()
===========================================

Non-blocking → অন্য কোড চলতে থাকবে
*/

fs.mkdir("myFolder", (err) => {
    if (err) {
        console.log("❌ Folder create korte problem holo", err);
        return;
    }
    console.log("✅ Folder created successfully!");
});

/*
📌 ব্যাখ্যা:
- "myFolder" → নতুন ফোল্ডারের নাম
- ফোল্ডার আগে থেকে থাকলে → error আসতে পারে
*/

/*  
===========================================
🟦 ২.2 Synchronous — fs.mkdirSync()
===========================================

Blocking → Node.js অপেক্ষা করবে ফোল্ডার তৈরি হওয়া পর্যন্ত
*/

try {
    fs.mkdirSync("myFolderSync");
    console.log("✅ Folder created successfully!");
} catch (err) {
    console.log("❌ Folder create korte problem holo", err);
}

/*  
===========================================
🔹 Extra: Nested Folder তৈরি করা (parents:true)
===========================================

fs.mkdir("parentFolder/childFolder", { recursive: true }, callback)
*/

fs.mkdir("parentFolder/childFolder", { recursive: true }, (err) => {
    if (err) {
        console.log("❌ Problem holo", err);
        return;
    }
    console.log("✅ Nested folder created successfully!");
});

/*
📌 ব্যাখ্যা:
- { recursive: true } দিলে parent folder না থাকলেও Node.js automatically তৈরি করবে
*/

/*  
===========================================
🧠 Summary (সহজ ভাষায়)
===========================================

| কাজ           | মেথড                           | ব্যাখ্যা                                             |
|---------------|--------------------------------|-----------------------------------------------------|
| File rename    | fs.rename() / fs.renameSync()  | নাম পরিবর্তন করে, ফাইল না থাকলে error আসে         |
| Folder create  | fs.mkdir() / fs.mkdirSync()    | নতুন ফোল্ডার তৈরি করে, parent না থাকলে recursive:true ব্যবহার করতে হয় |
| Async vs Sync  | Async → non-blocking, Sync → blocking | বাস্তব প্রজেক্টে Async ব্যবহার করা উচিত           |
*/
