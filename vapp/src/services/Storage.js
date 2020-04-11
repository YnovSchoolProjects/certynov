export default class Storage {
  store(file) {
    console.log(`Stored: ${file}`);
  }

  fetch(file) {
    console.log(`Retieved: ${file}`);
  }
}