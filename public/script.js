const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const mainApp = document.querySelector("main");
const profileSec = document.querySelector("#profile");
const repoBox = document.querySelector("#repo-box");
const repoSection = document.querySelector(".Repos-section");
const loader = document.querySelector("#loader");
const beforeBtn = document.querySelector(".before");
const afterBtn = document.querySelector(".next");
const searchBarRepo = document.querySelector("#search-bar-repo");
const searchIcon = document.querySelector("#search-bar-repo");
const showReposBtn = document.querySelector("#show-repos");

let currentPage = 1;
let allrepos = [];
const itemsPerPage = 5;

loader.classList.add("hidden");

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

const reset = function () {
  profileSec.classList.add("hidden");
  repoSection.classList.add("hidden");
  profileSec.innerHTML = "";
  repoBox.innerHTML = "";
};
reset();

// Pagination function
function paginate(array, currentPage, itemsPerPage) {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = array.slice(startIndex, endIndex);

  return {
    currentPage,
    totalPages,
    pageData,
  };
}

// Repo Card Generator
const createRepoCards = function (reposArr, section = repoBox) {
  repoBox.innerHTML = ""; // clear old repos
  reposArr.forEach((repo) => {
    if (!repo) return;
    const repoCard = `
        <div
           class="repo p-4 md:p-6 rounded-xl border border-blue-900 bg-gradient-to-br from-gray-900/60 to-gray-800/40 
                   transition-all duration-300 
                   shadow-md hover:shadow-lg hover:-translate-y-1 flex flex-col gap-4 relative overflow-hidden">
           <!-- Repo Name -->
           <a href="${repo.html_url ?? ""}" target="_blank"
               class="repo-name text-xl md:text-2xl font-bold text-indigo-400 hover:text-indigo-300 hover:underline relative z-10 w-fit">
               ${repo.name ?? "Not defined"}
           </a>
           <!-- Repo Info -->
           <div class="flex flex-wrap gap-3 mt-1 text-gray-300 relative z-10">
               <span class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs 
                      bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10">
                    ${repo.language ?? "N/A"} </span>
               <span
                   class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-400/30">
                   ⭐ ${repo.stargazers_count ?? "Not defined"}
               </span>
               <span
                   class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-400/30">
                   🍴  ${repo.forks}
               </span>
               <span
                   class="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30">
                   ⏳ ${timeAgo(repo.pushed_at) ?? "Not defined"}
               </span>
           </div>
        </div>

      `;
    section.insertAdjacentHTML("beforeend", repoCard);
  });
};

// ---------------------- //
// BUTTONS VISIBILITY
// ---------------------- //
function updateButtons(currentPage, totalPages) {
  beforeBtn.style.display = "none";
  afterBtn.style.display = "none";

  if (totalPages <= 1) {
    // only 1 page, no buttons
    return;
  }

  if (currentPage === 1) {
    afterBtn.style.display = "inline-block"; // first page → only next
  } else if (currentPage === totalPages) {
    beforeBtn.style.display = "inline-block"; // last page → only prev
  } else {
    beforeBtn.style.display = "inline-block"; // middle → both
    afterBtn.style.display = "inline-block";
  }
}

// ---------------------- //
// RENDER REPOS WITH PAGINATION
// ---------------------- //
function renderRepos() {
  const {
    currentPage: page,
    totalPages,
    pageData,
  } = paginate(allrepos, currentPage, itemsPerPage);
  createRepoCards(pageData);
  updateButtons(page, totalPages);
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

  // Profile Section
  const profileinfo = `
                <div class="flex flex-col sx:grid sx:grid-cols-5 gap-6 sx:items-center p-2 xl:p-3 rounded-2xl">
                    <!-- Avatar -->
                    <div class="flex sx:col-span-2 justify-start">
                        <img src="${data.avatar_url}" alt="Avatar Image"
                            class="rounded-xl object-cover w-full md:min-w-28 shadow-md">
                    </div>
                    <!-- Profile Info -->
                    <div class="sx:col-span-3 flex flex-col gap-6">
                        <div class="flex flex-col gap-1">
                            <h3 class="font-semibold text-xl text-gray-400">Name</h3>
                            <p id="name" class="text-xl font-medium">${
                              data.name ?? "Not defined"
                            }</p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h3 class="font-semibold text-xl text-gray-400">Username</h3>
                            <a href="${
                              data.html_url
                            }" type="_blank" id="username"
                                class="text-indigo-400 text-xl font-medium hover:underline inline-block w-fit">${
                                  data.login
                                }</a>
                        </div>
                    </div>
                </div>
                <div class="p-4 flex flex-col gap-6  opacity-90">
                    <div class="flex flex-col gap-2">
                        <h3 class="font-semibold text-gray-400">
                            Bio:
                        </h3>
                        <p id="bio">${data.bio ?? "Not defined"}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h3 class="font-semibold text-gray-400">
                            location:
                        </h3>
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



    `;
  profileSec.innerHTML = profileinfo;
};

// ---------------------- //
// FETCH REPOS
// ---------------------- //
const fetchRepo = async function () {
  const userName = searchBar.value.trim();
  repoBox.innerHTML = ""; // Clear old repos

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

  allrepos = data;
  currentPage = 1; // reset to page 1 on new search
  renderRepos();
};

// ---------------------- //
// MAIN
// ---------------------- //
const main = async function () {
  loader.classList.remove("hidden");
  reset();
  try {
    await fetchInfo();
    await fetchRepo();
    profileSec.classList.remove("hidden");
    repoSection.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
    console.error(error);
  } finally {
    searchBar.value = "";
    searchBar.blur();
    loader.classList.add("hidden");
  }
};

// ---------------------- //
// Search repo
// ---------------------- //

const searchRepo = function () {
  const repoName = searchBarRepo.value.trim().toLowerCase();
  // If input is empty → show all repos
  if (!repoName) {
    const repoDate = paginate(allrepos, 1, 5);
    createRepoCards(repoDate.pageData);
    updateButtons(1, repoDate.totalPages);
    return;
  }

  // Find repo by exact name (case-insensitive)
  const repoObject = allrepos.find(
    (repo) => repo.name.toLowerCase() === repoName
  );

  if (repoObject) {
    // Show only matched repo
    createRepoCards([repoObject]);
    beforeBtn.style.display = "none";
    afterBtn.style.display = "none";
  } else {
    // Show message if not found
    repoBox.innerHTML = `
      <div id="no-repos" class="text-center text-gray-500 italic p-4">
        <p>🚫 No repository found.</p>
        <button id="show-repos" class="bg-indigo-600 px-2 py-1 text-sm rounded-lg text-white mt-3 hover:bg-indigo-700 transition-all duration-200">
          Show All Repos
        </button>
      </div>
    `;

    beforeBtn.style.display = "none";
    afterBtn.style.display = "none";

    // Re-attach event for "Show All Repos"
    document.querySelector("#show-repos").addEventListener("click", () => {
      const repoDate = paginate(allrepos, 1, 5);
      createRepoCards(repoDate.pageData);
      updateButtons(1, repoDate.totalPages);
    });
  }
};

// ---------------------- //
// EVENT LISTENERS
// ---------------------- //
searchBtn.addEventListener("click", main);

afterBtn.addEventListener("click", () => {
  currentPage++;
  renderRepos();
});

beforeBtn.addEventListener("click", () => {
  currentPage--;
  renderRepos();
});
// Use "input" so search updates instantly
searchBarRepo.addEventListener("input", searchRepo);
