// console.log("Hello World");

// const searchBar = document.querySelector("#search-bar");
// const searchBtn = document.querySelector("#search-btn");
// const mainApp = document.querySelector("main");
// const profileSec = document.querySelector("#profile");
// const repoBox = document.querySelector("#repo-box");
// const GITHUB_TOKEN = "ghp_xxxxx..."; // apna personal token daalo (safe jagah rakho)
// console.log(repoBox);

// repoBox.innerHTML = "";
// mainApp.classList.add("opacity-0");

// // ---------------------- //
// // HELPER FUNCTION...
// // ---------------------- //
// function timeAgo(dateString) {
//   const now = new Date();
//   const updated = new Date(dateString);
//   const diff = Math.floor((now - updated) / 1000); // seconds

//   if (diff < 60) return `${diff} seconds ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
//   if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

//   return updated.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// // ---------------------- //
// // MAIN FUNCTIONALLITY...
// // ---------------------- //

// const fetchInfo = async function () {
//   try {
//     const userName = searchBar.value;
//     const response = await fetch(`https://api.github.com/users/${userName}`);

//     const data = await response.json();
//     console.log(data);
//     searchBar.blur();
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`${response.status} User not found`);
//     }

//     //   creating info section
//     const profileinfo = `
//       <!-- profile Section -->
//         <div>
//           <div class=" flex flex-col sm:grid sm:grid-cols-6 gap-6 sm:items-center p-3 rounded-2xl">
//               <!-- Avatar -->
//               <div class="flex sm:col-span-2 justify-start">
//                   <img src="${data.avatar_url}" alt="Avatar Image"
//                       class="rounded-xl object-cover w-full md:min-w-28 shadow-md">
//               </div>
//               <!-- profile Info -->
//               <div class="sm:col-span-4 flex flex-col gap-3 text-lg">
//                   <div>
//                       <h3 class="font-semibold text-gray-400">Name</h3>
//                       <p id="name" class="text-xl font-medium">${data.name}</p>
//                   </div>
//                   <div>
//                       <h3 class="font-semibold text-gray-400">Username</h3>
//                       <a href="#" id="username" class="text-indigo-400 font-medium hover:underline">${
//                         data.login
//                       }</a>
//                   </div>
//               </div>
//           </div>
//           <div class="p-4 flex flex-col gap-6">
//               <div class="flex flex-col gap-2">
//                   <h3 class="font-semibold text-gray-400">
//                       Bio:
//                   </h3>
//                   <p id="bio">${data.bio ?? "Not defined"}</p>
//               </div>
//               <div class="flex flex-col gap-2">
//                   <h3 class="font-semibold text-gray-400">
//                       location:
//                   </h3>
//                   <p id="location">${data.location ?? "Not defined"}</p>
//               </div>
//               <div class="flex flex-col md:flex-row gap-4 sm:gap-7">
//                   <div class="flex gap-3">
//                       <h3 class="font-semibold text-gray-400">Followers:</h3>
//                       <p id="followers">${data.followers ?? "Not defined"}</p>
//                   </div>
//                   <div class="flex gap-3">
//                       <h3 class="font-semibold text-gray-400">Following:</h3>
//                       <p id="following">${data.following ?? "Not defined"}</p>
//                   </div>
//               </div>
//               <div class="flex flex-col gap-1">
//                   <h3 class="font-semibold text-gray-400">Company:</h3>
//                   <p id="company">${data.company ?? "Not defined"}</p>
//               </div>
//           </div>
//         </div>
//       `;
//     profileSec.innerHTML = profileinfo;
//   } catch (error) {
//     alert(error);
//   }
// };

// const fetchRepo = async function () {
//   try {
//     console.log("112");

//     const userName = searchBar.value;
//     const response = await fetch(
//       `https://api.github.com/users/${userName}/repos`
//     );
//     const data = await response.json();
//     if (!response.ok)
//       throw new Error(`${response.status} API rate limit exceeded `);
//     console.log(data);

//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i]);
//       const repo = `
//        <div
//            class="repo p-4 md:p-6 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900/60 to-gray-800/40
//                 hover:from-gray-800/80 hover:to-gray-700/20 transition-all duration-300
//                 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4 cursor-pointer relative overflow-hidden">
//            <!-- Repo Name -->
//            <h3
//                class="repo-name text-xl md:text-2xl font-bold text-indigo-400 hover:text-indigo-300 hover:underline relative z-10 w-fit">
//                ${data[0].name}
//            </h3>
//            <!-- Repo Info -->
//            <div class="flex flex-wrap gap-3 mt-1 text-gray-300 relative z-10">
//                <!-- Language -->
//                <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs
//                    bg-white/5 text-gray-300 border border-white/10
//                    transition-all duration-300 ease-in-out
//                    hover:bg-white/10 hover:text-white hover:border-white/20">
//                    ${data[i].language}
//                </span>
//                <!-- Stars -->
//                <span
//                    class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 transition-all duration-300 hover:bg-yellow-400/30">
//                    ${data[i].stargazers_count} Stars
//                </span>
//                <!-- Forks -->
//                <span
//                    class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 hover:text-purple-300 border border-purple-400/30 transition-all duration-300 hover:bg-purple-500/30">
//                    ${data[i].forks} Forks
//                </span>
//                <!-- Last Updated -->
//                <span
//                    class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 hover:text-blue-200 border border-blue-400/30 transition-all duration-300 hover:bg-blue-400/30">
//                    ${timeAgo(data[i].updated_at)}
//                </span>
//            </div>
//        </div>
//       `;
//       console.log(data[i].updated_at);
//       repoBox.insertAdjacentHTML("afterbegin", repo);
//       console.log(repoBox);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// };

