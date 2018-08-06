//Call a profile by default
nextProfile();

document.getElementById('next').addEventListener('click', nextProfile);

async function getRandomUsers() {
  const response = await fetch('https://randomuser.me/api/?results=4');
  const data = await response.json();
  const profile = data.results;
  return profile;
}

function profileIterator(profiles) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    }
  };
}

//Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Next Profile display
function nextProfile() {
  getRandomUsers().then(profilesArr => {
    const userProfiles = profileIterator(profilesArr);
    const currentProfile = userProfiles.next().value;
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${capitalizeFirstLetter(
        currentProfile.name.first
      )} ${capitalizeFirstLetter(currentProfile.name.last)}</li>
      <li class="list-group-item">Age: ${currentProfile.dob.age}</li>
      <li class="list-group-item">Location: ${capitalizeFirstLetter(
        currentProfile.location.city
      )}, ${capitalizeFirstLetter(currentProfile.location.state)}</li>
      <li class="list-group-item">Phone: ${currentProfile.phone}</li>
    </ul>
  `;

    document.getElementById('imageDisplay').innerHTML = `
      <img src="${currentProfile.picture.large}"></img>
  `;
  });
}
