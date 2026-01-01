//1
async function getUser() {
  const user = await fetch('/api/user');
  console.log(user);
}
//2
async function getData() {
  const data = await fetch('/api/data');
  return data;
}
//3
//מה  לתקן?
async function getData() {
  const result = await fetch('/api/data')
      .then(response => response.json())
      .then(data => processData(data));
  return result;
}

//4
Promise.all([setupDatabase(), loadConfigs(), connectToCache()])
.then((values)=>{
    console.log('All services are ready',values);
})
.catch((error)=>{
    console.error('Error setting up services',error);
});