// const main = async function () {
//   try {
//     await fetchInfo();
//     await fetchRepo();
//   } catch (error) {
//     console.error(error);
//   }
//   mainApp.classList.remove("opacity-0");
// };
// searchBtn.addEventListener("click", main);

console.log("Hello World");

const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const mainApp = document.querySelector("main");
const profileSec = document.querySelector("#profile");
const repoBox = document.querySelector("#repo-box");

mainApp.classList.add("opacity-0");

// ---------------------- //
// HELPER FUNCTION
// ---------------------- //
function timeAgo(dateString) {
  const now = new Date();
  const updated = new Date(dateString);
  const diff = Math.floor((now - updated) / 1000); // seconds

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

  return updated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ---------------------- //
// FETCH USER INFO
// ---------------------- //
const fetchInfo = async function () {
  const userName = searchBar.value.trim();
  if (!userName) throw new Error("Please enter a username!");

  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} - ${data.message}`);
  }

  //   creating info section
  const profileinfo = `
      <div>
        <div class="flex flex-col sm:grid sm:grid-cols-6 gap-6 sm:items-center p-3 rounded-2xl">
            <!-- Avatar -->
            <div class="flex sm:col-span-2 justify-start">
                <img src="${data.avatar_url}" alt="Avatar Image"
                    class="rounded-xl object-cover w-full md:min-w-28 shadow-md">
            </div>
            <!-- profile Info -->
            <div class="sm:col-span-4 flex flex-col gap-3 text-lg">
                <div>
                    <h3 class="font-semibold text-gray-400">Name</h3>
                    <p id="name" class="text-xl font-medium">${
                      data.name ?? "Not defined"
                    }</p>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-400">Username</h3>
                    <a href="${data.html_url}" target="_blank" id="username" 
                       class="text-indigo-400 font-medium hover:underline">
                       ${data.login}
                    </a>
                </div>
            </div>
        </div>
        <div class="p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-gray-400">Bio:</h3>
                <p id="bio">${data.bio ?? "Not defined"}</p>
            </div>
            <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-gray-400">Location:</h3>
                <p id="location">${data.location ?? "Not defined"}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 sm:gap-7">
                <div class="flex gap-3">
                    <h3 class="font-semibold text-gray-400">Followers:</h3>
                    <p id="followers">${data.followers}</p>
                </div>
                <div class="flex gap-3">
                    <h3 class="font-semibold text-gray-400">Following:</h3>
                    <p id="following">${data.following}</p>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <h3 class="font-semibold text-gray-400">Company:</h3>
                <p id="company">${data.company ?? "Not defined"}</p>
            </div>
        </div>
      </div>
    `;
  profileSec.innerHTML = profileinfo;
};

// ---------------------- //
// FETCH REPOS
// ---------------------- //
const fetchRepo = async function () {
  const userName = searchBar.value.trim();
  repoBox.innerHTML = ""; // Clear old repos first

  const response = await fetch(
    `https://api.github.com/users/${userName}/repos`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} - ${data.message}`);
  }

  if (data.length === 0) {
    repoBox.innerHTML = `<p class="text-gray-400">No repositories found.</p>`;
    return;
  }

  data.forEach((repo) => {
    const repoCard = `
       <div
           class="repo p-4 md:p-6 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900/60 to-gray-800/40 
                hover:from-gray-800/80 hover:to-gray-700/20 transition-all duration-300 
                shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4 cursor-pointer relative overflow-hidden">
           <!-- Repo Name -->
           <h3
               class="repo-name text-xl md:text-2xl font-bold text-indigo-400 hover:text-indigo-300 hover:underline relative z-10 w-fit">
               ${repo.name ?? "Not defined"}
           </h3>
           <!-- Repo Info -->
           <div class="flex flex-wrap gap-3 mt-1 text-gray-300 relative z-10">
               <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs 
                   bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10">
                   ${repo.language ?? "N/A"}
               </span>
               <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-400/30">
                   ⭐ ${repo.stargazers_count ?? "Not defined"}
               </span>
               <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-400/30">
                   🍴 ${repo.forks}
               </span>
               <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30">
                   ⏳ ${timeAgo(repo.updated_at) ?? "Not defined"}
               </span>
           </div>
       </div>
      `;
    repoBox.insertAdjacentHTML("beforeend", repoCard);
  });
};

// ---------------------- //
// MAIN
// ---------------------- //
const main = async function () {
  try {
    await fetchInfo();
    await fetchRepo();
    mainApp.classList.remove("opacity-0");
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

searchBtn.addEventListener("click", main);
