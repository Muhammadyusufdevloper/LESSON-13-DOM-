import { userImg } from "./data.js";
const userBoxes = document.querySelector(".user__boxes");
const API__URL = "https://jsonplaceholder.typicode.com/users";

async function userApi(URL) {
  let data = await fetch(URL);
//   data
//     .json()
//     .then((res) => mapUser(res))
//     .catch((error) => console.log(error));
  try {
    let userData = await data.json();
    mapUser(userData);
    return userData;
  } catch (error) {
    console.log(error);
  }
}
userApi(API__URL);

function mapUser(userData) {
  let setCard = "";

  userData.forEach((element) => {
    setCard += `
            <div class="user__card">
                <div class="user__part">
                    <img src="${userImg[element.id - 1]}" alt="${
      element.name
    } img">
                </div>
                <div class="user__info">
                    <h3 class="user__info__title">${element.name}</h3>
                    <p class="user__info__desc">${element.username}</p>
                    <a class="user__info__desc" href="email:${
                      element.email
                    }"  target="_blank">Email</a>
                    <p class="user__info__desc user__info__text">${
                      element.address.street +
                      " " +
                      element.address.suite +
                      " " +
                      element.address.city
                    }</p>
                    <a class="user__info__desc" href="${
                      element.website
                    }"  target="_blank">Website</a>
                    <a class="user__info__desc" href="tel:${
                      element.phone
                    }"  target="_blank">tel: ${element.phone}</a>
                    <p class="user__info__desc">${element.company.name}</p>
                    <div class="user__btns">
                        <button name="delete" data-id="${
                          element.id
                        }" class="user__btn">Delete</button>
                    </div>
                </div>
            </div>
        `;
  });
  userBoxes.innerHTML = setCard;
}

let userData = await userApi(API__URL);
const deletProdact = async (id) => {
  if (!confirm("Are you sure you want to delete?")) return;
  let index = userData.findIndex((u) => u.id === parseInt(id));
  userData.splice(index, 1);
  mapUser(userData);
};

userBoxes.addEventListener("click", async (e) => {
  if (e.target.name === "delete") {
    await deletProdact(e.target.dataset.id);
  }
});