const url = "https://api.github.com/users";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const checkProfileBtn = document.querySelector("#check-profile-btn");
const profileContainer = document.querySelector("#profile-container");
let loading = document.querySelector("#loading");

const generateProfile = (profile) => {
  return `<div class="card">
    <div class="upper">
        <div class="profile">
            <img src="${profile.avatar_url}"/>
            <div class="name">
                <h1>${profile.name}</h1>
                <p>@${profile.login}</p>
            </div>
        </div>
        <a href="${profile.html_url}" target="_blank">
        <Button id="check-profile-btn" class="btn">Check Profile</Button>
        </a>
    </div>
    <div class="middle">
        <h1>About</h1>
        <p>${profile.bio}</p>
    </div>
    <div class="bottom">
        <div class="info">
            <h1>Followers</h1>
            <p>${profile.followers}</p>
        </div>
        <div class="info">
            <h1>Following</h1>
            <p>${profile.following}</p>
        </div>
        <div class="info">
            <h1>Repos</h1>
            <p>${profile.public_repos}</p>
        </div>
    </div>
</div>`;
};

const fetchProfile = async () => {
  const username = searchInput.value;
  loading.innerText = "loading...";
  loading.style.color = "black";
  try {
    const response = await fetch(`${url}/${username}`);
    const data = await response.json();
    console.log(data);
    if (data.bio) {
      loading.innerText = "";
      profileContainer.innerHTML = generateProfile(data);
    } else {
      profileContainer.innerHTML = "";
      loading.innerHTML = data.message;
      loading.style.color = "red";
      // loading.style.font = "bold";
    }
  } catch (error) {
    console.log(error);
    loading.innerText = "";
  }
};
// fetchProfile();
searchBtn.addEventListener("click", fetchProfile);
